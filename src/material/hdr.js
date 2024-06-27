import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import gsap from 'gsap'
import * as dat from 'dat.gui'

// 创建场景
const scene = new THREE.Scene()

const rgbeLoader = new RGBELoader()

rgbeLoader.loadAsync('img/venice_sunset_1k.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
})

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)
const envMapTexture = new THREE.CubeTextureLoader().load([
  'img/px.png',
  'img/nx.png',
  'img/py.png',
  'img/ny.png',
  'img/pz.png',
  'img/nz.png'
])

const cubeGeometry = new THREE.SphereGeometry(1, 20, 20)
const basicMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  // map: actorColorTextTrue,
  // 一些地方透明, 一些地方全遮挡
  // alphaMap: actorAplhaTextTrue,
  // 环境光线, 可以显得更真实
  // aoMap: actorColorTextTrue,
  // transparent: true,
  // opacity: 0.5,
  // metalness: 0.7,
  // roughness: 0.1,
  envMap: envMapTexture
  //  side: THREE.DoubleSide
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)

// 灯光
// const light = new THREE.AmbientLight(0xffffff, 0.5)
const light = new THREE.DirectionalLight(0xffffff, 0.5)
light.position.set(10, 10, 10)
light.castShadow = true
scene.add(light)

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
