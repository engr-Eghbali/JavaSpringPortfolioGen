export default class Bio{

    constructor(){
        this._Content="lurem ipsom";
        this._CVLink   ="http://site.com";
    }
    setBiography(val){
        this._Content=val;
    }
    getBiography(){
        return this._Biography;
    }
    setCVLink(val){
        this._CVLink=val;
    }
    getCVLink(){
        return this._CVLink;
    }
}