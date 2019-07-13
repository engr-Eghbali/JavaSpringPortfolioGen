import Bio from './BioClass';
import Contact from './ContactClass';
export default class Blog{
    private    _Title: string;
    private    _Bio: Bio;
    private    _Contact: any;
    private    _Style: {};
    
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