import _ from 'lodash'
import list from './list.js'
import './style.css';
function component() {
  const container=document.querySelector('.container');
  

  for (let i = 0; i < list.length; i++) {
    container.innerHTML += `<li class="listElement">${list[i].description}</li>`;
    container.innerHTML += `<li class="listElement">${list[i].completed}</li>`;
    container.innerHTML += `<li class="listElement">${list[i].index}</li>`;
  }
  
  }
  
  component();
