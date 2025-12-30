// Alternative: Firebase data collection
// 1. Go to https://firebase.google.com/ and create a free account
// 2. Create a new project
// 3. Go to Project Settings > Service Accounts > Generate private key
// 4. Replace YOUR_CONFIG below

// Firebase configuration (replace with your config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID"
};

// Initialize Firebase (add this script to your HTML)
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function sendToFirebase(userData) {
    const newData = {
        ...userData,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    database.ref('users').push(newData)
        .then(() => {
            console.log('Data saved to Firebase successfully');
        })
        .catch(error => {
            console.log('Error saving to Firebase:', error);
        });
}

// Update your start function to use this instead
function start(){
    const userName = document.getElementById("userName").value;
    const userDob = document.getElementById("userDob").value;
    if (!userName || !userDob) {
        alert("Please enter both your name and date of birth!");
        return;
    }
    const birthDate = new Date(userDob);
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const zodiacSign = getZodiacSign(birthMonth, birthDay);
    const userData = {
        name: userName,
        dob: userDob,
        zodiacSign: zodiacSign,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('newYearUserData', JSON.stringify(userData));
    
    // Send to Firebase instead of Google Sheets
    sendToFirebase(userData);
    
    const prediction = generateNewYearPrediction(userDob);
    document.querySelector(".friendName").innerText = `Hello ${userName}`;
    document.querySelector(".hero-quote p").innerHTML = `Based on your ${prediction.zodiacSign} astrological profile, here is your 2026 prediction: ${prediction.heroMessage}`;
    updateWishCards(prediction);
    tickMusic.play();
    bgMusic.play();
    firstScreen.style.top = "-100vh";
    openFullscreen();
    st(()=>{firstScreen.remove()});
}
