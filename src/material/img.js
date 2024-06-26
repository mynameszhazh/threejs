import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'
import * as dat from 'dat.gui'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

const textrueLoader = new THREE.TextureLoader()
// 图片的地址要放到 dist 目录下
const actorColorTextTrue = textrueLoader.load('./img/avtor.png')
const actorAplhaTextTrue = textrueLoader.load('./img/alpha.png')

// doorColorTextTrue.offset.set(0.5, 0.5)
// doorColorTextTrue.rotation = Math.PI / 4
// doorColorTextTrue.center.set(0.5, 0.5)

actorColorTextTrue.repeat.set(3, 3)
actorColorTextTrue.wrapS = THREE.RepeatWrapping
actorColorTextTrue.wrapT = THREE.RepeatWrapping

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const basicMaterial = new THREE.MeshBasicMaterial({
  map: actorColorTextTrue,
  // 一些地方透明, 一些地方全遮挡
  alphaMap: actorAplhaTextTrue,
  // 环境光线, 可以显得更真实
  // aoMap: actorColorTextTrue,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), basicMaterial)
plane.position.set(2, 0, 0)
scene.add(plane)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
