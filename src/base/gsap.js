import * as Three from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'

// 创建场景
const scene = new Three.Scene()

// 创建相机
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
const cubeGeometry = new Three.BoxGeometry(1, 1, 1)
const cubeMaterial = new Three.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new Three.Mesh(cubeGeometry, cubeMaterial)
// cube.scale.set(3, 2, 1)
cube.rotation.set(Math.PI / 4, Math.PI / 4, 0, 'XYZ')
scene.add(cube)

// 初始化渲染器
const renderer = new Three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const axesHelper = new Three.AxesHelper(5)

scene.add(axesHelper)

let animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'back.inOut',
  repeat: -1,
  yoyo: true,
  delay: 2,
  onComplete() {
    console.log('onComplete')
  }
})
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 })

window.addEventListener('dblclick', () => {
  // 全屏操作
  const fullScreenElement = document.fullscreenElement
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }

  // if (animate1.isActive()) {
  //   animate1.pause()
  // } else {
  //   animate1.resume()
  // }
})

function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', () => {
  // 更新渲染器尺寸
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.setPixelRatio(window.devicePixelRatio)
})
