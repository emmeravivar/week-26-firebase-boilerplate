import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, ref, set, child, get  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

//configuración Firebase
const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: ""
};
	
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initalize DataBase
const database = getDatabase();

// get elements html
const message = document.querySelector('#message');
const write   = document.querySelector('#write');
const read	  = document.querySelector('#read');
const status  = document.querySelector('#status');

	write.addEventListener('click', e => {
		set(ref(database, '/users' ), {'message' : message.value})
			.then(function(){
				status.innerHTML = "Wrote to DB!";
			});
	});
		

	read.addEventListener('click', e => {
		const dbRef = ref(database);
			get(child(dbRef, `users/`)).then((snapshot) => {
			if (snapshot.exists()) {
				console.log(snapshot.val());
			} else {
				console.log("No data available");
			}
			}).catch((error) => {
				console.error(error);
			});
	});