import { useEffect, useRef } from "react"
import type { Texture, Vector2 } from "three"
import heroRingsDark from "../../assets/images/home/ring-dark.svg"
import heroRingsLight from "../../assets/images/home/ring-light.svg"

function RippleEffectRings() {
  const threeHostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = threeHostRef.current
    if (!host) return

    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let disposed = false
    let cleanup: (() => void) | null = null

    const init = (THREE: typeof import("./three-lite")): (() => void) => {
      const supportsHoverPointer =
        window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false

      // --- Renderer ---
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: true,
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.style.position = "absolute"
      renderer.domElement.style.inset = "0"
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      renderer.domElement.style.display = "block"
      renderer.domElement.style.pointerEvents = supportsHoverPointer ? "auto" : "none"
      host.appendChild(renderer.domElement)

      // --- Camera + full-screen plane ---
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1
      const geometry = new THREE.PlaneGeometry(2, 2, 1, 1)

      // --- Texture (switch by theme class) ---
      const textureLoader = new THREE.TextureLoader()
      let currentTexture: Texture | null = null
      let textureReady = false

      const getTextureUrl = () => {
        const isLight = document.documentElement.classList.contains("light")
        return isLight ? heroRingsLight.src : heroRingsDark.src
      }

      const hideFallback = () => {
        host
          .querySelectorAll<HTMLImageElement>("[data-rings-fallback]")
          .forEach((image) => {
            image.style.opacity = "0"
          })
      }

      const applyTexture = (url: string) => {
        textureReady = false
        textureLoader.load(url, (next) => {
          if (disposed) {
            next.dispose()
            return
          }

          next.minFilter = THREE.LinearFilter
          next.magFilter = THREE.LinearFilter
          next.generateMipmaps = false
          if ("colorSpace" in next) {
            next.colorSpace = THREE.SRGBColorSpace
          }

          const image = next.image as HTMLImageElement
          const textureWidth = image.naturalWidth || image.width || 1
          const textureHeight = image.naturalHeight || image.height || 1

          renderUniforms.uTexture.value = next
          renderUniforms.uTextureAspect.value = textureWidth / textureHeight
          textureReady = true
          hideFallback()

          if (currentTexture) currentTexture.dispose()
          currentTexture = next
        })
      }

      // --- Simulation targets (ping-pong) ---
      const SIM_SIZE = 256

      const makeTarget = () =>
        new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, {
          format: THREE.RGBAFormat,
          type: THREE.HalfFloatType,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          depthBuffer: false,
          stencilBuffer: false,
        })

      let rtA = makeTarget()
      let rtB = makeTarget()

      // Pointer state (hover-driven)
      const mouse01: Vector2 = new THREE.Vector2(0.5, 0.5)
      let hover = 0
      let hoverTarget = 0
      let lastMoveSec = 0

      // --- Simulation material (updates water state) ---
      const simUniforms = {
        uPrev: { value: rtA.texture as Texture },
        uResolution: { value: new THREE.Vector2(SIM_SIZE, SIM_SIZE) },
        uMouse01: { value: mouse01 },
        // 0..1 hover influence (kept name for simplicity)
        uMouseDown: { value: 0.0 },
        uTime: { value: 0.0 },
        uFrame: { value: 0 },

        // Tunables
        uDelta: { value: 1.0 },
        uRadiusPx: { value: 20.0 },
        uInject: { value: 0.6 },
        uVelDamp: { value: 0.002 },
        uPressDamp: { value: 0.999 },
        uSpring: { value: 0.005 },
        // very subtle always-on movement
        uAmbient: { value: 0.00015 },
      }

      const simMaterial = new THREE.ShaderMaterial({
        uniforms: simUniforms,
        vertexShader: `
          precision highp float;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;

          uniform sampler2D uPrev;
          uniform vec2 uResolution;
          uniform vec2 uMouse01;
          uniform float uMouseDown; // 0..1 influence
          uniform float uTime;
          uniform int uFrame;
          uniform float uDelta;
          uniform float uRadiusPx;
          uniform float uInject;
          uniform float uVelDamp;
          uniform float uPressDamp;
          uniform float uSpring;
          uniform float uAmbient;

          varying vec2 vUv;

          vec4 samplePrev(vec2 uv) {
            return texture2D(uPrev, uv);
          }

          void main() {
            // First frame: clear
            if (uFrame == 0) {
              gl_FragColor = vec4(0.0);
              return;
            }

            vec2 texel = 1.0 / uResolution;
            vec2 uv = vUv;

            // Neighbor UVs (clamped)
            vec2 uvR = clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0));
            vec2 uvL = clamp(uv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0));
            vec2 uvU = clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0));
            vec2 uvD = clamp(uv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0));

            float pressure = samplePrev(uv).x;
            float pVel = samplePrev(uv).y;

            float pR = samplePrev(uvR).x;
            float pL = samplePrev(uvL).x;
            float pU = samplePrev(uvU).x;
            float pD = samplePrev(uvD).x;

            // Wave equation (discrete laplacian)
            pVel += uDelta * (-2.0 * pressure + pR + pL) / 4.0;
            pVel += uDelta * (-2.0 * pressure + pU + pD) / 4.0;

            pressure += uDelta * pVel;

            // Spring motion
            pVel -= uSpring * uDelta * pressure;

            // Damping
            pVel *= 1.0 - (uVelDamp * uDelta);
            pressure *= uPressDamp;

            // Hover injection (pixel space)
            if (uMouseDown > 0.001) {
              vec2 fragPx = uv * uResolution;
              vec2 mousePx = uMouse01 * uResolution;
              float dist = distance(fragPx, mousePx);
              if (dist <= uRadiusPx) {
                pressure += (1.0 - dist / uRadiusPx) * uInject * uMouseDown;
              }
            }

            // Subtle ambient movement
            pressure += uAmbient * sin(uTime * 0.7 + uv.x * 9.0 + uv.y * 7.0);

            // Gradients
            float gradX = (pR - pL) * 0.5;
            float gradY = (pU - pD) * 0.5;

            gl_FragColor = vec4(pressure, pVel, gradX, gradY);
          }
        `,
        transparent: false,
        depthWrite: false,
        depthTest: false,
      })

      // --- Render material (distorts rings texture using sim gradients) ---
      const renderUniforms = {
        uTexture: { value: null as Texture | null },
        uSim: { value: rtA.texture as Texture },
        uCanvasAspect: { value: 1.0 },
        uTextureAspect: { value: 1.0 },
        uDistort: { value: 0.10 },
        uGlint: { value: 0.12 },
        uLightDir: { value: new THREE.Vector3(-3, 10, 3).normalize() },
      }

      const renderMaterial = new THREE.ShaderMaterial({
        uniforms: renderUniforms,
        vertexShader: `
          precision highp float;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;

          uniform sampler2D uTexture;
          uniform sampler2D uSim;
          uniform float uCanvasAspect;
          uniform float uTextureAspect;
          uniform float uDistort;
          uniform float uGlint;
          uniform vec3 uLightDir;

          varying vec2 vUv;

          vec2 containUv(vec2 uv, float canvasAspect, float textureAspect) {
            vec2 scale = vec2(1.0);

            if (canvasAspect > textureAspect) {
              scale.x = textureAspect / canvasAspect;
            } else {
              scale.y = canvasAspect / textureAspect;
            }

            return (uv - 0.5) / scale + 0.5;
          }

          void main() {
            vec2 uv = vUv;
            vec4 data = texture2D(uSim, uv);

            vec2 offset = data.zw * uDistort;
            vec2 uvSample = containUv(uv + offset, uCanvasAspect, uTextureAspect);

            if (
              uvSample.x < 0.0 ||
              uvSample.x > 1.0 ||
              uvSample.y < 0.0 ||
              uvSample.y > 1.0
            ) {
              gl_FragColor = vec4(0.0);
              return;
            }

            uvSample = clamp(uvSample, vec2(0.001), vec2(0.999));

            vec4 color = texture2D(uTexture, uvSample);

            // Subtle glint
            vec3 normal = normalize(vec3(-data.z, 0.25, -data.w));
            float spec = pow(max(0.0, dot(normal, normalize(uLightDir))), 60.0);
            color.rgb += spec * uGlint;

            gl_FragColor = color;
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      })

      // Build scenes
      const simScene = new THREE.Scene()
      const simMesh = new THREE.Mesh(geometry, simMaterial)
      simScene.add(simMesh)

      const renderScene = new THREE.Scene()
      const renderMesh = new THREE.Mesh(geometry, renderMaterial)
      renderScene.add(renderMesh)

      // Initial texture + mutation observer
      applyTexture(getTextureUrl())

      let lastUrl = getTextureUrl()
      const mo = new MutationObserver(() => {
        const nextUrl = getTextureUrl()
        if (nextUrl !== lastUrl) {
          applyTexture(nextUrl)
          lastUrl = nextUrl
        }
      })
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

      // Resize
      const setSize = () => {
        const rect = host.getBoundingClientRect()
        const w = Math.max(1, Math.floor(rect.width))
        const h = Math.max(1, Math.floor(rect.height))
        renderer.setSize(w, h, false)
        renderUniforms.uCanvasAspect.value = w / h
      }

      setSize()
      const ro = new ResizeObserver(() => setSize())
      ro.observe(host)

      // Pointer handlers (hover driven)
      const updateMouse01 = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        const x01 = Math.max(0, Math.min(1, x))
        const y01 = Math.max(0, Math.min(1, y))
        mouse01.set(x01, 1.0 - y01)
      }

      const onMove = (e: PointerEvent) => {
        updateMouse01(e)
        hoverTarget = 1
        lastMoveSec = simUniforms.uTime.value as number
      }

      const onLeave = () => {
        hoverTarget = 0
      }

      if (supportsHoverPointer) {
        renderer.domElement.addEventListener("pointermove", onMove)
        renderer.domElement.addEventListener("pointerleave", onLeave)
        renderer.domElement.addEventListener("pointercancel", onLeave)
      }

      // Touch devices: listen on window with passive listeners so scrolling
      // is never blocked; ripples appear when the finger crosses the canvas
      const onTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0]
        if (!touch) return

        const rect = renderer.domElement.getBoundingClientRect()
        const x = (touch.clientX - rect.left) / rect.width
        const y = (touch.clientY - rect.top) / rect.height

        if (x < 0 || x > 1 || y < 0 || y > 1) {
          hoverTarget = 0
          return
        }

        mouse01.set(x, 1.0 - y)
        hoverTarget = 1
        lastMoveSec = simUniforms.uTime.value as number
      }

      const onTouchEnd = () => {
        hoverTarget = 0
      }

      window.addEventListener("touchstart", onTouchMove, { passive: true })
      window.addEventListener("touchmove", onTouchMove, { passive: true })
      window.addEventListener("touchend", onTouchEnd)
      window.addEventListener("touchcancel", onTouchEnd)

      // Animation
      let raf = 0
      const start = performance.now()
      let frame = 0

      const tick = () => {
        const t = (performance.now() - start) / 1000
        simUniforms.uTime.value = t
        simUniforms.uFrame.value = frame

        // Hover easing (auto-fade when pointer stops)
        const nowSec = t
        if (nowSec - lastMoveSec > 0.1) hoverTarget = 0
        hover += (hoverTarget - hover) * 0.18
        if (hover < 0.001) hover = 0
        simUniforms.uMouseDown.value = hover

        // Simulation pass
        simUniforms.uPrev.value = rtA.texture
        renderer.setRenderTarget(rtB)
        renderer.render(simScene, camera)
        renderer.setRenderTarget(null)

        // Swap
        const tmp = rtA
        rtA = rtB
        rtB = tmp

        // Render pass
        renderUniforms.uSim.value = rtA.texture
        if (textureReady) {
          renderer.render(renderScene, camera)
        }

        frame++
        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)

      return () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        mo.disconnect()

        if (supportsHoverPointer) {
          renderer.domElement.removeEventListener("pointermove", onMove)
          renderer.domElement.removeEventListener("pointerleave", onLeave)
          renderer.domElement.removeEventListener("pointercancel", onLeave)
        }

        window.removeEventListener("touchstart", onTouchMove)
        window.removeEventListener("touchmove", onTouchMove)
        window.removeEventListener("touchend", onTouchEnd)
        window.removeEventListener("touchcancel", onTouchEnd)

        simScene.remove(simMesh)
        renderScene.remove(renderMesh)

        geometry.dispose()
        simMaterial.dispose()
        renderMaterial.dispose()

        rtA.dispose()
        rtB.dispose()

        if (currentTexture) currentTexture.dispose()
        renderer.dispose()

        if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement)
      }
    }

    // three.js is heavy, so pull it in lazily after hydration; the static
    // fallback <img> keeps the rings visible until the WebGL canvas is ready
    import("./three-lite").then((THREE) => {
      if (disposed) return
      cleanup = init(THREE)
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div>
      <div
        ref={threeHostRef}
        className="relative aspect-square w-60 md:w-80 lg:w-110
         select-none
    [-webkit-touch-callout:none] [-webkit-tap-highlight-color:transparent]"
        aria-label="hero rings"
      >
        <img
          src={heroRingsDark.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300 [html.light_&]:hidden"
          data-rings-fallback
          draggable={false}
        />
        <img
          src={heroRingsLight.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-contain transition-opacity duration-300 [html.light_&]:block"
          data-rings-fallback
          draggable={false}
        />
      </div>
    </div>
  )
}

export default RippleEffectRings
