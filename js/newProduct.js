
import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import NewProductFormController from './Controllers/NewProductFormController.js';

window.addEventListener('DOMContentLoaded', () => {


    const loader = document.querySelector('.loader-container');
    const loaderController = new LoaderController(loader);

    const errorElement = document.querySelector('.global-errors');
    const ErrorController = new ErrorsController(errorElement) ;
    
    const formElement = document.querySelector('form');
    const formController = new NewProductFormController(formElement);

})