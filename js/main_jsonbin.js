// Alternative: JSONBin.io data collection
// 1. Go to https://jsonbin.io/ and create a free account
// 2. Create a new bin and copy the bin ID
// 3. Replace YOUR_BIN_ID below

function sendToJSONBin(userData) {
    const BIN_ID = '69539ea9d0ea881f40492feb'; // Your bin ID
    const API_KEY = '$2a$10$eFk2qyJxuRmMYFpTnKRRpu9KkSgwTGGufwnHHUGAJYCDC0x0sLU/.'; // Your master key
    
    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
    
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        },
        body: JSON.stringify({
            timestamp: new Date().toISOString(),
            data: userData
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved to JSONBin:', data);
    })
    .catch(error => {
        console.log('Error saving to JSONBin:', error);
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
    
    // Send to JSONBin instead of Google Sheets
    sendToJSONBin(userData);
    
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
