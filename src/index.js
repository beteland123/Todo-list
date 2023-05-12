import lists from './list.js';
import './style.css';
import more from './more.png';
import recycle from './recycle.png';
import left from './to-left.png';
import del from './delete.jpeg';

const list = new lists();

const renderList = (description) => {
  const listDiv = document.createElement('div');
  listDiv.classList.add('eachList');
  listDiv.innerHTML = `
    <div class="left">
      <input type="checkbox" id="check">
      <span class="des">${description}</span>
    </div>
    <img class="more" src="${more}" alt="more">
    <img class="removebtn" src="${del}" alt="remove" style="display:none;">
  `;
  const newDiv = document.createElement('div');
  newDiv.classList.add('eachList');
  newDiv.innerHTML = listDiv.innerHTML;
  return newDiv;
};

const updateList = () => {
  const listObj = document.getElementById('listObjId');
  listObj.innerHTML = '';
  list.lists.forEach((list) => {
    let listd = renderList(list.description);
    listObj.appendChild(listd);
  });
};

const component = () => {
  const container = document.querySelector('.container');
  const element = document.createElement('div');
  element.id = 'list_elemnt';
  element.innerHTML = `<p>Today's To Do</p> <img class="refresh" src="${recycle}" alt="refresh page">`;
  const input = document.createElement('div');
  input.id = 'input_div';
  input.innerHTML = `<input class="inputSpace" placeholder="Add to your list..."><img class="clear" src="${left}" alt="clear">`;
  const listObj = document.createElement('div');
  listObj.id = 'listObjId';
  list.lists.forEach((list) => {
    let listd = renderList(list.description);
    listObj.appendChild(listd);
  });
  const completed = document.createElement('div');
  completed.id = 'comp';
  completed.innerHTML = '<span> clear all completed<span>';
  container.appendChild(element);
  container.appendChild(input);
  container.appendChild(listObj);
  container.appendChild(completed);

  const inputVar = document.querySelector('.inputSpace');
  inputVar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Get the values from the input fields
      const description = inputVar.value;

      // Add task
      list.addlist(description);

      // Clear the input fields
      inputVar.value = '';

      // Update the list
      updateList();
    }
  });
  
  const moreIcons = document.querySelectorAll('.more');
  moreIcons.forEach((moreIcon) => {
    moreIcons.addEventListener('click', (event) => {
       console.log(moreIcons)
     /// const parent = event.target.parentNode;
      const removeBtn = parent.querySelector('.removebtn');
      moreIcon.style.display = 'none';
      removeBtn.style.display = 'flex';
      removeBtn.addEventListener('click', (event) => {
        const { id } = event.target;
        list.removelist(id);
        // Update the list
        updateList();
      });
    });
  });
};

component();
