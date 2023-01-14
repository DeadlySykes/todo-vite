//importar un html en crudo usando `file.html?raw`
import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos, renderPending } from "./use-cases";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        // console.log(todos);
        renderTodos( ElementIDs.TodoList,todos);
        updatePendingCount();
        
    }   
    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    };

    //Cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompleted = document.querySelector(ElementIDs.clearCompleted);
    const filtersLI = document.querySelectorAll(ElementIDs.TodoFilters);
    const pendingCount = document.querySelector(ElementIDs.TodoCount);

    // Listener
    newDescriptionInput.addEventListener('keyup', ( event )=>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value='';
        
    });

    todoListUL.addEventListener('click', ( event )=> {
        // console.log(event.target);
        //Elemento HTML con el data attribute mas cercano a "[data-id]"
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event )=> {
        const isDestroyedElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyedElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        
        displayTodos();
    });

    clearCompleted.addEventListener( 'click',() => {
        todoStore.deleteCompleted();
        
        displayTodos();
    });

    filtersLI.forEach(element => {
        element.addEventListener('click', (element)=>{
            filtersLI.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }
            
            displayTodos();
        });
        
    });
    
}


