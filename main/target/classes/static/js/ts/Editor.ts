


////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//                                                                                //
//      This code is look like hammered sh*t! I know,will refactor later.         //
//                                                                                //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////


var picker;
var lastScrollTop=0;
var map=["header","topMenu","logo","menuOption","main","footer","Home","Avatar","BIO","Biography","CVLink","POSTS"];
var contents=["Name","Title","Content","CVLink","Email","Linkedin","Phone"];
///////////////////////////////////////////
export function addResizeListener(){

    map.forEach(cls=>{
        document.getElementsByClassName(cls)[0].setAttribute('onclick','resizer(\''+cls+'\');event.cancelBubble=true;');
    });               
}
/////////////////////////////////////////
export function addEditTextListener(){

    var elem:any;
    contents.forEach(cls=>{
        elem=document.getElementsByClassName(cls)[0];
        elem.setAttribute('onclick','editText(this);event.cancelBubble=true;');
    });               
}
////////////////////////////////////////

function getColor(){
    console.log((<HTMLInputElement>document.getElementsByClassName("picker_editor")[0].firstElementChild).value);
}
///////////////////////////////////////


function resizer(elemClass){

    [...document.getElementsByClassName('resizer')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('move')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('edit')].forEach(el=>{el.remove()});
    [...document.getElementsByClassName('exitResizer')].forEach(el=>{el.remove()});

disableScrolling()

var element =<HTMLElement>document.getElementsByClassName(elemClass)[0];

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

   var marginLeft=e.clientX-element.offsetWidth/4;
   var marginTop=e.clientY-element.offsetHeight/2;
   
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

    var st = window.pageYOffset || document.body.scrollTop; 
  /*  if(document.getElementsByClassName("move").length==0){
        console.log("hi");
        return;
    }
    moveTop=document.getElementsByClassName("move")[0].style.top;
    resizeRightTop=document.getElementsByClassName("resizer")[0].style.top;
    ResizeBottomTop=document.getElementsByClassName("resizer")[1].style.top;

    
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
    */
    lastScrollTop = st <= 0 ? 0 : st;
    if(lastScrollTop==undefined){
        lastScrollTop=0;
    }

    
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
 
    var el:any;
    document.getElementById("editPage").style.display='block';
    el=document.getElementsByClassName(elClass)[0];
    
    picker.onChange=function(color){
    el.style.backgroundColor=color.rgbaString;    
    }
    document.getElementById("chooseImg").addEventListener('change',function(e){
        var file =(<HTMLInputElement>document.getElementById("chooseImg")).files[0];
        
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
    input.classList.add("getText");
    input.value="Type something"

    updatePos();
    input.style.width=el.offsetWidth+'px';
    input.style.height=el.offsetHeight+'px';
    input.style.left=el.offsetLeft+'px';
    input.style.top=el.offsetTop-lastScrollTop+'px';
    
    document.body.prepend(input);
    input.focus();

    var exit:any=function(e){

        if(input.value.length<2){
            input.value="Type something";
        }
        el.innerHTML="<p2>"+input.value+"</p2>";
        input.remove();
        window.removeEventListener('click',exit,false);

    }

    input.addEventListener('click',exit ,false);
}

