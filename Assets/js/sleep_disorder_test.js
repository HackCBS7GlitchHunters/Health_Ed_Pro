// Get all test question containers
const testQuestions = document.querySelectorAll('.test-question .options');

// Get the buttons 
const nextButton = document.querySelector('.submit-button[type="button"]'); // NEXT button
const skipButton = document.getElementById('skip-button'); // SKIP button
const submitButton = document.querySelector('.submit-button[type="submit"]'); // SUBMIT button

// Get the sections
const optionalQuestionsSection = document.querySelector('.optional-questions');
const resultsSection = document.querySelector('.results-section');
const resultsMessage = document.getElementById('results-message');

// Function to handle option button clicks
const handleOptionButtonClick = (button, optionButtons) => {
    optionButtons.forEach((btn) => {
        btn.classList.remove('selected');
        btn.style.pointerEvents = "auto"; 
    });

    button.classList.add('selected');
    button.style.pointerEvents = "none"; 
};

// Add option button click listeners
document.querySelectorAll('.options').forEach((optionsContainer) => {
    const optionButtons = optionsContainer.querySelectorAll('.option-button');
    optionButtons.forEach((button) => {
        button.addEventListener('click', () => handleOptionButtonClick(button, optionButtons));
    });
});

// --- Event Listeners for Navigation ---

// NEXT button
nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateTestQuestions()) {
        optionalQuestionsSection.style.display = 'block';
        optionalQuestionsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Please answer all the test questions."); 
    }
});

// SKIP button
skipButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateTestQuestions()) { 
        showResults();
    } else {
        alert("Please answer all the test questions before skipping.");
    }
});

// SUBMIT button 
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateTestQuestions()) {
        showResults();
    } else {
        alert("Please answer all the test questions before submitting.");
    }
});

// --- Helper Functions ---

// Validate if all test questions are answered
function validateTestQuestions() {
    return Array.from(testQuestions).every((optionsContainer) => {
        return optionsContainer.querySelector('.option-button.selected') !== null;
    });
}

// Calculate and display the results
function showResults() {
    let totalScore = calculateScore();
    resultsMessage.innerHTML = getResultMessage(totalScore);
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Calculate the total score based on responses
function calculateScore() {
    let totalScore = 0;
    testQuestions.forEach((optionsContainer) => {
        const selectedButton = optionsContainer.querySelector('.option-button.selected');
        if (selectedButton) {
            // Assign scores based on the selected answer
            switch (selectedButton.getAttribute('data-value')) {
                case "Never":
                    totalScore += 0; 
                    break;
                case "Rarely":
                    totalScore += 1; 
                    break;
                case "Occasionally":
                    totalScore += 2; 
                    break;
                case "Most Nights/Days":
                    totalScore += 3; 
                    break;
                case "Always":
                    totalScore += 4; 
                    break;
            }
        }
    });
    return totalScore;
}

// Generate personalized result message based on score
function getResultMessage(score) {
    let message = "";
    let recommendation = "";

    if (score <= 16) {
        message = `<strong>Your score is ${score}/64. This indicates low levels of sleep disturbances.</strong><br>`;
        message += "You are generally coping well, with few symptoms indicating sleep issues.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - Maintain a healthy sleep routine.<br>
            - Continue engaging in self-care activities.<br>
        `;
    } else if (score > 16 && score <= 32) {
        message = `<strong>Your score is ${score}/64. This indicates mild sleep disturbances.</strong><br>`;
        message += "You may experience some challenges that could benefit from attention.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - Consider establishing a daily routine that includes relaxation time.<br>
            - Engage in physical activities.<br>
        `;
    } else if (score > 32 && score <= 48) {
        message = `<strong>Your score is ${score}/64 . This indicates moderate sleep disturbances.</strong><br>`;
        message += "You may be experiencing noticeable challenges that could impact your daily life, such as difficulty concentrating or increased irritability.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - It's advisable to seek professional support. A mental health professional can provide therapy or guidance.<br>
            - Consider discussing medication options with your healthcare provider.<br>
            - Develop a structured daily routine that includes regular sleep patterns.<br>
        `;
    } else if (score > 48) {
        message = `<strong>Your score is ${score}/64. This indicates significant sleep disturbances.</strong><br>`;
        message += "You are likely experiencing substantial challenges that may affect your daily functioning.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - It is crucial to seek immediate help from a qualified mental health professional.<br>
            - Medication may be necessary to manage your symptoms effectively.<br>
            - Establish a daily routine that prioritizes self-care, including regular meals and sleep hygiene.<br>
        `;
    }

    message += `<br><br><p class="recommendation_p"><strong>If you have any concerns about your sleep health, please do not hesitate to see a healthcare professional.</strong></p>`;
    return message + `<br>${recommendation}`;
}

// Update income options based on nationality selection
function updateIncomeOptions() {
    const nationalitySelect = document.getElementById('nationality');
    const incomeSelect = document.getElementById('householdIncome');
    const incomeDiv = document.getElementById('incomeDiv');
    incomeSelect.innerHTML = '<option value="" disabled selected>Select your household income</option>'; // Reset options

    if (nationalitySelect.value === 'Indian') {
        // Income options in Rupees
        const incomeOptions = [
            'Less than ₹25,000',
            '₹25,001 - ₹50,000',
            '₹50,001 - ₹75,000',
            '₹75,001 - ₹100,000',
            '₹100,001 - ₹150,000',
            '₹150,001 - ₹200,000',
            '₹200,001 - ₹250,000',
            'Over ₹250,000'
        ];
        incomeOptions.forEach(option => {
            incomeSelect.innerHTML += `<option value="${option}">${option}</option>`;
        });
        incomeDiv.style.display = 'block';
    } else if (nationalitySelect.value === 'Other') {
        // Income options in Dollars
        const incomeOptions = [
            'Less than $25,000',
            '$25,001 - $50,000',
            '$50,001 - $75,000',
            '$75,001 - $100,000',
            '$100,001 - $150,000',
            '$150,001 - $200,000',
            '$200,001 - $250,000',
            'Over $250,000'
        ];
        incomeOptions.forEach(option => {
            incomeSelect.innerHTML += `<option value="${option}">${option}</option>`;
        });
        incomeDiv.style.display = 'block';
    } else {
        incomeDiv.style.display = 'none'; // Hide income div if no nationality is selected
    }
}