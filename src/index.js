import _ from 'lodash'
import list from './list.js'
import './style.css';
import more from './more.png';
import recycle from './recycle.png';
import left from './to-left.png';
function component() {

 // const myIcon = new Image();
  //myIcon.src = Icon;
  list.sort((a, b) => a.index - b.index);

  const container=document.querySelector('.container');
  const element=document.createElement('div');
       element.id='list_elemnt';
       element.innerHTML=`<p>Today's To Do</p> <img class="refresh" src="${recycle}" alt="refresh page">`;
    const input=document.createElement('div');
      input.id='input_div';
      input.innerHTML=`<input placeholder="Add to your list..."><img class="clear" src="${left}"alt="clear">` ;
      const listObj=document.createElement('div');
          listObj.id="listObjId";
          list.forEach((lists) => {
            const listDiv=document.createElement('div');
            listDiv.id="eachList"
              listDiv.innerHTML=`<div class="left"><input type=checkbox id="check"><span class="des">${lists.description}</span></div><img class="more" src="${more}" alt="more">`;
              listObj.appendChild(listDiv)
          });
          const completed= document.createElement('div')
            completed.id="comp"
            completed.innerHTML=`<span> clear all completed<span>`
          container.appendChild(element)
          container.appendChild(input)
          container.appendChild(listObj)
          container.appendChild(completed)
         

  // for (let i = 0; i < list.length; i++) {
  //   container.innerHTML += `<li class="listElement">${list[i].description}</li>`;
  //   container.innerHTML += `<li class="listElement">${list[i].completed}</li>`;
  //   container.innerHTML += `<li class="listElement">${list[i].index}</li>`;
  // }

  
  
  }
  
  component();
