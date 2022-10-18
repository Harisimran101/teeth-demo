import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader  } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { LoadingManager } from 'https://cdn.skypack.dev/three@0.136/src/loaders/LoadingManager.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js';


// fetch('http://bclear-001-site1.ctempurl.com/BClearApi/GetTreatmentPlanModel')
//   .then((response) => response.json())
//   .then((data) => dataloaded(data) );


  function dataloaded(apidata){
     console.log(apidata)

   //  patientname.innerText = apidata.PatientName
     init([apidata.LowerModels,apidata.UpperModels])
  }

  init()


function init(models){

function createpoints(amount){

    for(let i = 1; i <= amount; i++){
        let point = document.createElement('div')
        point.innerHTML = `
        <div class="timeline-point">
        <i class="bi bi-geo-alt-fill"></i>
    </div>
        `
   
        document.querySelector('.timeline-bar').appendChild(point)
    }

    
}


let totalpoints = 11

createpoints(totalpoints)

const timelinebar = document.querySelector('.timeline-bar')
const progressbar = document.querySelector('.timeline-progress')
const totalsteptext = document.querySelector('.total-steps')
const patientname = document.querySelector('.patient-name')
const webgl = document.querySelector('#webgl')

// patientname.innerText = apidata.PatientName
totalsteptext.innerText = totalpoints

const size = {
    width: webgl.offsetWidth,
    height: webgl.offsetHeight
}


const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 70, size.width / size.height, 0.1, 3000 );

			const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: webgl,
        alpha: true
      });
			renderer.setSize( size.width,size.height );
			document.body.appendChild( renderer.domElement );
		    renderer.toneMappingExposure = 0.85;
			renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setClearColor( 0xff0000, 0.0 )
            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );

scene.add( directionalLight );

const light = new THREE.AmbientLight( 0x404040,2 ); // soft white light
scene.add( light );


const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true

const objmaterial = new THREE.MeshPhysicalMaterial({
     color: 'white',
     roughness: 0.4,
     clearcoat: 0.4,
     clearcoatRoughness: 0.3,
     flatShading: false
})

const jaws = [
    {jaws: []},
    {jaws: []}
]

const path = ['Lower','Upper']


const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {


};

manager.onLoad = function ( ) {


    document.querySelector('.preloader').style.display = 'none'
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {


   document.querySelector('.preloader h1').innerText = ( (itemsLoaded /itemsTotal) * 100 ).toFixed(0) + '%'
};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'draco/' );

const loader = new GLTFLoader(manager)
loader.setDRACOLoader(dracoLoader)




for(let i = 0; i <= 11; i++){
    loader.load(`Lower/` + `lower-model-${i+1}.glb`, (gltf) =>{
        
        const mesh = new THREE.Mesh(gltf.scene.children[0].geometry, objmaterial)
       // geometry.computeVertexNormals()
        
         mesh.name = `Lower jaw + ${i}`  
         console.log(mesh)
    
    
         scene.add(mesh)
    
         mesh.visible = false
         jaws[0].jaws.push(mesh)
    
         mesh.scale.set(0.1,0.1,0.1)
         mesh.rotation.x = Math.PI / 2

          
    
    })
    
}

for(let i = 0; i <= 11; i++){
    loader.load(`Upper/` + `upper-model-${i+1}.glb`, (gltf) =>{
        const mesh = new THREE.Mesh(gltf.scene.children[0].geometry, objmaterial)
    //    geometry.computeVertexNormals()
        
         mesh.name = `Upper jaw + ${i}` 
         console.log(mesh)
    
    
         scene.add(mesh)
    
         mesh.visible = false
         jaws[1].jaws.push(mesh)
    
         mesh.scale.set(0.1,0.1,0.1)
         mesh.rotation.x = Math.PI / 2
          
    
    })
    
}


let playing = true

function play(time){
    setTimeout(() =>{
        conditionallogic()
    },time)
}




let count = 0;
let maxcount =7;
let value = 1000;
let upperteeth = true
let lowerteeth = true
let bothteeth = true

class timeline {
 
   constructor(value){
    this.speed = value

    play(value)

  
       
    }

   
}


function conditionallogic(){

         
    if(playing){
       

         
   

        if(count >= maxcount){
            play(value)
            count = 0;
            // progressbar.style.width =  (13.0 * (count + 1) )   + '%'
            progressbar.style.width =  ( (document.querySelector('.timeline-bar').offsetWidth / totalpoints) * (count) )* 1.13  + 'px'
            document.querySelector('.current-step').innerText = count + 1
        }

        else {
            play(value)
            count += 1
            progressbar.style.width =  ( (document.querySelector('.timeline-bar').offsetWidth / totalpoints) * (count) )  * 1.13 + 'px'

            // progressbar.style.width =  (12.8 * (count + 1))  + '%'
            document.querySelector('.current-step').innerText = count + 1
        }

    
       
        
        for(let i = 0; i < jaws[0].jaws.length; i++){
            jaws[0].jaws[i].visible = false
            jaws[1].jaws[i].visible = false
        }
 
      if(lowerteeth || bothteeth){
        jaws[0].jaws[count].visible = true

      }

      else {
        jaws[0].jaws[count].visible = false
      }

      if(upperteeth || bothteeth){
        jaws[1].jaws[count].visible = true
      }

      else {
        jaws[1].jaws[count].visible = false

      }
 
     
    }



  
else {
    
jaws[0].jaws.forEach(function(el,i){
    el.visible = false

})

jaws[1].jaws.forEach((el,i) =>{ 
    el.visible = false
})


jaws[0].jaws[count].visible = true



jaws[1].jaws[count].visible = true




}

    
   
}

let newtimeline = new timeline(1000)


document.querySelector('.play-icon').addEventListener('click', (e) =>{

    if(playing){
        playing = false
        conditionallogic()

        if(lowerteeth || bothteeth){
            jaws[0].jaws[count].visible = true
            jaws[1].jaws[count].visible = false
          }

          if(upperteeth || bothteeth){
            jaws[0].jaws[count].visible = false

            jaws[1].jaws[count].visible = true
          }

        e.target.classList = 'play-icon bi bi-play-circle' 
    }

    else {
        playing = true
        conditionallogic()

        if(lowerteeth || bothteeth){
            jaws[0].jaws[count].visible = true
            jaws[1].jaws[count].visible = false

          }

          if(upperteeth || bothteeth){
            jaws[0].jaws[count].visible = false

            jaws[1].jaws[count].visible = true
          }

     
        e.target.classList = 'play-icon bi bi-pause-circle' 

    }

} )


document.querySelector('.clock-icon').addEventListener('click', () =>{
  

     if(value < 400){
         value = 1000
     }

     else {
        value -= 300
     }
})


document.querySelector('.forward-icon').addEventListener('click', () =>{
 count += 1  

})

document.querySelector('.upper-teeth').addEventListener('click',() =>{
     upperteeth = true
     bothteeth = false
     lowerteeth = false

     if(!playing){
        jaws[0].jaws[count].visible = false



        jaws[1].jaws[count].visible = true
        
     }
})

document.querySelector('.lower-teeth').addEventListener('click',() =>{
    upperteeth = false
    bothteeth = false
    lowerteeth = true

    if(!playing){
        jaws[0].jaws[count].visible = true



        jaws[1].jaws[count].visible = false
        
     }
})

document.querySelector('.both-teeth').addEventListener('click',() =>{
    upperteeth = true
    bothteeth = true
    lowerteeth = true

    if(!playing){
        jaws[0].jaws[count].visible = true



        jaws[1].jaws[count].visible = true
        
     }
})



let time = 0
			camera.position.z = 8;

			function animate() {
				requestAnimationFrame( animate );
          time += 0.05
        
    
        	controls.update();



        
				renderer.render( scene, camera );
			};

			animate();

        }