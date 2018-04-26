const tool = document.getElementsByClassName('drum-kit__drum');

for(let i of tool) {
  i.onclick = zzz; 
}

function zzz() {
const sound = this.getElementsByTagName('audio')[0];
sound.play()
}
