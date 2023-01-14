import { ToDo } from "../todos/models/todo-model"

const Filters = {
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
    console.log(state);
    console.log(' InitStore Start ');
}

const loadStore = () => {
    throw new Error ('Not Implemmented');
}

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
    state.todo.push( new ToDo(description) );
}

/**
 * 
 * @param {String} todoId ToDo identifier
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId) todo.done = !todo.done;
        return todo;
    } )
}

/**
 * 
 * @param {String} todoId ToDo identifier
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done)
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    // Object.keys(Filters).forEach((filtro, id, Filters)=>{
    //     console.log(`Dato: ${Filters[id]}`);
    //     console.log(`filtro: ${filtro}, id: ${id}`);
    // });
    
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}
export default {
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
