import LoaderController from './Controllers/LoaderController.js';
import ErrorsController from './Controllers/ErrorsController.js';
import RegisterFormController from './Controllers/RegisterFormController.js';
import ButtonsController from './Controllers/ButtonsController.js';

window.addEventListener('DOMContentLoaded', () => {
	const loader = document.querySelector('.loader-container');
	const loaderController = new LoaderController(loader);

	const errorElement = document.querySelector('.global-errors');
	const ErrorController = new ErrorsController(errorElement);

	const formElement = document.querySelector('form');
	const formController = new RegisterFormController(formElement);

	const loginButtonElement = document.querySelector('.profile-icon');
	const loginButton = new ButtonsController(loginButtonElement);
	loginButton.loginButton();
});
