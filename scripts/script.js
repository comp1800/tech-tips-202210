//---------------------------------
// Your own functions here
//---------------------------------
function sayHello() {
    //do something
}
//sayHello();    //invoke function


function showUploadedPicture(){
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2
    fileInput.addEventListener('change', function(e){        //event listener
        var blob = URL.createObjectURL(e.target.files[0]);
        image.src = blob;    //change DOM image
    })
}
showUploadedPicture();