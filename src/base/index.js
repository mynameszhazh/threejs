import * as Three from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
new OrbitControls(camera, renderer.domElement)
const axesHelper = new Three.AxesHelper(5)

scene.add(axesHelper)

const clock = new Three.Clock()
function animate(time) {
  let time1 = clock.getElapsedTime()
  let deltaTime = clock.getDelta()

  // let t = (time / 1000) % 5
  // cube.position.x = t * 1
  // if (cube.position.x > 5) {
  //   cube.position.x = 0
  // }
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
