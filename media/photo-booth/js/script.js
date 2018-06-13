
'use strict';
const app = document.getElementsByClassName('app')[0];
const errorMessage = document.getElementById('error-message');
const video = document.createElement('video');
const listPhoto = document.getElementsByClassName('list')[0];
const audio = document.createElement('audio');
const controls = document.getElementsByClassName('controls')[0];
const takePhoto = document.getElementById('take-photo');
const canvas = document.createElement('canvas');

const actionBtn = document.getElementsByClassName('material-icons');
document.addEventListener('DOMContentLoaded', checkAccess)



function checkAccess(){  
  if (!navigator.mediaDevices) {
    conclusionErr();  
    return errorMessage.textContent = 'API не поддерживается';
  }
  
  navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(getVideo)
  .catch(errMessage);  
}

function getVideo(stream) {  
    app.insertBefore(video, errorMessage);        
    video.setAttribute('autoplay', 'autoplay');    
    video.srcObject = stream;
    controls.style.display = 'flex';    
}

function errMessage() {
  conclusionErr();
  return  errorMessage.textContent = 'В доступе к камере было отказано';
}
 
function 	conclusionErr() {
  errorMessage.style.display = 'block';
  listPhoto.style.display = 'none'; 	
}

takePhoto.addEventListener('click', () => {
  audio.src = './audio/click.mp3';
  audio.play(); 
  const ctx = canvas.getContext('2d'); 
  canvas.width = video.videoWidth;  
  canvas.height = video.videoHeight;  
  app.insertBefore(canvas, controls);  
  ctx.drawImage(video, 0, 0);  
  let src = canvas.toDataURL();  
  listPhoto.insertBefore(createMurkupPhotoList(creatPhotoList(src)), listPhoto.firstElementChild); 
});

function creatPhotoList(src) {
  return {
    tag: 'figure',
    content: [
      {
        tag: 'img',
        attr: {
          src: `${src}`
        } 
      },
      {
        tag: 'figcaption',
        content: [
          {
            tag: 'a',
            attr: {
              href: `${src}`,
              download: 'snapshot.png'
            },
            content: {
              tag: 'i',
              cls: 'material-icons',
              content: 'file_download'
            }           
          },
          {
            tag: 'a',
            content: {
              tag: 'i',
              cls: 'material-icons',
              content: 'file_upload'
            }
          },
          {
            tag: 'a',
            content: {
              tag: 'i',
              cls: 'material-icons',
              content: 'delete'
            }
          }
        ]
      }
    ]
  }
}

function createMurkupPhotoList(node) {
  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
 }

 if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
     return document.createTextNode(node);
 }

 if (Array.isArray(node)) {
     return node.reduce((f, elem) => {
         f.appendChild(createMurkupPhotoList(elem));
         return f;
     }, document.createDocumentFragment());
 }

 var element = document.createElement(node.tag || 'div');
 [].concat(node.cls || [])
     .forEach(className => element.classList.add(className));
 if (node.attr) {
     Object.keys(node.attr)
         .forEach(key => element.setAttribute(key, node.attr[key]))
 }

 element.appendChild(createMurkupPhotoList(node.content)); 
 return element;
}




listPhoto.addEventListener('click', actionWithPhoto )

function actionWithPhoto(e) {
  const element = e.target.parentElement.parentElement.parentElement
  console.log('​actionWithPhoto -> e.target.textContent', e.target.textContent);
  if(e.target.textContent == 'file_download' || e.target.textContent === 'delete' ) {
    listPhoto.removeChild(element); 
  }
  if(e.target.innerText === 'file_upload'){
    const img =  element.firstElementChild
    let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
	  canvas.toBlob((blob) => {
			let formData = new FormData();
			formData.append('image', blob);
			fetch('https://neto-api.herokuapp.com/photo-booth', {
				method: 'POST',
				body: formData,
			})
				.then(() => listPhoto.removeChild(element))
				.catch(err => console.log(err));
		});
    
  }

  

 
  
}


