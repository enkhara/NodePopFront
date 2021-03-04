import BaseController from './BaseController.js'

export default class LoaderController extends BaseController {
    
    
    constructor(element) {
        super(element);
        this.subscribe(this.events.START_LOADING, () =>{
            this.showLoader();
        })
        this.subscribe(this.events.FINISH_LOADING, () =>{
            this.hiddenLoader();
        })
    }
    
    //metodo
    showLoader() {
        this.element.classList.remove('hidden');
    }

    //metodo
    hiddenLoader() {
        this.element.classList.add('hidden');
        
    }

}