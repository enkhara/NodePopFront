import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import RegisterFormController from './Controllers/RegisterFormController.js';

window.addEventListener('DOMContentLoaded', () => {
	const loader = document.querySelector('.loader-container');
	const loaderController = new LoaderController(loader);

	const errorElement = document.querySelector('.global-errors');
	const ErrorController = new ErrorsController(errorElement);

	const formElement = document.querySelector('form');
	const formController = new RegisterFormController(formElement);
});
