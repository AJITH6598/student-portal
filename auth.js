document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // In a real app, you would call your login API here
                // const response = await makeRequest('/api/auth/login', 'POST', { email, password });
                // localStorage.setItem('authToken', response.token);
                
                // Simulate successful login
                localStorage.setItem('authToken', 'simulated-token');
                window.location.href = 'dashboard.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }
    
    // Signup form multi-step handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const steps = Array.from(document.querySelectorAll('.form-step'));
        let currentStep = 0;
        
        // Initialize step indicator
        const stepIndicator = document.createElement('div');
        stepIndicator.className = 'step-indicator';
        
        steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = `step ${index === 0 ? 'active' : ''}`;
            stepElement.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-title">${step.querySelector('h2').textContent}</div>
            `;
            stepIndicator.appendChild(stepElement);
        });
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        stepIndicator.appendChild(progressBar);
        
        signupForm.insertBefore(stepIndicator, signupForm.firstChild);
        
        // Update step indicator
        function updateStepIndicator() {
            const stepElements = document.querySelectorAll('.step-indicator .step');
            stepElements.forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index < currentStep) {
                    step.classList.add('completed');
                } else if (index === currentStep) {
                    step.classList.add('active');
                }
            });
            
            const progress = document.querySelector('.step-indicator .progress');
            progress.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;
        }
        
        // Next step button
        const nextButtons = document.querySelectorAll('.next-step');
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    steps[currentStep].classList.remove('active');
                    currentStep++;
                    steps[currentStep].classList.add('active');
                    updateStepIndicator();
                }
            });
        });
        
        // Previous step button
        const prevButtons = document.querySelectorAll('.prev-step');
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                steps[currentStep].classList.remove('active');
                currentStep--;
                steps[currentStep].classList.add('active');
                updateStepIndicator();
            });
        });
        
        // Form validation for each step
        function validateStep(stepIndex) {
            const step = steps[stepIndex];
            const inputs = step.querySelectorAll('input, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
                
                // Special validation for email
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('error');
                        isValid = false;
                    }
                }
                
                // Password confirmation validation
                if (input.id === 'confirmPassword' && input.value) {
                    const password = document.getElementById('password').value;
                    if (input.value !== password) {
                        input.classList.add('error');
                        isValid = false;
                        alert('Passwords do not match');
                    }
                }
            });
            
            return isValid;
        }
        
        // Final form submission
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                const formData = {
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    institutionType: document.querySelector('input[name="institutionType"]:checked').value,
                    registerNo: document.getElementById('registerNo').value,
                    department: document.getElementById('department').value,
                    semester: document.getElementById('semester').value,
                    advisorName: document.getElementById('advisorName').value,
                    password: document.getElementById('password').value
                };
                
                try {
                    // In a real app, you would call your signup API here
                    // const response = await makeRequest('/api/auth/signup', 'POST', formData);
                    // localStorage.setItem('authToken', response.token);
                    
                    // Simulate successful signup
                    localStorage.setItem('authToken', 'simulated-token');
                    localStorage.setItem('userDepartment', formData.department);
                    window.location.href = 'dashboard.html';
                } catch (error) {
                    alert(error.message);
                }
            }
        });
    }
});