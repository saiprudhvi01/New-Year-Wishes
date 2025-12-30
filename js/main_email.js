// Alternative: Email notification using EmailJS
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service and template
// 3. Replace YOUR_CONFIG below

function sendEmailNotification(userData) {
    // EmailJS configuration
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    
    const templateParams = {
        to_email: 'your-email@example.com', // Your email to receive notifications
        from_name: userData.name,
        user_dob: userData.dob,
        zodiac_sign: userData.zodiacSign,
        timestamp: userData.timestamp,
        message: `New user data collected: ${userData.name} (${userData.zodiacSign})`
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email notification sent successfully:', response);
        }, function(error) {
            console.log('Failed to send email:', error);
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
    
    // Send email notification instead of Google Sheets
    sendEmailNotification(userData);
    
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

// Add EmailJS script to your HTML:
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
