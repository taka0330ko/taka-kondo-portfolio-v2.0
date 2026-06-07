import { useEffect, useRef } from "react"
import * as THREE from "three"
import moon from "../../assets/images/archive/moon.png"

function RippleEffectMoon() {
  const threeHostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = threeHostRef.current
    if (!host) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReducedMotion) return

    const supportsHoverPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches

    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: true,
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.inset = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"
    renderer.domElement.style.pointerEvents = supportsHoverPointer
      ? "auto"
      : "none"
    host.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1
    const geometry = new THREE.PlaneGeometry(2, 2)

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
    const mouse01 = new THREE.Vector2(0.5, 0.5)

    const simUniforms = {
      uPrev: { value: rtA.texture },
      uResolution: { value: new THREE.Vector2(SIM_SIZE, SIM_SIZE) },
      uMouse01: { value: mouse01 },
      uPointerInfluence: { value: 0 },
      uTime: { value: 0 },
      uFrame: { value: 0 },
      uRadiusPx: { value: 18 },
      uInject: { value: 0.8 },
      uVelocityDamping: { value: 0.003 },
      uPressureDamping: { value: 0.997 },
      uSpring: { value: 0.005 },
      uAmbient: { value: 0.00008 },
    }

    const vertexShader = `
      precision highp float;

      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: simUniforms,
      vertexShader,
      fragmentShader: `
        precision highp float;

        uniform sampler2D uPrev;
        uniform vec2 uResolution;
        uniform vec2 uMouse01;
        uniform float uPointerInfluence;
        uniform float uTime;
        uniform int uFrame;
        uniform float uRadiusPx;
        uniform float uInject;
        uniform float uVelocityDamping;
        uniform float uPressureDamping;
        uniform float uSpring;
        uniform float uAmbient;

        varying vec2 vUv;

        void main() {
          if (uFrame == 0) {
            gl_FragColor = vec4(0.0);
            return;
          }

          vec2 texel = 1.0 / uResolution;
          vec2 uv = vUv;
          vec2 uvR = clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0));
          vec2 uvL = clamp(uv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0));
          vec2 uvU = clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0));
          vec2 uvD = clamp(uv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0));

          vec4 previous = texture2D(uPrev, uv);
          float pressure = previous.x;
          float velocity = previous.y;
          float pressureR = texture2D(uPrev, uvR).x;
          float pressureL = texture2D(uPrev, uvL).x;
          float pressureU = texture2D(uPrev, uvU).x;
          float pressureD = texture2D(uPrev, uvD).x;

          velocity += (-2.0 * pressure + pressureR + pressureL) * 0.25;
          velocity += (-2.0 * pressure + pressureU + pressureD) * 0.25;
          pressure += velocity;
          velocity -= uSpring * pressure;
          velocity *= 1.0 - uVelocityDamping;
          pressure *= uPressureDamping;

          if (uPointerInfluence > 0.001) {
            vec2 fragPx = uv * uResolution;
            vec2 pointerPx = uMouse01 * uResolution;
            float pointerDistance = distance(fragPx, pointerPx);

            if (pointerDistance <= uRadiusPx) {
              pressure +=
                (1.0 - pointerDistance / uRadiusPx) *
                uInject *
                uPointerInfluence;
            }
          }

          pressure +=
            uAmbient *
            sin(uTime * 0.55 + uv.x * 8.0 + uv.y * 6.0);

          float gradientX = (pressureR - pressureL) * 0.5;
          float gradientY = (pressureU - pressureD) * 0.5;

          gl_FragColor = vec4(pressure, velocity, gradientX, gradientY);
        }
      `,
      depthTest: false,
      depthWrite: false,
    })

    const renderUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uSim: { value: rtA.texture },
      uDistort: { value: 0.075 },
      uGlint: { value: 0.08 },
      uLightDirection: {
        value: new THREE.Vector3(-3, 8, 4).normalize(),
      },
    }

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: renderUniforms,
      vertexShader,
      fragmentShader: `
        precision highp float;

        uniform sampler2D uTexture;
        uniform sampler2D uSim;
        uniform float uDistort;
        uniform float uGlint;
        uniform vec3 uLightDirection;

        varying vec2 vUv;

        void main() {
          vec4 ripple = texture2D(uSim, vUv);
          vec2 offset = ripple.zw * uDistort;
          vec2 sampleUv = clamp(vUv + offset, vec2(0.001), vec2(0.999));
          vec4 color = texture2D(uTexture, sampleUv);

          vec3 normal = normalize(vec3(-ripple.z, 0.3, -ripple.w));
          float glint = pow(
            max(0.0, dot(normal, normalize(uLightDirection))),
            72.0
          );

          color.rgb += glint * uGlint * color.a;
          gl_FragColor = color;
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    const simScene = new THREE.Scene()
    const simMesh = new THREE.Mesh(geometry, simMaterial)
    simScene.add(simMesh)

    const renderScene = new THREE.Scene()
    const renderMesh = new THREE.Mesh(geometry, renderMaterial)
    renderScene.add(renderMesh)

    const textureLoader = new THREE.TextureLoader()
    let imageTexture: THREE.Texture | null = null
    let textureReady = false
    let disposed = false

    textureLoader.load(
      moon.src,
      (texture) => {
        if (disposed) {
          texture.dispose()
          return
        }

        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        texture.colorSpace = THREE.SRGBColorSpace
        imageTexture = texture
        renderUniforms.uTexture.value = texture
        textureReady = true
        host.dataset.webglReady = "true"
        renderer.render(renderScene, camera)
        const fallbackImage =
          host.querySelector<HTMLImageElement>("[data-moon-fallback]")
        if (fallbackImage) fallbackImage.style.opacity = "0"
      },
      undefined,
      () => {
        renderer.domElement.style.display = "none"
      },
    )

    let resizeTimer: number | null = null
    let renderWidth = 0
    let renderHeight = 0

    const setSize = () => {
      const rect = host.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))

      if (width === renderWidth && height === renderHeight) return

      renderWidth = width
      renderHeight = height
      renderer.setSize(width, height, false)

      if (textureReady) {
        renderer.render(renderScene, camera)
      }
    }

    const scheduleResize = () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer)
      }

      resizeTimer = window.setTimeout(() => {
        setSize()
        resizeTimer = null
      }, 120)
    }

    setSize()
    const resizeObserver = new ResizeObserver(scheduleResize)
    resizeObserver.observe(host)

    let pointerInfluence = 0
    let pointerTarget = 0
    let lastPointerMove = 0

    const updatePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      mouse01.set(
        THREE.MathUtils.clamp(x, 0, 1),
        1 - THREE.MathUtils.clamp(y, 0, 1),
      )
    }

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event)
      pointerTarget = 1
      lastPointerMove = performance.now()
    }

    const onPointerLeave = () => {
      pointerTarget = 0
    }

    if (supportsHoverPointer) {
      renderer.domElement.addEventListener("pointermove", onPointerMove)
      renderer.domElement.addEventListener("pointerleave", onPointerLeave)
      renderer.domElement.addEventListener("pointercancel", onPointerLeave)
    }

    let frame = 0
    let animationFrame = 0
    let isVisible = true
    const startTime = performance.now()

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true
    })
    visibilityObserver.observe(host)

    const tick = () => {
      animationFrame = requestAnimationFrame(tick)
      if (!isVisible || document.hidden || !textureReady) return

      const now = performance.now()
      const elapsed = (now - startTime) / 1000

      if (now - lastPointerMove > 100) pointerTarget = 0
      pointerInfluence += (pointerTarget - pointerInfluence) * 0.18
      if (pointerInfluence < 0.001) pointerInfluence = 0

      simUniforms.uTime.value = elapsed
      simUniforms.uFrame.value = frame
      simUniforms.uPointerInfluence.value = pointerInfluence
      simUniforms.uPrev.value = rtA.texture

      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)
      renderer.setRenderTarget(null)

      const previousTarget = rtA
      rtA = rtB
      rtB = previousTarget

      renderUniforms.uSim.value = rtA.texture
      renderer.render(renderScene, camera)
      frame += 1
    }

    animationFrame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      if (resizeTimer !== null) window.clearTimeout(resizeTimer)

      if (supportsHoverPointer) {
        renderer.domElement.removeEventListener("pointermove", onPointerMove)
        renderer.domElement.removeEventListener("pointerleave", onPointerLeave)
        renderer.domElement.removeEventListener("pointercancel", onPointerLeave)
      }

      geometry.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()
      rtA.dispose()
      rtB.dispose()
      imageTexture?.dispose()
      renderer.dispose()

      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={threeHostRef}
      className="relative aspect-square w-full max-w-150 select-none overflow-hidden [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]"
      aria-label="Interactive moon ripple"
      role="img"
    >
      <img
        src={moon.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
        data-moon-fallback
        draggable={false}
      />
    </div>
  )
}

export default RippleEffectMoon
