import Blog from './BlogClass';
export default class User{
    _Name: string;
    _URL: string;
    _Blog: Blog;

    constructor(){
        this._Name = "user name";
        this._URL  = "www.site.com";
        this._Blog = new Blog();
    }
    /**
     * @param {string} val
     */
    setName(val){
        this._Name=val;
    }
    getName(){
        return this._Name;
    }

    setURL(val){
        this._URL=val;
    }
    getURL(){
       return this._URL;
    }

    /**
     * @param {{}} val
     */
    setBlog(val){
        this._Blog=val;
    }
    getBlog(){
       return this._Blog;
    }

}