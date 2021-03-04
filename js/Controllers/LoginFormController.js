
import DataService from '../services/DataService.js';
import RegisterFormController from './RegisterFormController.js';

export default class LoginFormController extends RegisterFormController {

    async  postRequest(user) {
        this.publish(this.events.START_LOADING)
        try{
            const data = await DataService.login(user);
            DataService.saveToken(data.accessToken)
            let next = '/';
            const queryParams = window.location.search.replace('?', '');
            const queryParamsParts = queryParams.split('=');
            if (queryParamsParts.length >= 2 && queryParamsParts[0] === 'next') {
                next = queryParamsParts[1]
            }
            window.location.href = next
            console.log('login ok', data.accessToken) ;
        }catch(error){
            this.publish(this.events.ERROR, error);
        }finally{
            this.publish(this.events.FINISH_LOADING)
        }
    }

    
}
