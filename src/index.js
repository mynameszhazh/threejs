import * as Three from 'three'

console.log('Three:', Three)

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
scene.add(cube)

// 初始化渲染器
const renderer = new Three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)