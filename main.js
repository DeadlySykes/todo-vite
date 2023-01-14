import './style.css'
import { App } from './src/todos/app'

import todoStore from "./src/store/todo.store";

todoStore.initStore();


App('#app');


// let juegos = ['Zelda', 'Mario', 'Metroid', 'Chrome'];
// juegos.forEach((elemento, indice, arr)=>{
//   console.log(elemento, indice, arr);
// });
/**
 * Zelda 0 (4) ['Zelda', 'Mario', 'Metroid', 'Chrome']
main.js?t=1673590459765:13 Mario 1 (4) ['Zelda', 'Mario', 'Metroid', 'Chrome']
main.js?t=1673590459765:13 Metroid 2 (4) ['Zelda', 'Mario', 'Metroid', 'Chrome']
main.js?t=1673590459765:13 Chrome 3 (4) ['Zelda', 'Mario', 'Metroid', 'Chrome']
 * 
 */