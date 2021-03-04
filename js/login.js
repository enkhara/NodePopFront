

import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import LoginFormController from './Controllers/LoginFormController.js';
import ButtonsController from './Controllers/ButtonsController.js';

window.addEventListener('DOMContentLoaded', () => {


    const loader = document.querySelector('.loader-container');
    const loaderController = new LoaderController(loader);

    const errorElement = document.querySelector('.global-errors');
    const ErrorController = new ErrorsController(errorElement) ;

    const formElement = document.querySelector('form');
    const formController = new LoginFormController(formElement);

    const buttonLogin = document.querySelector('button');
    const buttonController = new ButtonsController(buttonLogin)
})