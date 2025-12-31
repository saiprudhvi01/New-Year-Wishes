document.body.onload = function(){
    var firstScreen = document.getElementById("welcome");
    if (!firstScreen) return;

    firstScreen.querySelector("h2").innerText = "Welcome to New Year 2026";
    firstScreen.querySelector("p").innerHTML = "Enter your details to see how your New Year 2026 will be — based on your astrology profile.";
    
    // Check if user data exists and auto-fill
    const savedUserData = localStorage.getItem('newYearUserData');
    if (savedUserData) {
        try {
            const userData = JSON.parse(savedUserData);
            document.getElementById("userName").value = userData.name || '';
            document.getElementById("userDob").value = userData.dob || '';
        } catch (e) {
            // Silently handle any parsing errors
            console.log('No saved data found');
        }
    }
}

// Function to hide the welcome screen and show main content
function hideWelcomeScreen() {
    const welcome = document.getElementById('welcome');
    if (welcome) {
        welcome.style.display = 'none';
    }
}

// Make revealWish globally available
window.revealWish = function(wishElement, wishIndex) {
    const overlay = wishElement.querySelector('.wish-overlay');
    const content = wishElement.querySelector('.wish-content');
    
    if (content.classList.contains('hidden')) {
        // Hide overlay
        overlay.classList.add('hidden');
        
        // Reveal content with animation
        setTimeout(() => {
            content.classList.remove('hidden');
            content.classList.add('revealed');
            
            // Add sparkle effect
            createWishSparkles(wishElement);
            
            // Play a subtle sound effect if available
            playWishRevealSound();
        }, 300);
        
        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

function start(){
    const userName = document.getElementById("userName").value;
    const userDob = document.getElementById("userDob").value;
    if (!userName || !userDob) {
        alert("Please enter both your name and date of birth!");
        return;
    }
    
    // Validate DD/MM/YYYY format
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(userDob)) {
        alert("Please enter date in DD/MM/YYYY format (e.g., 15/01/2000)");
        return;
    }
    
    // Convert DD/MM/YYYY to YYYY-MM-DD for JavaScript Date
    const [, day, month, year] = userDob.match(datePattern);
    const formattedDate = `${year}-${month}-${day}`;
    const birthDate = new Date(formattedDate);
    
    // Validate if it's a real date
    if (isNaN(birthDate.getTime()) || birthDate.getDate() != parseInt(day) || 
        birthDate.getMonth() + 1 != parseInt(month) || birthDate.getFullYear() != parseInt(year)) {
        alert("Please enter a valid date!");
        return;
    }
    
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const zodiacSign = getZodiacSign(birthMonth, birthDay);
    const userData = {
        name: userName,
        dob: userDob, // Keep DD/MM/YYYY format for display
        dobFormatted: formattedDate, // Add formatted date for calculations
        zodiacSign: zodiacSign,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('newYearUserData', JSON.stringify(userData));
    
    // Send to JSONBin
    sendToGoogleSheet(userData);
    
    const prediction = generateNewYearPrediction(formattedDate);
    
    // Update the pre-New Year message with user's name
    document.querySelector(".message-title").innerHTML = `🌟 Something Special Before 2026, ${userName}! 🌟`;
    document.querySelector(".wish-text").innerHTML = `✨ Dear ${userName}, as the clock ticks toward midnight, I wanted to share something magical with you...`;
    document.querySelector(".advice-text").innerHTML = `💫 The stars align for new beginnings, ${userName}. Your dreams take flight, and possibilities become endless. Your journey into 2026 holds extraordinary promise!`;
    document.querySelector(".blessing-text").innerHTML = `🎯 May this New Year bring you courage to chase your dreams, wisdom to make right choices, and joy in every moment you live, ${userName}.`;
    document.querySelector(".timing-text").innerHTML = `⏰ The perfect moment approaches, ${userName}... Get ready to discover your incredible 2026 destiny!`;
    
    document.querySelector(".hero-quote p").innerHTML = `Based on your ${prediction.zodiacSign} astrological profile, here is your 2026 prediction: ${prediction.heroMessage}`;
    updateWishCards(prediction);
    
    // Play audio after user interaction
    const tickMusic = document.getElementById("tickMusic");
    const bgMusic = document.getElementById("backgroundMusic");
    if (tickMusic) tickMusic.play();
    if (bgMusic) bgMusic.play();
    
    // Hide welcome screen and show main content
    document.getElementById("welcome").style.display = "none";
    document.querySelector(".main-content").style.display = "block";
    document.body.classList.add('opened');
    
    // Force scroll to top to remove any residual offset
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Create prediction chart (only if chart exists on page)
    const predictionChartCanvas = document.getElementById('predictionChart');
    if (predictionChartCanvas && typeof createPredictionChart === 'function') {
        setTimeout(() => {
            createPredictionChart(birthDate);
        }, 500);
    }
}

// Make revealCard globally available
window.revealCard = function(cardElement, cardIndex) {
    const overlay = cardElement.querySelector('.card-overlay');
    const details = cardElement.querySelector('.details');
    
    if (details.classList.contains('hidden')) {
        // Hide overlay
        overlay.classList.add('hidden');
        
        // Reveal details with animation
        setTimeout(() => {
            details.classList.remove('hidden');
            details.classList.add('revealed');
            
            // Add sparkle effect
            createSparkles(cardElement);
            
            // Play a subtle sound effect if available
            playCardRevealSound();
        }, 300);
        
        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

// Also declare as regular function for compatibility
function revealCard(cardElement, cardIndex) {
    return window.revealCard(cardElement, cardIndex);
}

function createSparkles(element) {
    const sparkleCount = 8;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: gold;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: sparkleBurst 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }
}

function playCardRevealSound() {
    // Create a subtle sound effect using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Fallback silently if audio API is not available
    }
}

function revealWish(wishElement, wishIndex) {
    const overlay = wishElement.querySelector('.wish-overlay');
    const content = wishElement.querySelector('.wish-content');
    
    if (content.classList.contains('hidden')) {
        // Hide overlay
        overlay.classList.add('hidden');
        
        // Reveal content with animation
        setTimeout(() => {
            content.classList.remove('hidden');
            content.classList.add('revealed');
            
            // Add sparkle effect
            createWishSparkles(wishElement);
            
            // Play a subtle sound effect if available
            playWishRevealSound();
        }, 300);
        
        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

function createWishSparkles(element) {
    const sparkleCount = 6;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #ff6b6b, #ffd700);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: sparkleBurst 1.2s ease-out forwards;
            animation-delay: ${i * 0.15}s;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1800);
    }
}

function playWishRevealSound() {
    // Create a subtle sound effect using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    } catch (e) {
        // Fallback silently if audio API is not available
    }
}

function createPredictionChart(birthDate) {
    const canvas = document.getElementById('predictionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const zodiacSign = getZodiacSign(birthMonth, birthDay);
    
    // Calculate predictions based on birth date
    const predictions = calculateLifePredictions(birthMonth, birthDay, zodiacSign);
    
    // Create the chart
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: predictions.labels,
            datasets: [{
                data: predictions.values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',   // Career & Growth - Pink
                    'rgba(54, 162, 235, 0.8)',   // Health & Fitness - Blue
                    'rgba(255, 206, 86, 0.8)',   // Relationships - Orange
                    'rgba(75, 192, 192, 0.8)',   // Wealth & Stability - Teal
                    'rgba(153, 102, 255, 0.8)'  // Learning & Creativity - Purple
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    // Create custom legend
    createCustomLegend(predictions);
}

function calculateLifePredictions(month, day, zodiacSign) {
    // Base values
    let predictions = {
        'Career & Growth': 20,
        'Health & Fitness': 20,
        'Relationships': 20,
        'Wealth & Stability': 20,
        'Learning & Creativity': 20
    };
    
    // Adjust based on zodiac sign
    const zodiacAdjustments = {
        'Aries': { 'Career & Growth': 25, 'Health & Fitness': 15, 'Relationships': 15, 'Wealth & Stability': 20, 'Learning & Creativity': 25 },
        'Taurus': { 'Career & Growth': 15, 'Health & Fitness': 25, 'Relationships': 25, 'Wealth & Stability': 25, 'Learning & Creativity': 10 },
        'Gemini': { 'Career & Growth': 20, 'Health & Fitness': 15, 'Relationships': 25, 'Wealth & Stability': 15, 'Learning & Creativity': 25 },
        'Cancer': { 'Career & Growth': 15, 'Health & Fitness': 20, 'Relationships': 30, 'Wealth & Stability': 20, 'Learning & Creativity': 15 },
        'Leo': { 'Career & Growth': 30, 'Health & Fitness': 20, 'Relationships': 20, 'Wealth & Stability': 15, 'Learning & Creativity': 15 },
        'Virgo': { 'Career & Growth': 25, 'Health & Fitness': 25, 'Relationships': 15, 'Wealth & Stability': 20, 'Learning & Creativity': 15 },
        'Libra': { 'Career & Growth': 20, 'Health & Fitness': 15, 'Relationships': 25, 'Wealth & Stability': 20, 'Learning & Creativity': 20 },
        'Scorpio': { 'Career & Growth': 25, 'Health & Fitness': 20, 'Relationships': 20, 'Wealth & Stability': 25, 'Learning & Creativity': 10 },
        'Sagittarius': { 'Career & Growth': 20, 'Health & Fitness': 25, 'Relationships': 15, 'Wealth & Stability': 15, 'Learning & Creativity': 25 },
        'Capricorn': { 'Career & Growth': 30, 'Health & Fitness': 20, 'Relationships': 15, 'Wealth & Stability': 25, 'Learning & Creativity': 10 },
        'Aquarius': { 'Career & Growth': 20, 'Health & Fitness': 15, 'Relationships': 20, 'Wealth & Stability': 15, 'Learning & Creativity': 30 },
        'Pisces': { 'Career & Growth': 15, 'Health & Fitness': 20, 'Relationships': 25, 'Wealth & Stability': 15, 'Learning & Creativity': 25 }
    };
    
    // Apply zodiac adjustments
    if (zodiacAdjustments[zodiacSign]) {
        predictions = zodiacAdjustments[zodiacSign];
    }
    
    // Add some variation based on birth day
    const dayVariation = (day % 5) - 2; // -2 to +2
    const categories = Object.keys(predictions);
    categories.forEach((category, index) => {
        predictions[category] += dayVariation;
        predictions[category] = Math.max(10, Math.min(35, predictions[category])); // Keep between 10-35
    });
    
    // Normalize to 100%
    const total = Object.values(predictions).reduce((a, b) => a + b, 0);
    const normalized = {};
    Object.keys(predictions).forEach(key => {
        normalized[key] = Math.round((predictions[key] / total) * 100);
    });
    
    return {
        labels: Object.keys(normalized),
        values: Object.values(normalized)
    };
}

function createCustomLegend(predictions) {
    const legendContainer = document.getElementById('chartLegend');
    const colors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
    ];
    
    legendContainer.innerHTML = '';
    
    predictions.labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${colors[index]}"></div>
            <div class="legend-text">${label}: <span class="legend-value">${predictions.values[index]}%</span></div>
        `;
        legendContainer.appendChild(legendItem);
    });
}

function generateNewYearPrediction(dob) {
    const birthDate = new Date(dob);
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthDate.getFullYear();
    
    // Generate predictions based on birth month and day
    let zodiacSign = getZodiacSign(birthMonth, birthDay);
    let predictions = getPredictions(zodiacSign, age);
    
    return {
        zodiacSign: zodiacSign,
        heroMessage: predictions.hero,
        wishes: predictions.wishes
    };
}

function getZodiacSign(month, day) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
}

function getPredictions(zodiacSign, age) {
    const predictions = {
        Aries: {
            hero: "🔥 2026 brings satisfaction and balance with exciting opportunities! Your bold decisions and increased self-confidence will help you take charge in every aspect of life, leading to remarkable personal and professional achievements.",
            wishes: [
                "Love and romance feel warmer and more supportive throughout 2026. Opportunities to make your bond stronger and more trustworthy await you, with deeper emotional connections and mutual understanding.",
                "Career progress requires patience during the initial months, but your consistent and focused approach brings great success by year-end, including potential promotions and recognition.",
                "Financial stability comes through smart choices and strategic budget plans. Your disciplined approach to money management creates lasting security and growth opportunities."
            ]
        },
        Taurus: {
            hero: "💎 2026 focuses on building stability and fine-tuning long-term goals! This year lays the foundation for future success and peace, with steady progress in all areas of your life.",
            wishes: [
                "Love life benefits from clear communication and emotional patience. Comfort and harmony strengthen bonds, creating deeper connections and lasting relationships with your partner.",
                "Career shows steady progress with your practical nature supporting financial plans and savings effectively. Professional recognition and advancement opportunities arise.",
                "Financial gains come from thoughtful long-term strategy and smart investment choices. Your conservative approach pays off with substantial returns and security."
            ]
        },
        Gemini: {
            hero: "🌟 2026 requires patience and clarity after mixed times! This period of exploration and growth turns obstacles into opportunities, bringing valuable life lessons and personal development.",
            wishes: [
                "Love relationships strengthen through mature approach and honest conversations with your partner. Open communication leads to deeper understanding and stronger emotional bonds.",
                "Career path may change course as new opportunities present themselves with confident steps forward. Networking and adaptability open doors to success.",
                "Financial situations improve with better choices and thoughtful spending habits. Your analytical skills help identify profitable opportunities and avoid pitfalls."
            ]
        },
        Cancer: {
            hero: "🏡 2026 brings progress and challenges, focusing on healing and balance! This year encourages emotional growth in all life areas, leading to profound personal transformation.",
            wishes: [
                "Love life becomes emotionally fulfilling and romantic. Smooth sailing with partner support awaits, creating deeper intimacy and stronger family connections.",
                "Career shows steady, transformative growth with persistent and calm attitude toward goals. Your intuition guides you to make the right professional decisions.",
                "Financial fulfillment comes through careful planning and strategic budgeting this year. Your nurturing approach extends to creating financial security for loved ones."
            ]
        },
        Leo: {
            hero: "👑 2026 is full of growth, resilience, and achievement! Greater level-headedness and practical approach mark your success, bringing recognition and fulfillment in all endeavors.",
            wishes: [
                "Love life requires grounded, realistic approach for deeper, stronger connections this year. Your charismatic nature attracts meaningful and lasting relationships.",
                "Career moves positively with excellent growth and recognition opportunities. Leadership abilities shine, bringing promotions and increased responsibilities.",
                "Financial stability and growth-oriented year despite delays. Luck supports money goals, and your confidence attracts lucrative opportunities."
            ]
        },
        Virgo: {
            hero: "🌿 2026 brings future-shaping opportunities! Caution and aggressiveness help overcome roadblocks to success, creating pathways to achievement and personal satisfaction.",
            wishes: [
                "Love requires open, thoughtful communication for deeper, more secure bonds with partner. Your analytical nature helps understand relationship dynamics better.",
                "Career takes positive turn despite initial worries. Disciplined moves bring steadiness and professional advancement through meticulous planning.",
                "Financial fluctuations stabilize through careful planning and smart money management. Your attention to detail prevents costly mistakes and maximizes gains."
            ]
        },
        Libra: {
            hero: "⚖️ 2026 is empowering with growth and success! Careful navigation of obstacles brings achievement in many life areas, creating balance and harmony in your journey.",
            wishes: [
                "Love and relationships excel for singles and married with new connections and closer bonds. Your diplomatic nature resolves conflicts and strengthens relationships.",
                "Career looks promising and stable with structure, consistency, and financial benefits. Professional relationships flourish and bring advancement opportunities.",
                "Money matters improve with steady planning and balanced approach. Great investment opportunities arise, and your sense of fairness guides financial decisions."
            ]
        },
        Scorpio: {
            hero: "🔮 2026 brings deep personal growth and transformation! Grounded, open outlook creates meaningful life changes, leading to profound insights and empowerment.",
            wishes: [
                "Love faces emotional tests initially but brings emotional depth and stability later on. Your intensity creates passionate, transformative connections.",
                "Career looks bright and steady with structured professional life supporting financial stability. Strategic thinking leads to significant business gains.",
                "Finances prosper with significant growth for job doers and consistent gains for businesses. Your intuition guides profitable investment decisions."
            ]
        },
        Sagittarius: {
            hero: "🏹 2026 expands your life views with growth and transformations! Learning, travel, and personal discoveries await, broadening your horizons and wisdom.",
            wishes: [
                "Love relationships experience genuine, steady connections despite minor emotional changes. Your adventurous spirit brings excitement and growth to relationships.",
                "Career faces challenges but shows consistent growth. Patience brings long-term security, and your optimism attracts opportunities for advancement.",
                "Financial prosperity with good savings and increased steady growth throughout the year. Your expansive thinking identifies diverse income streams."
            ]
        },
        Capricorn: {
            hero: "🏔️ 2026 brings challenges and achievements! Growth, stability, and emotional fulfillment mark the year, building the foundation for long-term success.",
            wishes: [
                "Love experiences both joyous and testing times. Dating relationships see stability this year, and committed partnerships deepen through shared goals.",
                "Career growth is gradual with steady actions and focused strategies bringing control. Your ambition leads to significant professional achievements.",
                "Financial highs and lows balance out as year progresses with promising investment prospects. Your discipline ensures long-term financial security."
            ]
        },
        Aquarius: {
            hero: "⚡ 2026 is a year of reinvention and innovation! Reflection, adaptability, and personal growth define success, bringing breakthrough insights and opportunities.",
            wishes: [
                "Love relationships may bring emotional swings. Patience and trust preserve harmony, and your unique approach strengthens relationship bonds.",
                "Career fulfillment comes gradually. Prosperity brings you closer to your goals, and innovative ideas lead to professional recognition.",
                "Financial balance supports growth despite slow areas. Stability ensures success, and your forward-thinking approach identifies emerging opportunities."
            ]
        },
        Pisces: {
            hero: "🌊 2026 offers favorable outcomes in all life spheres! Optimism, clarity, and forward growth overcome initial uncertainty, bringing success and fulfillment.",
            wishes: [
                "Love relationships remain stable and positive with balanced, profound connections. Your compassion creates deep emotional bonds and understanding.",
                "Career stays stable and balanced with significant advancements despite minor setbacks. Your creativity and intuition guide professional success.",
                "Financial stability rewards with steady earnings. Mindful spending prevents money stress, and your intuitive nature guides financial decisions."
            ]
        }
    };
    
    return predictions[zodiacSign] || predictions.Aries;
}

function updateWishCards(prediction) {
    const wishCards = document.querySelectorAll('.wish-card p');
    prediction.wishes.forEach((wish, index) => {
        if (wishCards[index]) {
            wishCards[index].innerHTML = wish;
        }
    });
}

// Function to send data to JSONBin (collects multiple users)
function sendToGoogleSheet(userData) {
    const BIN_ID = '69539ea9d0ea881f40492feb'; // Your bin ID
    const API_KEY = '$2a$10$eFk2qyJxuRmMYFpTnKRRpu9KkSgwTGGufwnHHUGAJYCDC0x0sLU/.'; // Your master key
    
    // First, get existing data
    const readUrl = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
    
    fetch(readUrl, {
        headers: {
            'X-Master-Key': API_KEY
        }
    })
    .then(response => response.json())
    .then(existingData => {
        // Add new user to existing data
        let allUsers = [];
        if (existingData.record && existingData.record.users) {
            allUsers = existingData.record.users;
        }
        
        // Add new user with timestamp
        allUsers.push({
            ...userData,
            collected_at: new Date().toISOString()
        });
        
        // Update the bin with all users
        const writeUrl = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
        
        return fetch(writeUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({
                users: allUsers,
                last_updated: new Date().toISOString(),
                total_users: allUsers.length
            })
        });
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved to JSONBin:', data);
        console.log('Total users collected:', data.record.total_users);
    })
    .catch(error => {
        console.log('Error saving to JSONBin:', error);
    });
}

// Function to retrieve all saved user data (for your analysis)
function getAllSavedUserData() {
    const userData = localStorage.getItem('newYearUserData');
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Function to clear saved data (if needed)
function clearSavedUserData() {
    localStorage.removeItem('newYearUserData');
}

function st(fun,time=1){
    setTimeout(() => {fun()}, time*1000);
}

var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}