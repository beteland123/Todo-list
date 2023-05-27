import Lists from './modules/list.js';

describe('Lists', () => {
  let lists;
  beforeEach(() => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    localStorage.clear();
    lists = new Lists();
  });

  afterEach(() => {
    Object.getPrototypeOf(window.localStorage).setItem.mockRestore();
    Object.getPrototypeOf(window.localStorage).getItem.mockRestore();
  });

  describe('addlist', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <div id="input_div">
        <input  class="inputSpace">
      </div>
        `;
    });
    it('should add a new list to the lists array', () => {
      lists.addlist('New List');
      expect(lists.lists.length).toBe(1);
      expect(lists.lists[0].description).toBe('New List');
    });

    it('should store the updated lists array in localStorage', () => {
      lists.addlist('New List');
      const storedLists = JSON.parse(localStorage.getItem('lists'));
      expect(storedLists.length).toBe(1);
      expect(storedLists[0].description).toBe('New List');
    });
  });

  describe('removelist', () => {
    beforeEach(() => {
      lists.addlist('List 1');
      lists.addlist('List 2');
      lists.addlist('List 3');
      document.body.innerHTML = `
      <div class="eachList">
        <img  class="removebtn">
      </div>
        `;
    });

    it('should remove the list with the given id from the lists array', () => {
      lists.removelist(2);
      expect(lists.lists.length).toBe(2);
      expect(lists.lists[0].description).toBe('List 1');
      expect(lists.lists[1].description).toBe('List 3');
    });

    it('should update the id property of each remaining list', () => {
      lists.removelist(2);
      expect(lists.lists[0].id).toBe(1);
      expect(lists.lists[1].id).toBe(2);
    });

    it('should store the updated lists array in localStorage', () => {
      lists.removelist(2);
      const storedLists = JSON.parse(localStorage.getItem('lists'));
      expect(storedLists.length).toBe(2);
      expect(storedLists[0].description).toBe('List 1');
      expect(storedLists[1].description).toBe('List 3');
    });
  });

  describe('editlist', () => {
    beforeEach(() => {
      lists.addlist('List 1');
      lists.addlist('List 2');
      lists.addlist('List 3');
      document.body.innerHTML = `
      <div class="eachList">
      </div>
        `;
    });

    it('should update the description of the list with the given id', () => {
      lists.editlist(2, 'New Description');
      expect(lists.lists[1].description).toBe('New Description');
    });

    it('should store the updated lists array in localStorage', () => {
      lists.editlist(2, 'New Description');
      const storedLists = JSON.parse(localStorage.getItem('lists'));
      expect(storedLists[1].description).toBe('New Description');
    });
  });

  describe('completelist', () => {
    beforeEach(() => {
      lists.addlist('List 1');
      lists.addlist('List 2');
      lists.addlist('List 3');
    });

    it('should set the completed property of the list with the given id to true', () => {
      lists.completelist(2);
      expect(lists.lists[1].completed).toBe(true);
    });

    it('should store the updated lists array in localStorage', () => {
      lists.completelist(2);
      const storedLists = JSON.parse(localStorage.getItem('lists'));
      expect(storedLists[1].completed).toBe(true);
    });
  });

  describe('uncompletelist', () => {
    beforeEach(() => {
      lists.addlist('List 1');
      lists.addlist('List 2');
      lists.addlist('List 3');
    });

    it('should set the completed property of the list with the given id to false', () => {
      lists.uncompletelist(2);
      expect(lists.lists[1].completed).toBe(false);
    });

    it('should store the updated lists array in localStorage', () => {
      lists.uncompletelist(2);
      const storedLists = JSON.parse(localStorage.getItem('lists'));
      expect(storedLists[1].completed).toBe(false);
    });
  });

  describe('clearCompleted', () => {
    beforeEach(() => {
      lists.addlist('List 1');
      lists.addlist('List 2');
      lists.addlist('List 3');
      lists.lists[0].completed = true;
      lists.lists[2].completed = true;
      document.body.innerHTML = `
      <div id="comp">
        <span></span>
      </div>
        `;
    });

    it('should remove all completed lists from the lists array', () => {
      lists.clearCompleted();
      expect(lists.lists.length).toBe(1);
      expect(lists.lists[0].description).toBe('List 2');
    });

    it('should update the id property of each remaining list', () => {
      lists.clearCompleted();
      expect(lists.lists[0].id).toBe(1);
    });

    it('should store the updated lists array in localStorage', () => {
      lists.clearCompleted();
      const storedLists = JSON.parse(localStorage.getItem('lists'));
      expect(storedLists.length).toBe(1);
      expect(storedLists[0].description).toBe('List 2');
    });
  });
});
