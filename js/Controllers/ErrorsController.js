
import BaseController from './BaseController.js';
import { errorView } from '../views.js';


export default class ErrorsController extends BaseController {

    
    constructor(element) {
        
        console.log(element)
        super(element);
        this.subscribe(this.events.ERROR, (error)=>{
            
            this.showError(error);
            
        })
        
        this.publish(this.events.FINISH_LOADING, {});
    }
    
    showError(errorMessage){
        
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', (event) =>{
            if(event.target == this.element || event.target.classList.contains('error-button')){
                console.log('error ffatal',this.element)
                this.element.classList.add('hidden');
            }
    
        })
    }

}