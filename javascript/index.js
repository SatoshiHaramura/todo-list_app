const app = new Vue({
  el: '#app',
  data () {
    return {
      newItem: '',
      todos: [],
      editingId: null,
      beforeEditCache: ''
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
      const invalidItem = this.newItem && this.newItem.trim()
      if (!invalidItem) {
        this.cancelAppend()
        return
      }
      this.todos.push(this.newItem)
      this.saveItems()
      this.newItem = ''
    },
    editingItem (index) {
      this.editingId = index
      this.beforeEditCache = this.todos[index]
    },
    editedItem (index) {
      const invalidItem = this.beforeEditCache && this.beforeEditCache.trim()
      if (!invalidItem) {
        this.initializeEditFlag()
        return
      }
      this.todos[index] = this.beforeEditCache
      this.saveItems()
      this.initializeEditFlag()
    },
    deleteItem (index) {
      this.todos.splice(index, 1)
      this.saveItems()
    },
    saveItems () {
      const parsed = JSON.stringify(this.todos)
      localStorage.setItem('todos', parsed)
    },
    cancelAppend () {
      this.newItem = ''
    },
    initializeEditFlag () {
      this.editingId = null
      this.beforeEditCache = ''
    }
  }
})
