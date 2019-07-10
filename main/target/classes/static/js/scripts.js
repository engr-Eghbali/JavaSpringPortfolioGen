import User from './userClass.js';
import Blog from './BlogClass.js';
import Bio  from './BioClass.js';
import Contact from './ContactClass.js';

var map=["header","topMenu","logo","menuOption","main","footer","Home","Avatar","BIO","Biography","CVLink","POSTS"];
var picker;
var lastScrollTop=0;

//////////////////////////////////////////
document.onreadystatechange = () => {

    if (document.readyState === 'complete') {
    
        picker= new Picker({
        
            parent: document.querySelector('#colorPicker'),
            popup: false // 'right'(default), 'left', 'top', 'bottom'
        });

        addResizeListener();
        dragElement(document.getElementsByClassName("editPage")[0]);

        processAndSend();
    }

};
///////////////////////////////////////////
function addResizeListener(){

    map.forEach(cls=>{
        document.getElementsByClassName(cls)[0].setAttribute('onclick','resizer(\''+cls+'\');event.cancelBubble=true;');
    });               
}
/////////////////////////////////////////

function getColor(){
    console.log(document.getElementsByClassName("picker_editor")[0].firstElementChild.value);
}
///////////////////////////////////////


function resizer(elemClass){

    [...document.getElementsByClassName('resizer')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('move')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('edit')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('exitResizer')].forEach(el=>{el.remove()});

disableScrolling()

var element = document.getElementsByClassName(elemClass)[0];

var move = document.createElement('div');
var edit=document.createElement('div');
var resizerRight = document.createElement('div');
var resizerBottom = document.createElement('div');
var exit = document.createElement('div');

resizerBottom.className=resizerRight.className = 'resizer';
move.className="move";
edit.className="edit";
exit.className="exitResizer";

move.style.top=(element.offsetTop+element.offsetHeight/2)-window.scrollY+'px';
move.style.left=element.offsetLeft+element.offsetWidth/2+'px';

resizerRight.style.top=(element.offsetTop+element.offsetHeight/2)-window.scrollY+'px';
resizerRight.style.left=element.offsetLeft+element.offsetWidth-10+'px';


resizerBottom.style.top=(element.offsetTop+element.offsetHeight)-window.scrollY-10+'px';
resizerBottom.style.left=element.offsetLeft+element.offsetWidth/2+'px';
resizerBottom.style.cursor="ns-resize";

edit.style.top=(element.offsetTop)-window.scrollY+'px';
edit.setAttribute('onclick','editEl(\''+element.className+'\')');

exit.style.top=(element.offsetTop)-window.scrollY+'px';
exit.style.left=element.offsetLeft+'px';

element.prepend(move);
element.prepend(resizerRight);
element.prepend(resizerBottom);
element.prepend(edit);
element.prepend(exit);



resizerRight.addEventListener('mousedown',initRightResize,false);
resizerBottom.addEventListener('mousedown',initBottomResize,false);
move.addEventListener('mousedown', initMoveEl, false);
exit.addEventListener('mousedown',exitResize,false);


function initRightResize(e){
    
    window.addEventListener('mousemove', ResizeRight, false);
    window.addEventListener('mouseup', stopResize, false);   
}

function ResizeRight(e){

    element.style.width=(e.clientX-element.offsetLeft)+'px';
    resizerRight.style.left=(e.clientX-element.offsetLeft-20)+'px';
    resizerBottom.style.left=(e.clientX-element.offsetLeft-20)/4+'px'
    move.style.left=(e.clientX-element.offsetLeft)/4+'px';
}

function initBottomResize(e){

    window.addEventListener('mousemove', ResizeBottom, false);
    window.addEventListener('mouseup', stopResize, false);   
}

function ResizeBottom(e){
    console.log(e.clientY);
    console.log(element.offsetTop);
    element.style.height=(e.clientY-element.offsetTop)+'px';
    resizerRight.style.top=(e.clientY-element.offsetTop-20)/4+'px';
    resizerBottom.style.top=(e.clientY-element.offsetTop-20)+'px';
    move.style.top=(e.clientY-element.offsetTop)/4+'px';
}


function initMoveEl(e) {
   
   window.addEventListener('mousemove', moveEl, false);
   window.addEventListener('mouseup', stopResize, false);
}
function moveEl(e) {

   marginLeft=e.clientX-element.offsetWidth/4;
   marginTop=e.clientY-element.offsetHeight/2;
   
   element.style.marginLeft=marginLeft+'px';
   element.style.marginTop=marginTop+'px';
   

}
function stopResize(e) {
    
    window.removeEventListener('mousemove', moveEl, false);
    window.removeEventListener('mousemove', ResizeRight, false);
    window.removeEventListener('mousemove', ResizeBottom, false);
    window.removeEventListener('mouseup', stopResize, false);
}



function exitResize(e){

    [...document.getElementsByClassName('resizer')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('move')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('edit')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('exitResizer')].forEach(el=>{el.remove()});
    enableScrolling();


}
//copyNodeStyle(element,document.getElementsByClassName("Home")[0]);
}
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function updatePos(){

    if(document.getElementsByClassName("move").length==0){
        console.log("hi");
        return;
    }
    moveTop=document.getElementsByClassName("move")[0].style.top;
    resizeRightTop=document.getElementsByClassName("resizer")[0].style.top;
    ResizeBottomTop=document.getElementsByClassName("resizer")[1].style.top;

    var st = window.pageYOffset || window.scrollTop; 
    if (st > lastScrollTop){
       // downscroll code
       moveTop=(parseInt(moveTop)+parseInt(document.body.scrollTop))+'px';
       resizeRightTop+=window.scrollTop+'px';
       ResizeBottomTop+=window.scrollTop+'px';
    } else {
       // upscroll code
       moveTop=(parseInt(moveTop)-parseInt(document.body.scrollTop))+'px';
       resizeRightTop-=window.scrollTop+'px';
       ResizeBottomTop-=window.scrollTop+'px';

    }
    lastScrollTop = st <= 0 ? 0 : st;

    
}
//////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////


  function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}



/////////////////////////////////////////dragElement(document.getElementsByClassName("editPage")[0]);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id )) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id ).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

///////////////////////////

function editEl(elClass){
 
    document.getElementById("editPage").style.display='block';
    el=document.getElementsByClassName(elClass)[0];
    
    picker.onChange=function(color){
    el.style.backgroundColor=color.rgbaString;    
    }
    document.getElementById("chooseImg").addEventListener('change',function(e){
        var file = document.getElementById("chooseImg").files[0];
        
        var reader = new FileReader();
        reader.onloadend = function() {
             el.style.backgroundImage ='url(\''+ reader.result+'\')';
             el.style.backgroundSize="100% 100%";
             console.log(reader.result);
        }
        reader.readAsDataURL(file);
    },false)
   

}


/////////////////////////////////////////////
function closeEdit(){
    document.getElementById("editPage").style.display='none';
}

////////////////////////////////

function editText(el){
    var input=document.createElement('input');
    input.classList="getText";
    input.value="Type something"

    input.style.width=el.offsetWidth+'px';
    input.style.height=el.offsetHeight+'px';
    input.style.left=el.offsetLeft+'px';
    input.style.top=el.offsetTop+'px';
    
    document.body.prepend(input);
    input.focus();

    document.body.addEventListener('click',exit=function(e){

        if(input.value.length<2){
            input.value="Type something";
        }
        el.innerHTML=input.value;
        input.remove();
        window.removeEventListener('click',exit,false);

    },false);
}

////////////////////////////////////////////////


//!.!.!.!.!.!.!.!.!.!.!.!.!.!//
function packingStyles(){
  
    var temp={};
    map.forEach(cls=>{
    
        temp[cls]=document.getElementsByClassName(cls)[0].style.cssText;
        console.log(temp);
    });
    temp["body"]=document.body.style.cssText;
    return temp;

}
//!.!.!.!.!.!.!.!.!.!.!.!.!.!//
function processAndSend(){

 
    URL=""+prompt("enter route name for your blog:");
    if (URL==="" || URL=="null" || URL=="/null"){
        processAndSend();
        return;
    }


    //!.!.!.!.!.!.!.!.!.!.!.!//
    let user=new User();
    let blog=new Blog();
    let bio =new Bio();
    let contact=new Contact();

    contact.setEmail(document.getElementById("Email").innerText);
    contact.setLinkedin(document.getElementById("Linkedin").innerText);
    contact.setPhone(document.getElementById("Phone").innerText);

    bio.setBiography(document.getElementsByClassName("Biography")[0].innerText);
    bio.setCVLink(document.getElementsByClassName("CVLink")[0].innerText);

    blog.setTitle(document.getElementsByClassName("Title")[0].innerText);
    blog.setBio(bio);
    blog.setContact(contact);
    blog.setStyle(packingStyles());

    user.setURL(URL);
    user.setName(document.getElementsByClassName("Name")[0].innerHTML);
    user.setBlog(blog);

    console.log(JSON.stringify(user).replace(/\b_/g,""));
    //!.!.!.!.!.!.!.!.!.!.!.!//
    
    var obj={Name:document.getElementsByClassName("Name")[0].innerHTML,
             URL:URL,
             Blog:{Title:document.getElementsByClassName("Title")[0].innerText,
                   Bio:{Content:document.getElementsByClassName("Biography")[0].innerText,CVLink:document.getElementsByClassName("CVLink")[0].innerText},
                   Contact:{Phone:document.getElementById("Phone").innerText , Email: document.getElementById("Email").innerText , Linkedin:document.getElementById("Linkedin").innerText},
                   Style:null}}
    var temp={};

    map.forEach(cls=>{
       

        temp[cls]=document.getElementsByClassName(cls)[0].style.cssText;
        //console.log(temp);
        
    });
    temp["body"]=document.body.style.cssText;
    obj["Style"]=temp;
    //console.log(obj);


    ////////////////////

    var data= JSON.stringify(user).replace(/\b_/g,""); //JSON.stringify(obj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             
            console.log(JSON.parse(this.response));

        }    
    };

    xhttp.open("POST", "http://localhost:8080/submitBlog", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhttp.setRequestHeader("Content-type", "multipart/form-data");
    xhttp.send(data);
}


/////////////////////////////////////






