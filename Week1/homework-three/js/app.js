// Validation functions for text inputs
function validateNumber(value, fieldName, min = 0, max = Infinity) {
    const errors = [];
    
    // Check if empty
    if (!value || value.trim() === '') {
        errors.push(`${fieldName} is required`);
        return errors;
    }
    
    // Remove any non-numeric characters except decimal point and negative sign
    const cleanValue = value.replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleanValue);
    
    // Check if it's a valid number
    if (isNaN(num)) {
        errors.push(`${fieldName} must be a valid number`);
        return errors;
    }
    
    // Check if it's a positive number (for most financial calculations)
    if (num < min) {
        errors.push(`${fieldName} must be at least ${min}`);
    }
    
    // Check maximum value
    if (num > max) {
        errors.push(`${fieldName} cannot exceed ${max}`);
    }
    
    // Check for reasonable decimal places
    const decimalPlaces = (cleanValue.split('.')[1] || '').length;
    if (decimalPlaces > 2) {
        errors.push(`${fieldName} cannot have more than 2 decimal places`);
    }
    
    return errors;
}

function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
        return [`${fieldName} is required`];
    }
    return [];
}

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = document.getElementById(elementId.replace('Error', ''));
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        if (message) {
            inputElement.classList.add('error');
            errorElement.style.display = 'block';
        } else {
            inputElement.classList.remove('error');
            errorElement.style.display = 'none';
        }
    }
}

function clearErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const errorElements = form.querySelectorAll('.error-message');
    const inputElements = form.querySelectorAll('input, select');
    
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

// Simple Interest Calculator
document.getElementById('simpleInterestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors('simpleInterestForm');
    
    const principal = document.getElementById('principal').value;
    const rate = document.getElementById('rate').value;
    const time = document.getElementById('time').value;
    
    let hasErrors = false;
    
    // Validate principal
    const principalErrors = validateNumber(principal, 'Principal Amount', 0.01);
    if (principalErrors.length > 0) {
        displayError('principalError', principalErrors[0]);
        hasErrors = true;
    }
    
    // Validate rate
    const rateErrors = validateNumber(rate, 'Interest Rate', 0, 100);
    if (rateErrors.length > 0) {
        displayError('rateError', rateErrors[0]);
        hasErrors = true;
    }
    
    // Validate time
    const timeErrors = validateNumber(time, 'Time', 0.1);
    if (timeErrors.length > 0) {
        displayError('timeError', timeErrors[0]);
        hasErrors = true;
    }
    
    if (!hasErrors) {
        // Calculate simple interest: I = PRT
        const p = parseFloat(principal.replace(/[^0-9.-]/g, ''));
        const r = parseFloat(rate.replace(/[^0-9.-]/g, ''));
        const t = parseFloat(time.replace(/[^0-9.-]/g, ''));
        
        const interest = (p * r * t) / 100;
        const total = p + interest;
        
        document.getElementById('simpleResult').innerHTML = `
            <h3>Simple Interest Results:</h3>
            <p>Principal: $${p.toFixed(2)}</p>
            <p>Interest Rate: ${r}%</p>
            <p>Time: ${t} years</p>
            <p>Interest Earned: $${interest.toFixed(2)}</p>
            <p><strong>Total Amount: $${total.toFixed(2)}</strong></p>
        `;
    }
});

// Compound Interest Calculator
document.getElementById('compoundInterestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors('compoundInterestForm');
    
    const principal = document.getElementById('compoundPrincipal').value;
    const rate = document.getElementById('compoundRate').value;
    const time = document.getElementById('compoundTime').value;
    const frequency = document.getElementById('compoundFrequency').value;
    
    let hasErrors = false;
    
    // Validate principal
    const principalErrors = validateNumber(principal, 'Principal Amount', 0.01);
    if (principalErrors.length > 0) {
        displayError('compoundPrincipalError', principalErrors[0]);
        hasErrors = true;
    }
    
    // Validate rate
    const rateErrors = validateNumber(rate, 'Interest Rate', 0, 100);
    if (rateErrors.length > 0) {
        displayError('compoundRateError', rateErrors[0]);
        hasErrors = true;
    }
    
    // Validate time
    const timeErrors = validateNumber(time, 'Time', 0.1);
    if (timeErrors.length > 0) {
        displayError('compoundTimeError', timeErrors[0]);
        hasErrors = true;
    }
    
    // Validate frequency
    if (!frequency) {
        displayError('compoundFrequencyError', 'Please select a compounding frequency');
        hasErrors = true;
    }
    
    if (!hasErrors) {
        // Calculate compound interest: A = P(1 + r/n)^(nt)
        const p = parseFloat(principal.replace(/[^0-9.-]/g, ''));
        const r = parseFloat(rate.replace(/[^0-9.-]/g, '')) / 100;
        const n = parseFloat(frequency);
        const t = parseFloat(time.replace(/[^0-9.-]/g, ''));
        
        const amount = p * Math.pow(1 + (r / n), n * t);
        const interest = amount - p;
        
        document.getElementById('compoundResult').innerHTML = `
            <h3>Compound Interest Results:</h3>
            <p>Principal: $${p.toFixed(2)}</p>
            <p>Interest Rate: ${(r * 100).toFixed(2)}%</p>
            <p>Time: ${t} years</p>
            <p>Compounding: ${getFrequencyText(n)}</p>
            <p>Interest Earned: $${interest.toFixed(2)}</p>
            <p><strong>Total Amount: $${amount.toFixed(2)}</strong></p>
        `;
    }
});

// Helper function for frequency text
function getFrequencyText(frequency) {
    switch(frequency) {
        case 1: return 'Annually';
        case 4: return 'Quarterly';
        case 12: return 'Monthly';
        case 365: return 'Daily';
        default: return `${frequency} times per year`;
    }
}

// Real-time validation on input blur
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('blur', function() {
        const errorId = this.id + 'Error';
        const fieldName = this.labels[0]?.textContent.replace(':', '') || this.id;
        
        let min = 0;
        let max = Infinity;
        
        // Set specific validation rules based on field
        if (this.id.includes('rate') || this.id === 'rate') {
            max = 100;
        }
        if (this.id.includes('principal')) {
            min = 0.01;
        }
        if (this.id.includes('time')) {
            min = 0.1;
        }
        
        const errors = validateNumber(this.value, fieldName, min, max);
        displayError(errorId, errors[0] || '');
    });
    
    // Format input on blur (optional)
    input.addEventListener('blur', function() {
        if (this.value && !isNaN(parseFloat(this.value.replace(/[^0-9.-]/g, '')))) {
            const num = parseFloat(this.value.replace(/[^0-9.-]/g, ''));
            if (this.id.includes('principal')) {
                this.value = num.toFixed(2);
            } else {
                this.value = num.toString();
            }
        }
    });
});

// Allow only numeric input (optional enhancement)
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        // Allow numbers, decimal point, and backspace
        this.value = this.value.replace(/[^0-9.]/g, '');
        
        // Prevent multiple decimal points
        const parts = this.value.split('.');
        if (parts.length > 2) {
            this.value = parts[0] + '.' + parts.slice(1).join('');
        }
    });
});