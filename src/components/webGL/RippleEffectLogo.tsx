import { useEffect, useRef } from "react"
import type { Texture, WebGLRenderer } from "three"
import logo from "../../assets/images/common/kondo-logo-primary.svg"

function RippleEffectLogo() {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let disposed = false
    let cleanup: (() => void) | undefined

    const init = (THREE: typeof import("./three-lite")) => {
      const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches
      let renderer: WebGLRenderer

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
        })
      } catch {
        return
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3))
      renderer.setClearColor(0x000000, 0)
      Object.assign(renderer.domElement.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: supportsHover ? "auto" : "none",
      })
      host.appendChild(renderer.domElement)

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 1
      const geometry = new THREE.PlaneGeometry(2, 2)
      const vertexShader = `
        precision highp float;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `

      const SIM_WIDTH = 768
      const SIM_HEIGHT = 120
      const makeTarget = () =>
        new THREE.WebGLRenderTarget(SIM_WIDTH, SIM_HEIGHT, {
          format: THREE.RGBAFormat,
          type: THREE.HalfFloatType,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          depthBuffer: false,
          stencilBuffer: false,
        })

      let readTarget = makeTarget()
      let writeTarget = makeTarget()
      const pointer = new THREE.Vector2(0.5, 0.5)
      const simUniforms = {
        uPrevious: { value: readTarget.texture as Texture },
        uResolution: { value: new THREE.Vector2(SIM_WIDTH, SIM_HEIGHT) },
        uPointer: { value: pointer },
        uPointerInfluence: { value: 0 },
        uTime: { value: 0 },
        uFrame: { value: 0 },
      }

      const simMaterial = new THREE.ShaderMaterial({
        uniforms: simUniforms,
        vertexShader,
        fragmentShader: `
          precision highp float;
          uniform sampler2D uPrevious;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uPointerInfluence;
          uniform float uTime;
          uniform int uFrame;
          varying vec2 vUv;

          void main() {
            if (uFrame == 0) {
              gl_FragColor = vec4(0.0);
              return;
            }

            vec2 texel = 1.0 / uResolution;
            vec2 uvR = clamp(vUv + vec2(texel.x, 0.0), 0.0, 1.0);
            vec2 uvL = clamp(vUv - vec2(texel.x, 0.0), 0.0, 1.0);
            vec2 uvU = clamp(vUv + vec2(0.0, texel.y), 0.0, 1.0);
            vec2 uvD = clamp(vUv - vec2(0.0, texel.y), 0.0, 1.0);
            vec4 previous = texture2D(uPrevious, vUv);
            float pressure = previous.x;
            float velocity = previous.y;
            float right = texture2D(uPrevious, uvR).x;
            float left = texture2D(uPrevious, uvL).x;
            float up = texture2D(uPrevious, uvU).x;
            float down = texture2D(uPrevious, uvD).x;

            velocity += (-4.0 * pressure + right + left + up + down) * 0.25;
            pressure += velocity;
            velocity -= 0.005 * pressure;
            velocity *= 0.98;
            pressure *= 0.985;

            float pointerDistance = distance(
              vUv * uResolution,
              uPointer * uResolution
            );
            if (pointerDistance < 32.0) {
              pressure += (1.0 - pointerDistance / 32.0) *
                0.75 * uPointerInfluence;
            }

            pressure += 0.00002 * sin(
              uTime * 0.65 + vUv.x * 18.0 + vUv.y * 5.0
            );
            gl_FragColor = vec4(
              pressure,
              velocity,
              (right - left) * 0.5,
              (up - down) * 0.5
            );
          }
        `,
        depthTest: false,
        depthWrite: false,
      })

      const renderUniforms = {
        uTexture: { value: null as Texture | null },
        uSimulation: { value: readTarget.texture as Texture },
        uDistortion: { value: 0.18 },
      }
      const renderMaterial = new THREE.ShaderMaterial({
        uniforms: renderUniforms,
        vertexShader,
        fragmentShader: `
          precision highp float;
          uniform sampler2D uTexture;
          uniform sampler2D uSimulation;
          uniform float uDistortion;
          varying vec2 vUv;

          void main() {
            vec4 ripple = texture2D(uSimulation, vUv);
            // Reserve 4% transparent space on each horizontal side so the
            // distorted logo can move without being clipped by the canvas.
            vec2 sampleUv = vec2(
              (vUv.x - 0.04) / 0.92,
              vUv.y
            ) + ripple.zw * uDistortion;

            if (
              sampleUv.x < 0.0 || sampleUv.x > 1.0 ||
              sampleUv.y < 0.0 || sampleUv.y > 1.0
            ) {
              gl_FragColor = vec4(0.0);
              return;
            }

            vec4 color = texture2D(uTexture, sampleUv);
            gl_FragColor = color;
          }
        `,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      })

      const simScene = new THREE.Scene()
      simScene.add(new THREE.Mesh(geometry, simMaterial))
      const renderScene = new THREE.Scene()
      renderScene.add(new THREE.Mesh(geometry, renderMaterial))

      const fallback = host.querySelector<HTMLImageElement>("[data-logo-fallback]")
      const sourceImage = fallback ?? new Image()
      if (!fallback) sourceImage.src = logo.src
      let logoTexture: Texture | null = null
      let textureReady = false

      sourceImage
        .decode()
        .then(() => {
          if (disposed) return
          // Rasterize the SVG above its intrinsic 533 × 83 size before
          // uploading it to WebGL. This keeps the enlarged logo crisp on
          // high-density displays instead of stretching a small texture.
          const rect = host.getBoundingClientRect()
          const targetWidth = Math.min(
            3072,
            Math.max(
              2132,
              Math.ceil(rect.width * Math.min(window.devicePixelRatio || 1, 3)),
            ),
          )
          const textureCanvas = document.createElement("canvas")
          textureCanvas.width = targetWidth
          textureCanvas.height = Math.ceil(targetWidth * (83 / 533))
          const context = textureCanvas.getContext("2d")
          if (!context) throw new Error("Could not prepare the logo texture")
          context.drawImage(
            sourceImage,
            0,
            0,
            textureCanvas.width,
            textureCanvas.height,
          )

          logoTexture = new THREE.Texture(textureCanvas)
          logoTexture.minFilter = THREE.LinearFilter
          logoTexture.magFilter = THREE.LinearFilter
          logoTexture.generateMipmaps = false
          // Keep the SVG's authored RGB values unchanged. Marking this custom
          // shader texture as sRGB makes the logo noticeably darker because
          // the sampled color is converted without the matching output pass.
          logoTexture.needsUpdate = true
          renderUniforms.uTexture.value = logoTexture
          textureReady = true
          fallback?.style.setProperty("opacity", "0")
        })
        .catch(() => renderer.domElement.style.setProperty("display", "none"))

      const resize = () => {
        const rect = host.getBoundingClientRect()
        renderer.setSize(
          Math.max(1, Math.floor(rect.width)),
          Math.max(1, Math.floor(rect.height)),
          false,
        )
      }
      resize()
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(host)

      let influence = 0
      let influenceTarget = 0
      let lastMove = 0
      const updatePointer = (clientX: number, clientY: number) => {
        const rect = renderer.domElement.getBoundingClientRect()
        const x = (clientX - rect.left) / rect.width
        const y = (clientY - rect.top) / rect.height
        if (x < 0 || x > 1 || y < 0 || y > 1) return false
        pointer.set(x, 1 - y)
        influenceTarget = 1
        lastMove = performance.now()
        return true
      }
      const onPointerMove = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY)
      }
      const onPointerLeave = () => { influenceTarget = 0 }
      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0]
        if (!touch || !updatePointer(touch.clientX, touch.clientY)) {
          influenceTarget = 0
        }
      }

      if (supportsHover) {
        renderer.domElement.addEventListener("pointermove", onPointerMove)
        renderer.domElement.addEventListener("pointerleave", onPointerLeave)
        renderer.domElement.addEventListener("pointercancel", onPointerLeave)
      }
      window.addEventListener("touchstart", onTouchMove, { passive: true })
      window.addEventListener("touchmove", onTouchMove, { passive: true })
      window.addEventListener("touchend", onPointerLeave)
      window.addEventListener("touchcancel", onPointerLeave)

      let frame = 0
      let animationFrame = 0
      let visible = true
      const startedAt = performance.now()
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true
      })
      visibilityObserver.observe(host)

      const tick = () => {
        animationFrame = requestAnimationFrame(tick)
        if (!visible || document.hidden || !textureReady) return
        const now = performance.now()
        if (now - lastMove > 100) influenceTarget = 0
        influence += (influenceTarget - influence) * 0.18
        if (influence < 0.001) influence = 0

        simUniforms.uTime.value = (now - startedAt) / 1000
        simUniforms.uFrame.value = frame
        simUniforms.uPointerInfluence.value = influence
        simUniforms.uPrevious.value = readTarget.texture
        renderer.setRenderTarget(writeTarget)
        renderer.render(simScene, camera)
        renderer.setRenderTarget(null)
        const swap = readTarget
        readTarget = writeTarget
        writeTarget = swap
        renderUniforms.uSimulation.value = readTarget.texture
        renderer.render(renderScene, camera)
        frame += 1
      }
      animationFrame = requestAnimationFrame(tick)

      return () => {
        cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        visibilityObserver.disconnect()
        if (supportsHover) {
          renderer.domElement.removeEventListener("pointermove", onPointerMove)
          renderer.domElement.removeEventListener("pointerleave", onPointerLeave)
          renderer.domElement.removeEventListener("pointercancel", onPointerLeave)
        }
        window.removeEventListener("touchstart", onTouchMove)
        window.removeEventListener("touchmove", onTouchMove)
        window.removeEventListener("touchend", onPointerLeave)
        window.removeEventListener("touchcancel", onPointerLeave)
        geometry.dispose()
        simMaterial.dispose()
        renderMaterial.dispose()
        readTarget.dispose()
        writeTarget.dispose()
        logoTexture?.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    import("./three-lite").then((THREE) => {
      if (!disposed) cleanup = init(THREE)
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className="relative aspect-[533/83] w-[clamp(18rem,55vw,50rem)] select-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]"
      aria-label="Home"
      role="img"
    >
      <img
        src={logo.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-y-0 left-[4%] h-full w-[92%] transition-opacity duration-300"
        data-logo-fallback
        draggable={false}
      />
    </div>
  )
}

export default RippleEffectLogo
