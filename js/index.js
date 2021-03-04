import ProductsListController from './Controllers/ProductsListController.js';
import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import ButtonsController from './Controllers/ButtonsController.js';
import NewProductController from './Controllers/NewProductController.js'
//cuando todo el html y css esten cargados 
window.addEventListener('DOMContentLoaded', async (event) =>{
    
    //seleccionamos el loader
    const loader = document.querySelector('.loader-container');
    const loaderController = new LoaderController(loader);
    //para ocultar el loader cuando este todo cargado.
    //creamos la clase hidden para lds-heart
    

    //seleccionamos el elemento para el controlador
    
    const element = document.querySelector('.products-list');
    const controller = new ProductsListController(element);
    controller.loadProducts();
    
    const errorElement = document.querySelector('.global-errors');
    const ErrorController = new ErrorsController(errorElement) ;

    const loginButtonElement = document.querySelector('.profile-icon');
    const loginButton = new ButtonsController(loginButtonElement);
    loginButton.loginButton()

    const newProduct = document.querySelector('header');

    new NewProductController(newProduct);


/*
    const getProductsError = (error) => {
        console.error ('No se ha podido cargar los productos del servidor', error)
    }

    const loadProducts = (products) => {
        const list = document.querySelector('.products-list');

        for (const product of products ){
            //console.log(product);
            const productElement =  document.createElement('div');
            productElement.classList.add('product');
            const productHTML = productView(product);
            productElement.innerHTML = productHTML;
            list.appendChild(productElement);
        };
    }

    */






});