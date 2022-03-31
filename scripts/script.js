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

function popSchedule(){
    var g0;
    var g1;
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            db.collection("users").doc(user.uid)
            .collection("womensFreeskiBigAir")
            .orderby("startTime")
            .get()
            .then(snap => {
                var i=0;
                snap.forEach(doc =>{
                    i++;
                    console.log(doc.data());
                    if (i!=0){
                        g0 = lastEndTime; 
                        g1 = doc.data().startTime;
                        gap = g1 - g0;
                        //createGapDoc (user.uid, g0, g1, gap);
                        //genGapIdeas (g0, g1, gap);
                        lastEndTime = doc.data().endTime;
                    }
                })
            })
        }
    })
}