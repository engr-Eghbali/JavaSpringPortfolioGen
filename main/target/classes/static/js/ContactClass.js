export default class Contact{

    constructor(){
        this._Phone="0123";
        this._Email="info@site.com";
        this._Linkedin="http://linkedin.com";
    }

    setPhone(val){
        this._Phone=val;
    }
    getPhone(){
        return this._Phone;
    }

    setEmail(val){
        this._Email=val;
    }
    getEmail(){
        return this._Email;
    }

    setLinkedin(val){
        this._Linkedin=val;
    }
    getLinkedin(){
        return this._Linkedin;
    }
}