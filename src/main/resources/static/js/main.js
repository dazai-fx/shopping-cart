import Table from './components/Table.js';
import AddProducts from './components/AddProducts.js';

document.addEventListener("DOMContentLoaded", () => {

    const table = new Table('products-table');
    table.init();

    const addProducts = new AddProducts(table);
    addProducts.init();


});