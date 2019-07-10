import Bio from './BioClass.js';
import Contact from './ContactClass.js';
export default class Blog{
    
    constructor(){
        this._Title   = "Blog Title";
        this._Bio     = new Bio();
        this._Contact = new Contact();
        this._Style   = {};
    }

    setTitle(val){
        this._Title=val;
    }
    getTitle(){
        return this._Title;
    }
    setBio(val){
        this._Bio=val;
    }
    getBio(){
        return this._Bio;
    }
    setContact(val){
        this._Contact=val;
    }
    getContact(){
        return this._Contact;
    }
    setStyle(val){
        this._Style=val;
    }
    getStyle(){
        return this._Style;
    }

    
}