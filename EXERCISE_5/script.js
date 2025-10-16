// Get references to all the form elements
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const successMessage = document.getElementById('successMessage');

// --- EVENT LISTENERS for real-time validation ---
fullName.addEventListener('input', () => validateField(fullName, fullName.value.length >= 2, 'Full name must be at least 2 characters.'));
email.addEventListener('input', () => validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), 'Please enter a valid email address.'));
password.addEventListener('input', () => validateField(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password.value), 'Password must meet the criteria.'));
phone.addEventListener('input', () => validateField(phone, /^\d{10}$/.test(phone.value), 'Phone number must be 10 digits.'));

// Generic function to handle validation UI updates
function validateField(field, condition, errorMessage) {
    const errorP = field.nextElementSibling;
    if (condition) {
        field.classList.remove('input-error');
        field.classList.add('input-success');
        errorP.style.display = 'none';
        return true;
    } else {
        field.classList.remove('input-success');
        field.classList.add('input-error');
        errorP.textContent = errorMessage;
        errorP.style.display = 'block';
        return false;
    }
}

// --- FORM SUBMISSION HANDLING ---
form.addEventListener('submit', function(event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Validate all fields one last time
    const isFullNameValid = validateField(fullName, fullName.value.length >= 2, 'Full name must be at least 2 characters.');
    const isEmailValid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), 'Please enter a valid email address.');
    const isPasswordValid = validateField(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password.value), 'Password must meet the criteria.');
    const isPhoneValid = validateField(phone, /^\d{10}$/.test(phone.value), 'Phone number must be 10 digits.');

    // If all fields are valid, show success message
    if (isFullNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
        successMessage.textContent = 'Registration successful!';
        form.reset(); // Optional: clear the form
        // Remove success/error classes after reset
        [fullName, email, password, phone].forEach(field => {
            field.classList.remove('input-success', 'input-error');
        });
    } else {
        successMessage.textContent = ''; // Clear any previous success message
    }
});