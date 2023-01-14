import { ToDo } from "../todos/models/todo-model"

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new ToDo('Piedra del alma'),
        new ToDo('Piedra del infinito'),
        new ToDo('Piedra del tiempo'),
        new ToDo('Piedra del poder'),
        new ToDo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log(' InitStore Start ');
}

const loadStore = () => {
    // console.log(localStorage.getItem('state'));
    if (!localStorage.getItem('state')) return;

    const {todos, filter=Filters.All} = JSON.parse(localStorage.getItem('state'))
    state.todos=todos;
    state.filter=filter;
}

const saveStateToLocalStorage = () => {
    // console.log( JSON.stringify(state) );
    localStorage.setItem('state',  JSON.stringify(state) );
};

const getTodos = ( filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return state.todos;
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done )

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done )
        
        default:
            throw new Error(`Option ${filter} is not valid`);
            break;
    }
}


/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is requiered');
    state.todos.push( new ToDo(description) );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId ToDo identifier
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId) todo.done = !todo.done;
        saveStateToLocalStorage();
        return todo;
    } )
}

/**
 * 
 * @param {String} todoId ToDo identifier
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
  
    // for(const [key, value] of Object.entries(Filters)){
    //     console.log(`Key: ${key} --- Value: '${value}' `);
    //     // if(value === newFilter.toString()){
    //     //     console.log(`${value}, ${newFilter}`);
    //     //     state.filter = newFilter;
    //     //     return;
    //     // } else {
    //     // }
    //     // saveStateToLocalStorage();
    // }
    
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}
export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
