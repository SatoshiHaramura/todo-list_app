const app = new Vue({
  el: '#app',
  data () {
    return {
      newItem: '',
      todos: [],
      editingId: null,
      tmpItem: ''
    }
  },
  mounted () {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'))
      } catch (e) {
        localStorage.removeItem('todos')
      }
    }
  },
  methods: {
    appendItem () {
      if (this.newItem) {
        this.todos.push(this.newItem)
        this.saveItems()
        this.newItem = ''
      } else {
        this.cancelAppend()
        return
      }
    },
    editingItem (index) {
      this.editingId = index
      this.tmpItem = this.todos[index]
    },
    updateItem (index) {
      if (this.tmpItem) {
        this.todos[index] = this.tmpItem
        this.saveItems()
        this.cancelEdit()
      } else {
        this.cancelEdit()
        return
      }
    },
    deleteItem (index) {
      this.todos.splice(index, 1)
      this.saveItems()
      this.cancelEdit()
    },
    saveItems () {
      const parsed = JSON.stringify(this.todos)
      localStorage.setItem('todos', parsed)
    },
    cancelAppend () {
      this.newItem = ''
    },
    cancelEdit () {
      this.editingId = null
      this.tmpItem = ''
    }
  }
})
