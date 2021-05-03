import DataService from '../services/DataService.js';
import RegisterFormController from './RegisterFormController.js';

export default class LoginFormController extends RegisterFormController {
	constructor(element) {
		super(element);
		this.attachEventListener();
		this.focusInInput();
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
				const data = await DataService.login(user);

				DataService.saveToken(data.accessToken);

				let next = '/';
				const queryParams = window.location.search.replace('?', '');
				const queryParamsParts = queryParams.split('=');

				if (queryParamsParts.length >= 2 && queryParamsParts[0] === 'next') {
					next = queryParamsParts[1];
				}
				window.location.href = next;
			} catch (error) {
				this.publish(this.events.ERROR, error);
			} finally {
				this.publish(this.events.FINISH_LOADING);
			}
		});

		// this.element.querySelectorAll('input').forEach((input) => {
		// 	const button = this.element.querySelector('button');
		// 	input.addEventListener('keyup', (event) => {
		// 		console.log('apretando botton');
		// 		// if (this.element.checkValidity()) {
		// 		// 	button.removeAttribute('disable');
		// 		// } else {
		// 		// 	button.setAttribute('disabled', true);
		// 		// }
		// 	});
		// });
	}

	focusInInput() {
		const input = this.element.querySelector('.user-input');
		input.focus();
	}

	// async  postRequest(user) {

	//     this.publish(this.events.START_LOADING)
	//     try{
	//         const data = await DataService.login(user);
	//         DataService.saveToken(data.accessToken)
	//         let next = '/';
	//         const queryParams = window.location.search.replace('?', '');
	//         const queryParamsParts = queryParams.split('=');
	//         if (queryParamsParts.length >= 2 && queryParamsParts[0] === 'next') {
	//             next = queryParamsParts[1]
	//         }
	//         window.location.href = next
	//         console.log('login ok', data.accessToken) ;
	//     }catch(error){
	//         this.publish(this.events.ERROR, error);
	//     }finally{
	//         this.publish(this.events.FINISH_LOADING)
	//     }
	// }

	// this.element.querySelectorAll('input').forEach((input) =>{

	// })
}
