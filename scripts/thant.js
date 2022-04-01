var currentUser;
var currentUserRegion;
firebase.auth().onAuthStateChanged(user => {
     if (user) {
          console.log(user.uid);
          currentUser = db.collection("users").doc(user.uid);
          insertName();
          currentUser.get().then(function (doc) {
               console.log(doc.data());
               currentUserRegion = doc.data().region;
               console.log(currentUserRegion);
               populateCards("country", "==", currentUserRegion);
          })
     } else {
          console.log("No user is singned in");
          window.location.href = "login.html";
     }
});

function insertName() {
     currentUser.get().then(userDoc => {
          //get the user name
          var user_Name = userDoc.data().name;
          console.log(user_Name);
          $("#name-goes-here").text(user_Name);
     })
}

function writePosts() {
     var postsRef = db.collection("posts");

     postsRef.add({
          code: "BBY01",
          postOwner: "Vivian",
          country: "Arab",
          name: "Kitchen Craft Eatery",
          city: "Burnaby",
          openingHour: "9:00 am",
          closingHour: "9:00 pm",
          details: "Vivian goes here regularly",
          last_updated: firebase.firestore.FieldValue.serverTimestamp()

     });

     postsRef.add({
          code: "BBY02",
          postOwner: "Naz",
          country: "India",
          name: "Chamber Restaurant",
          city: "Downtown Vancouver",
          openingHour: "10:00 am",
          closingHour: "9:00 pm",
          details: "Naz goes here regularly",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
     });

     postsRef.add({
          code: "BBY03",
          postOwner: "Chilan",
          country: "China",
          name: "Gotham Steak House",
          city: "New Westmister",
          openingHour: "10:00 am",
          closingHour: "9:00 pm",
          details: "Chilan goes here regularly",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2022"))
     });
}

//----------------------------------------------------------
// This function will go to the "posts" collection,
// and use .where() to search based on provided key and value
//-----------------------------------------------------------
function populateCards(key, operation, value) {
     console.log(key);
     console.log(value);
     var cardTemplate = document.getElementById("CardTemplate");
     var postCardGroup = document.getElementById("posts-go-here");
     // while (postCardTemplate.firstChild) {
     //      postCardTemplate.removeChild(postCardTemplate.firstChild)
     // }
     db.collection("posts")
          .where(key, operation, value)
          //.orderBy("name")
          .limit(10)
          .get()
          .then(snap => {
               var i = 1;
               snap.forEach(doc => {
                    console.log(doc.data());
                    createOneCard(doc, cardTemplate, postCardGroup)
               })
          })
}

//-------------------------------------------------------------------------
// uses post object, creates one card using template, and appends to div
//-------------------------------------------------------------------------
function createOneCard(doc, cardTemplate, cardDiv) {
     console.log(doc.data());
     var postID = doc.data().code;
     var title = doc.data().name;
     var postScore = doc.data().scores;
     var details = doc.data().details;
     var postOwner = doc.data().postOwner;
     var country = doc.data().country;
     let testPostCard = cardTemplate.content.cloneNode(true);
     //update title and text and image
     testPostCard.querySelector('.card-title').innerHTML = title;
     testPostCard.querySelector('.card-text').innerHTML = details;
     // testPostCard.querySelector('.card-owner').innerHTML = postOwner;
     // testPostCard.querySelector('.card-country').innerHTML = country;
     // //this line sets the id attribute for the <i> tag in the format of "save-postID" 
     // //so later we know which hike to bookmark based on which post was clicked
     // testPostCard.querySelector('.save-button').id = 'save-' + postID;
     // // this line will call a function to save the hikes to the user's document             
     // testPostCard.querySelector('.save-button').onclick = () => saveBookmark(postID);
     // //this is the line added so that it makes the icon clickable and call another function
     // testPostCard.querySelector('.likeCard').onclick = () => addLikes(postID);
     // testPostCard.querySelector(".scores-goes-here").innerHTML = postScore;
     // testPostCard.querySelector('.card-image').src = `./images/${postID}.jpg`;
     cardDiv.appendChild(testPostCard);
}

function displayBySearch() {
     value = document.getElementById("searchvalue").value;
     alert("search clicked " + value);
     if (value) {
          console.log(value);
          populateCards("name", "==", value);
     }else
          populateCards("name", "!=", value);
}

// function addLikes(postID) {
//      console.log("inside");
//      db.collection("posts").where("code", "==", postID)
//           .get()
//           .then(queryPost => {
//                size = queryPost.size;
//                posts = queryPost.docs;
//                if (size = 1) {
//                     id = posts[0].id;
//                     console.log(id);
//                     db.collection("posts").doc(id).update({
//                          scores: firebase.firestore.FieldValue.increment(1)
//                     })
//                } else {
//                     console.log("Query has more than one data.")
//                }
//           })
//           .catch((error) => {
//                console.log("Error getting documents: ", error)
//           })
// }

// function saveBookmark(postID) {

//      currentUser.set({
//                bookmarks: firebase.firestore.FieldValue.arrayUnion(postID)

//           }, {
//                merge: true
//           })
//           .then(function () {
//                console.log("Post is saved for: " + currentUser);
//                var iconID = 'save-' + postID;
//                document.getElementById(iconID).innerText = 'bookmark';
//           });

// }