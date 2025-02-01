// script.js
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const successMessage = document.createElement('div');
    successMessage.style.marginTop = '10px';
    
    // Validación básica de email
    if (!validateEmail(email)) {
        successMessage.textContent = 'Please enter a valid email address';
        successMessage.style.color = 'red';
        e.target.appendChild(successMessage);
        return;
    }

    // Enviar a Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbycFTeqAw384Wa3dN4p8r5EIZ0nR5gD1vnGowvxleuxZLRB_o-s0wQQEBbnAJGhiDws/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
    .then(() => {
        successMessage.textContent = 'Thank you for subscribing!';
        successMessage.style.color = 'green';
        e.target.appendChild(successMessage);
        e.target.reset();
    })
    .catch(error => {
        successMessage.textContent = 'Error submitting form, please try again';
        successMessage.style.color = 'red';
        e.target.appendChild(successMessage);
        console.error('Error:', error);
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}