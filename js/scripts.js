var map=["header","topMenu","logo","menuOption","main","footer","Home","Avatar","BIO","Biography","CVLink","POSTS"];

function addResizeListener(){

    map.forEach(cls=>{
        document.getElementsByClassName(cls)[0].setAttribute('onclick','resizer(\''+cls+'\');event.cancelBubble=true;');
    });
    
}

function resizer(elemClass){

    [...document.getElementsByClassName('resizer')].forEach(el=>{
        el.remove()
    });
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
resizerRight.style.left=element.offsetLeft+element.offsetWidth+'px';


resizerBottom.style.top=(element.offsetTop+element.offsetHeight)-window.scrollY+'px';
resizerBottom.style.left=element.offsetLeft+element.offsetWidth/2+'px';
resizerBottom.style.cursor="ns-resize";

edit.style.top=(element.offsetTop)-window.scrollY+'px';

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



//copyNodeStyle(element,document.getElementsByClassName("Home")[0]);
}

setTimeout(function(){addResizeListener()},1000);



var lastScrollTop=0;
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



function copyNodeStyle(sourceNode, targetNode) {
    const computedStyle =window.getComputedStyle(sourceNode);
    Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
  }





  function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}