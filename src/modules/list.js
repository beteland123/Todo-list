class Lists {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('lists')) || [];
    this.currentId = this.lists.length > 0 ? this.lists[this.lists.length - 1].id + 1 : 1;
  }

  addlist(description) {
    const task = {
      id: this.currentId,
      description,
      completed: false,
    };
    this.lists.push(task);
    this.currentId += 1; // Increment the currentId for the next task

    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  removelist(id) {
    const index = this.lists.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.lists.splice(index, 1); // Remove the task at the given index

      // Update the id property of each remaining task
      for (let i = index; i < this.lists.length; i += 1) {
        this.lists[i].id -= 1;
      }

      this.currentId = this.lists.length > 0 ? this.lists[this.lists.length - 1].id + 1 : 1;

      localStorage.setItem('lists', JSON.stringify(this.lists));
    }
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
    this.lists = this.lists.filter((list) => !list.completed);

    // Reset the id property of each remaining task
    for (let i = 0; i < this.lists.length; i += 1) {
      this.lists[i].id = i + 1;
    }

    this.currentId = this.lists.length > 0 ? this.lists[this.lists.length - 1].id + 1 : 1;
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }
}

export default Lists;