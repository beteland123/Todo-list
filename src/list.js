// const list = [
//   {
//     description: 'wash cloth',
//     completed: 'true',
//     index: 3,
//   },
//   {
//     description: 'read book',
//     completed: 'true',
//     index: 2,
//   },
//   {
//     description: 'complete webpack project',
//     completed: 'true',
//     index: 1,
//   },
// ];
// for (let i = id - 1; i < list.length; i += 1) {
//    list[i].id = i + 1;
//  }
class lists {
   constructor() {
     this.lists = JSON.parse(localStorage.getItem('lists')) || [];
     this.completed = false;
    // this.id = lists.getNextId();
   }
 
   // static getNextId() {
   //   return lists.nextId++;
   // }
 
   addlist = (description) => {
     const list = {
       id: this.lists.length + 1,
       description,
       completed: false,
     };
     this.lists.push(list);
     localStorage.setItem('lists', JSON.stringify(this.lists));
   }
 
   removelist(id) {
     this.lists = this.lists.filter((list) => list.id !== parseInt(id, 10));
     let localStoragelists = JSON.parse(localStorage.getItem('lists'));
     localStoragelists = localStoragelists.filter((obj) => obj.id !== parseInt(id, 10));
   //   for (let i = id - 1; i < this.lists.length; i += 1) {
   //       this.lists[i].id = i + 1;
   //     }
     localStorage.setItem('lists', JSON.stringify(localStoragelists));
   }
 }
 
 //lists.nextId = 1;
 
 export default lists;
 