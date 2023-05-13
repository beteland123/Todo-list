import lists from './modules/list.js';
import './style.css';
import more from './more.png';
import recycle from './recycle.png';
import left from './to-left.png';
import del from './delete.jpeg';

const list = new lists();


const renderList = (description, id, completed) => {
  const listDiv = document.createElement('div');
  listDiv.classList.add('eachList');
  listDiv.innerHTML = `
    <div class="left">
      <input type="checkbox" id="check-${id}" ${completed ? 'checked' : ''}>
      <span class="des ${completed ? 'completed' : ''}" contenteditable="true" data-id="${id}">${description}</span>
    </div>
    <img class="more" src="${more}" alt="more" data-id="${id}">
    <img class="removebtn" src="${del}" alt="remove" style="display:none;" data-id="${id}">
  `;
  const newDiv = document.createElement('div');
  newDiv.classList.add('eachList');
  newDiv.dataset.id = id;
  newDiv.innerHTML = listDiv.innerHTML;

  const checkbox = newDiv.querySelector(`#check-${id}`);
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      newDiv.querySelector('.des').classList.add('completed');
      list.completelist(id);
    } else {
      newDiv.querySelector('.des').classList.remove('completed');
      list.uncompletelist(id);
    }
  });

  const descriptionSpan = newDiv.querySelector('.des');
  descriptionSpan.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newDescription = descriptionSpan.innerText.trim();
      list.editlist(id, newDescription);
      updateList();
    }
  });
  
  return newDiv;
};

const updateList = () => {
  const listObj = document.getElementById('listObjId');
  listObj.innerHTML = '';
  list.lists.forEach((list, index) => {
    let listd = renderList(list.description, index, list.completed);
    listObj.appendChild(listd);
  });

  // Attach event listeners to more and remove buttons
  attachEventListeners();
};


  const attachEventListeners = () => {
    const moreIcons = document.querySelectorAll('.more');
    moreIcons.forEach((moreIcon) => {
      moreIcon.addEventListener('click', (event) => {
        const parent = event.target.parentNode;
        const removeBtn = parent.querySelector('.removebtn');
        moreIcon.style.display = 'none';
        removeBtn.style.display = 'flex';
      });
    });
  
    const removeBtns = document.querySelectorAll('.removebtn');
    removeBtns.forEach((removeBtn) => {
      removeBtn.addEventListener('click', (event) => {
        const parent = event.target.parentNode;
        const taskId = parent.dataset.id; // Get the task ID from the parent element
        list.removelist(parseInt(taskId, 10)); // Convert the ID to an integer before passing to removelist
        updateList();
      });
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
  list.lists.forEach((list, index) => {
    let listd = renderList(list.description, index);
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

  // Attach event listeners to more and remove buttons
  attachEventListeners();
};

component();