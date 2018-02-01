var STORAGE_KEY = "todolistapp-key";
var todosStorage = {
    fetch: function() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },
    save: function(todos) {

        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};



var app = new Vue({
    el: '.todolistapp',
    data: {
        /*
        todos: [{ id: 0, text: "buy a nodejs book", isCompleted: false, isEditing: false }, { id: 1, text: "buy a vuejs book", isCompleted: false, isEditing: false }, { id: 2, text: "buy a nodejs book11", isCompleted: true, isEditing: false }, { id: 3, text: "buy a vuejs book11", isCompleted: false, isEditing: false }],*/
        todos: todosStorage.fetch() || [],
        filter: 'all',
    },
    watch: {

        todos: {
            handler: function(todos) {
                todosStorage.save(todos);
            },
            deep: true
        },

    },



    computed: {


        allCompleted: {

            get: function() {

                //no active todo left means all done
                return this.activeTodos.length === 0;
            },

            set: function(newVal) {

                this.todos.forEach(function(item, index, arr) {
                    item.isCompleted = newVal;
                });

            }

        },

        completedTodos: function() {
            return this.todos.filter(function(item) {
                return item.isCompleted;
            });
        },
        activeTodos: function() {
            return this.todos.filter(function(item) {
                return !item.isCompleted;
            });
        },
        filteredTodos: function() {
            switch (this.filter) {
                case 'all':
                    return this.todos;
                    break;
                case 'completed':
                    return this.completedTodos;
                    break;
                case 'active':
                    return this.activeTodos;
            }

        }


    },

    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            },
            update: function(el) {
                el.focus();
            }
        }
    },
    methods: {


        addNewTodo: function(event) {

            var newV = event.target.value.trim();
            if (!newV) {
                return;
            }
            this.todos.push({
                id: this.todos.length,
                text: newV,
                isCompleted: false,
                isEditing: false
            });
            event.target.value = '';
        },


        handleClickFilter: function(filter) {
            switch (filter) {
                case 'completed':
                    this.filter = 'completed';
                    break;
                case 'active':
                    this.filter = 'active';
                    break;
                case 'all':
                    this.filter = 'all';

            }

        },
        handleClearCompleted: function() {

            for (var i = this.todos.length - 1; i >= 0; i--) {
                if (this.todos[i].isCompleted) {
                    this.todos.splice(i, 1);
                }
            }
        },

        handleRemove: function(todo) {

            this.todos.splice(this.todos.indexOf(todo), 1); 
        },

        handleEditing: function(todo) {
            todo.isEditing = true;
        },
        handleEdited: function(todo) {
            todo.isEditing = false;

        }
    }
});
