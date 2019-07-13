export default class Bio{
    private    _Content: string;
    private    _CVLink: string;
    private    _Biography: any;

    constructor(){
        this._Content="lurem ipsom";
        this._CVLink   ="http://site.com";
    }
    setBiography(val){
        this._Content=val;
    }
    getBiography(){
        return this._Content;
    }
    setCVLink(val){
        this._CVLink=val;
    }
    getCVLink(){
        return this._CVLink;
    }
}