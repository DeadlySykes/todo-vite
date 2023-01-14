//importar un html en crudo usando `file.html?raw`
import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const ElementIDs = {
    TodoList: '.todo-list',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const dislpayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        console.log(todos);
        renderTodos( ElementIDs.TodoList,todos);
    }   
    //Cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        dislpayTodos();
    })();

}


