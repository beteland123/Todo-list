
class lists {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('lists')) || [];
   // this.lists = [];
    this.currentId = 0; // Initialize the currentId property
  }

  addlist(description) {
    const task = {
      id: this.currentId,
      description,
      completed: false,
    };
    this.lists.push(task);
    this.currentId++; // Increment the currentId for the next task
    
     localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  removelist(id) {
    this.lists = this.lists.filter((task) => task.id !== id);
  
    // Reset the id property of each remaining task
    this.lists.forEach((task, index) => {
      task.id = index;
    });
  
    this.currentId = this.lists.length; // Update currentId to the new length
  
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  editlist(id, newDescription) {
    const taskIndex = this.lists.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.lists[taskIndex].description = newDescription;
      localStorage.setItem('lists', JSON.stringify(this.lists));
    }
  }
  completelist(id) {
    const taskIndex = this.lists.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.lists[taskIndex].completed = true;
      localStorage.setItem('lists', JSON.stringify(this.lists));
    }
  }

  uncompletelist(id) {
    const taskIndex = this.lists.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.lists[taskIndex].completed = false;
      localStorage.setItem('lists', JSON.stringify(this.lists));
    }
  }
  clearCompleted() {
    this.lists = this.lists.filter(list => !list.completed);
  
    // Reset the id property of each remaining task
    this.lists.forEach((task, index) => {
      task.id = index;
    });
  
    this.currentId = this.lists.length; // Update currentId to the new length
  
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }
}

export default lists;
 