
// class lists {
//    constructor() {
//      this.lists = JSON.parse(localStorage.getItem('lists')) || [];
//      this.completed = false;
//     // this.id = lists.getNextId();
//    }
 
//    // static getNextId() {
//    //   return lists.nextId++;
//    // }
 
//    addlist = (description) => {
//      const list = {
//        id: this.lists.length + 1,
//        description,
//        completed: false,
//      };
//      this.lists.push(list);
//      localStorage.setItem('lists', JSON.stringify(this.lists));
//    }
 
//    removelist(id) {
//     //console.log(id)
//      this.lists = this.lists.filter((list) => list.id !== parseInt(id, 10));
//      let localStoragelists = JSON.parse(localStorage.getItem('lists'));
//      localStoragelists = localStoragelists.filter((obj) => obj.id !== parseInt(id, 10));
//     //  for (let i = id - 1; i < this.lists.length; i += 1) {
//     //   console.log(id)
//     //      this.lists[i].id = i + 1;
//     //    }
//      localStorage.setItem('lists', JSON.stringify(localStoragelists));
//    }
//  }
 
//  //lists.nextId = 1;
 
//  export default lists;
class lists {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('lists')) || [];
   // this.lists = [];
    this.currentId = 0; // Initialize the currentId property
  }

  addlist(description) {
    const task = {
      id: this.currentId, // Assign a unique ID
      description,
    };
    this.lists.push(task);
    this.currentId++; // Increment the currentId for the next task
    
     localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  removelist(id) {
    this.lists = this.lists.filter((task) => task.id !== id);
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }
  
  editlist(id, newDescription) {
    const taskIndex = this.lists.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.lists[taskIndex].description = newDescription;
      localStorage.setItem('lists', JSON.stringify(this.lists));
    }
  }
}

export default lists;
 