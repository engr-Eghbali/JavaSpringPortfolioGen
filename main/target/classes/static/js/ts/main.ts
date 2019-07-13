import User from './UserClass';
import Blog from './BlogClass';
import Bio  from './BioClass';
import Contact from './ContactClass';
import Picker from './vanilla-picker.min.js';




//////////////////////////////////////////
document.onreadystatechange = () => {

    var picker:any;
    if (document.readyState === 'complete') {
    
        picker= new Picker({
        
            parent: document.querySelector('#colorPicker'),
            popup: false // 'right'(default), 'left', 'top', 'bottom'
        });

        addResizeListener();
        addEditTextListener();
        document.getElementById("submitBTN").addEventListener("click",e=>{
            processAndSend();
        });
        dragElement(document.getElementsByClassName("editPage")[0]);
        alert("click on elements to edit them!");
       
    }

};


////////////////////////////////////////////////


//!.!.!.!.!.!.!.!.!.!.!.!.!.!//
function packingStyles(){

    var map=["header","topMenu","logo","menuOption","main","footer","Home","Avatar","BIO","Biography","CVLink","POSTS"];
    var temp={};
    var elem;
    map.forEach(cls=>{
    
        elem=<HTMLElement>document.getElementsByClassName(cls)[0];
        temp[cls]=elem.style.cssText;
        
    });
    temp["body"]=document.body.style.cssText;
    return temp;

}
///////////////////////////////

function processAndSend(){

    var Url:string=""+prompt("enter route name for your blog:");
    if (Url==="" || Url=="null" || Url=="/null"){
        processAndSend();
        return;
    }
    
    let user=new User();
    let blog=new Blog();
    let bio =new Bio();
    let contact=new Contact();

    contact.setEmail((<HTMLElement>document.getElementsByClassName("Email")[0]).innerText);
    contact.setLinkedin((<HTMLElement>document.getElementsByClassName("Linkedin")[0]).innerText);
    contact.setPhone((<HTMLElement>document.getElementsByClassName("Phone")[0]).innerText);

    bio.setBiography((<HTMLElement>document.getElementsByClassName("Biography")[0]).innerText);
    bio.setCVLink((<HTMLElement>document.getElementsByClassName("CVLink")[0]).innerText);

    blog.setTitle((<HTMLElement>document.getElementsByClassName("Title")[0]).innerText);
    blog.setBio(bio);
    blog.setContact(contact);
    blog.setStyle(packingStyles());

    user.setURL(URL);
    user.setName(document.getElementsByClassName("Name")[0].innerHTML);
    user.setBlog(blog);

    var data= JSON.stringify(user).replace(/\b_/g,""); 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.response);
        }    
    };

    xhttp.open("POST", "http://localhost:8080/submitBlog", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhttp.setRequestHeader("Content-type", "multipart/form-data");
    xhttp.send(data);
}


/////////////////////////////////////






