import User from './UserClass.js';
import Blog from './BlogClass.js';
import Bio  from './BioClass.js';
import Contact from './ContactClass.js';




//////////////////////////////////////////
document.onreadystatechange = () => {

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
    map.forEach(cls=>{
    
        temp[cls]=document.getElementsByClassName(cls)[0].style.cssText;
        console.log(temp);
    });
    temp["body"]=document.body.style.cssText;
    return temp;

}
///////////////////////////////

function processAndSend(){

    URL=""+prompt("enter route name for your blog:");
    if (URL==="" || URL=="null" || URL=="/null"){
        processAndSend();
        return;
    }
    
    let user=new User();
    let blog=new Blog();
    let bio =new Bio();
    let contact=new Contact();

    contact.setEmail(document.getElementsByClassName("Email")[0].innerText);
    contact.setLinkedin(document.getElementsByClassName("Linkedin")[0].innerText);
    contact.setPhone(document.getElementsByClassName("Phone")[0].innerText);

    bio.setBiography(document.getElementsByClassName("Biography")[0].innerText);
    bio.setCVLink(document.getElementsByClassName("CVLink")[0].innerText);

    blog.setTitle(document.getElementsByClassName("Title")[0].innerText);
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






