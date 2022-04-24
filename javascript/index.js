const app = new Vue({
  el: '#app',
  data () {
    return {
      newItem: '',
      todos: [],
      editingIndex: undefined,
      editingItem: ''
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
      }
      this.cancelAppend()
    },
    editItem (index) {
      this.editingIndex = index
      this.editingItem = this.todos[index]
    },
    updateItem (index) {
      if (this.editingItem) {
        this.todos[index] = this.editingItem
        this.saveItems()
      }
      this.cancelEdit()
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
      this.editingIndex = undefined
      this.editingItem = ''
    }
  }
})
