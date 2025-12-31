// DD/MM/YYYY date format handler
function setupDateFormat() {
    const dobInput = document.getElementById('userDob');
    if (!dobInput) return;

    // Auto-format as user types
    dobInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
        let formattedValue = '';
        
        if (value.length >= 2) {
            formattedValue = value.slice(0, 2) + '/';
            if (value.length >= 4) {
                formattedValue += value.slice(2, 4) + '/';
                if (value.length > 4) {
                    formattedValue += value.slice(4, 8);
                }
            } else {
                formattedValue += value.slice(2);
            }
        } else {
            formattedValue = value;
        }
        
        e.target.value = formattedValue;
    });

    // Validate date format on blur
    dobInput.addEventListener('blur', function(e) {
        const value = e.target.value;
        const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        
        if (value && !datePattern.test(value)) {
            e.target.style.borderColor = '#ff6b6b';
            e.target.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.5)';
            showDateError('Please enter date in DD/MM/YYYY format');
        } else if (value && datePattern.test(value)) {
            // Validate if it's a real date
            const [, day, month, year] = value.match(datePattern);
            const date = new Date(`${year}-${month}-${day}`);
            
            if (isNaN(date.getTime()) || date.getDate() != parseInt(day) || 
                date.getMonth() + 1 != parseInt(month) || date.getFullYear() != parseInt(year)) {
                e.target.style.borderColor = '#ff6b6b';
                e.target.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.5)';
                showDateError('Please enter a valid date');
            } else {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.target.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
                hideDateError();
            }
        }
    });
}

function showDateError(message) {
    let errorDiv = document.getElementById('dateError');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'dateError';
        errorDiv.style.cssText = `
            color: #ff6b6b;
            font-size: 0.9em;
            margin-top: -10px;
            margin-bottom: 10px;
            text-align: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const inputGroup = document.querySelector('.input-group');
        if (inputGroup) {
            inputGroup.appendChild(errorDiv);
        }
    }
    errorDiv.textContent = message;
}

function hideDateError() {
    const errorDiv = document.getElementById('dateError');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Convert DD/MM/YYYY to YYYY-MM-DD for JavaScript Date
function convertDateFormat(dateString) {
    if (!dateString) return '';
    
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(dateString)) return dateString;
    
    const [, day, month, year] = dateString.match(datePattern);
    return `${year}-${month}-${day}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupDateFormat);

// Add fade-in animation
const fadeCSS = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

const dateFormatStyle = document.createElement('style');
dateFormatStyle.textContent = fadeCSS;
document.head.appendChild(dateFormatStyle);
