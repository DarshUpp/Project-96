const firebaseConfig = {
  apiKey: "AIzaSyD-cfYLHpoVRlsL6gNu5xv-F9fKfOeL_c0",
  authDomain: "kwiiterappdatabase.firebaseapp.com",
  projectId: "kwiiterappdatabase",
  storageBucket: "kwiiterappdatabase.appspot.com",
  messagingSenderId: "222085021204",
  appId: "1:222085021204:web:d02a7164f6d3070a23b101",
};
const app = initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter.html";
}
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
  })
  document.getElementById("msg").value = "";
}
function updatelike(message_id)
{
  console.log("clicked on like button - " + message_id);
  buttn_id = message_id;
  likes = document.getElementById(button_id).value;
  update_likes = Number(likes) + 1;
  console.log(updateed_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like:updateed_likes
  });
}