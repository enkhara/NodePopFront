import DataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class RegisterFormController extends BaseController {
	constructor(element) {
		super(element);
		this.attachEventListener();
	}

	async postRequest(user) {
		await DataService.registerUser(user);
		alert('Usuario creado con éxito');
		window.location.href = '/login.html';
	}

	attachEventListener() {
		this.element.addEventListener('submit', async (event) => {
			event.preventDefault();
			const user = {
				username: this.element.elements.email.value,
				password: this.element.elements.password.value,
			};
			this.publish(this.events.START_LOADING);
			try {
				await this.postRequest(user);
			} catch (error) {
				this.publish(this.events.ERROR, error);
			} finally {
				this.publish(this.events.FINISH_LOADING);
			}
		});

		this.element.querySelectorAll('input').forEach((input) => {
			const buttonForm = this.element.querySelector('button');
			input.addEventListener('keyup', (event) => {
				//console.log(input.validity)
				if (this.element.checkValidity()) {
					buttonForm.removeAttribute('disabled');
				} else {
					buttonForm.setAttribute('disabled', true);
				}
			});
		});
	}
}
