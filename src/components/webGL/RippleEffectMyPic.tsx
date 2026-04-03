import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import myPic from "../../assets/images/about/taka-picture.png"

function RippleEffectMyPic() {
  const threeHostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = threeHostRef.current
    if (!host) return

    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    const supportsHoverPointer =
      window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"
    renderer.domElement.style.pointerEvents = supportsHoverPointer ? "auto" : "none"
    host.appendChild(renderer.domElement)

    // Camera and full-screen plane
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1)

    // Texture (image)
    const textureLoader = new THREE.TextureLoader()
    let imageTex: THREE.Texture | null = null

    const loadImage = (url: string) => {
      const tex = textureLoader.load(url)
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      if ("colorSpace" in tex) {
        tex.colorSpace = THREE.SRGBColorSpace
      }
      if (imageTex) imageTex.dispose()
      imageTex = tex
    }

    loadImage(myPic.src)

    // Simulation resolution (kept modest for performance)
    const SIM_SIZE = 320

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

    // Pointer state in sim space (hover-driven)
    const mouse01 = new THREE.Vector2(0.5, 0.5)
    let hover = 0
    let hoverTarget = 0
    let lastMoveSec = 0

    // Simulation material (updates water state)
    const simUniforms = {
      uPrev: { value: rtA.texture as THREE.Texture },
      uResolution: { value: new THREE.Vector2(SIM_SIZE, SIM_SIZE) },
      uMouse01: { value: mouse01 },
      uMouseDown: { value: 0.0 },
      uTime: { value: 0.0 },
      uFrame: { value: 0 },
      uDelta: { value: 1.0 },
      uRadiusPx: { value: 20.0 },
      uInject: { value: 0.6 },
      uVelDamp: { value: 0.002 },
      uPressDamp: { value: 0.999 },
      uSpring: { value: 0.005 },
      // Tiny ambient wobble so the surface is never perfectly dead-flat
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
        uniform float uMouseDown;
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
          // First frame: clear to zero
          if (uFrame == 0) {
            gl_FragColor = vec4(0.0);
            return;
          }

          vec2 texel = 1.0 / uResolution;

          // Clamp neighbor sampling to avoid fixed boundaries
          vec2 uv = vUv;
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

          // Hover injection (in pixel space). uMouseDown is 0..1 influence.
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

    // Render material (distorts image using sim gradients)
    const renderUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uSim: { value: rtA.texture as THREE.Texture },
      uDistort: { value: 0.10 },
      uGlint: { value: 0.18 },
      uLightDir: { value: new THREE.Vector3(-3, 10, 3).normalize() },
    }
    renderUniforms.uTexture.value = imageTex

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
        uniform float uDistort;
        uniform float uGlint;
        uniform vec3 uLightDir;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          vec4 data = texture2D(uSim, uv);

          // Distort by gradients
          vec2 offset = data.zw * uDistort;
          vec2 uvSample = clamp(uv + offset, vec2(0.001), vec2(0.999));

          vec4 color = texture2D(uTexture, uvSample);

          // Optional sunlight glint
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

    // Scenes
    const simScene = new THREE.Scene()
    const simMesh = new THREE.Mesh(geometry, simMaterial)
    simScene.add(simMesh)

    const renderScene = new THREE.Scene()
    const renderMesh = new THREE.Mesh(geometry, renderMaterial)
    renderScene.add(renderMesh)

    // Resize
    const setSize = () => {
      const rect = host.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      renderer.setSize(w, h, false)
    }

    setSize()
    const ro = new ResizeObserver(() => setSize())
    ro.observe(host)

    // Pointer handlers
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

    // Animation
    let raf = 0
    const start = performance.now()
    let frame = 0

    const tick = () => {
      const t = (performance.now() - start) / 1000
      simUniforms.uTime.value = t
      simUniforms.uFrame.value = frame

      // Auto fade hover when pointer stops moving
      const nowSec = t
      if (nowSec - lastMoveSec > 0.10) hoverTarget = 0
      hover += (hoverTarget - hover) * 0.18
      if (hover < 0.001) hover = 0
      simUniforms.uMouseDown.value = hover

      // Pass the current sim texture as previous
      simUniforms.uPrev.value = rtA.texture

      // Render simulation into rtB
      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)
      renderer.setRenderTarget(null)

      // Swap targets
      const tmp = rtA
      rtA = rtB
      rtB = tmp

      // Render scene uses the latest sim texture
      renderUniforms.uSim.value = rtA.texture
      renderUniforms.uTexture.value = imageTex

      renderer.render(renderScene, camera)

      frame++
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()

      if (supportsHoverPointer) {
        renderer.domElement.removeEventListener("pointermove", onMove)
        renderer.domElement.removeEventListener("pointerleave", onLeave)
        renderer.domElement.removeEventListener("pointercancel", onLeave)
      }

      simScene.remove(simMesh)
      renderScene.remove(renderMesh)

      geometry.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()

      rtA.dispose()
      rtB.dispose()

      if (imageTex) imageTex.dispose()
      renderer.dispose()

      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div>
      <div
        ref={threeHostRef}
        className="relative w-75 md:w-90 lg:w-112.5 aspect-square overflow-hidden rounded-lg
    select-none
    [-webkit-touch-callout:none] [-webkit-tap-highlight-color:transparent]"
        aria-label="hero rings"
      />
    </div>
  )
}

export default RippleEffectMyPic
