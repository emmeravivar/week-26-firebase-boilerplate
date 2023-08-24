(function(){

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyB50XToHhvYNG2LSQ1dsOC4FPXEUWRwV6E",
		authDomain: "courso-ee0b2.firebaseapp.com",
		databaseURL: "https://courso-ee0b2-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "courso-ee0b2",
		storageBucket: "courso-ee0b2.appspot.com",
		messagingSenderId: "853168541102",
		appId: "1:853168541102:web:3bf514e1378b4510a78c3f"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);


	// handle on firebase db
	const db = firebase.database();

	// get elements
	const message = document.getElementById('message');
	const write   = document.getElementById('write');
	const read	  = document.getElementById('read');
	const status  = document.getElementById('status');

	// write
	write.addEventListener('click', e => {
		const messages = db.ref('messages');

		// simple id - ok for example, do not use in production
		const id = (new Date).getTime(); 

		// write to db
		messages.child(id).set({'message' : message.value})
			.then(function(){
				status.innerHTML = "Wrote to DB!";
			});
	});

	// read
	read.addEventListener('click', e => {
		status.innerHTML = '';
		const messages = db.ref('messages');

		messages.once('value')
		  .then(function(dataSnapshot) {
		  	var data = dataSnapshot.val();
		  	var keys = Object.keys(data);

		  	keys.forEach(function(key){
		  		console.log(data[key]);
				status.innerHTML += JSON.stringify(data[key]) + '<br>';
		  	});
		});
	});


}());