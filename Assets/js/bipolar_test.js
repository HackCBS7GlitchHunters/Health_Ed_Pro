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
            switch (selectedButton.textContent) {
                case "Yes":
                    totalScore += 1; // Score for "Yes"
                    break;
                case "No":
                    totalScore += 0; // Score for "No"
                    break;
                case "No Problem":
                    totalScore += 0; // Score for "No Problem"
                    break;
                case "Minor Problem":
                    totalScore += 1; // Score for "Minor Problem"
                    break;
                case "Moderate Problem":
                    totalScore += 2; // Score for "Moderate Problem"
                    break;
                case "Serious Problem":
                    totalScore += 3; // Score for "Serious Problem"
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

    if (score <= 5) {
        message = `<strong>Your score is ${score}/18. This indicates low levels of emotional or behavioral difficulties.</strong><br>`;
        message += "You are generally coping well, with few symptoms indicating emotional or behavioral issues. Your ability to manage stress and maintain healthy relationships is likely intact.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - Continue engaging in self-care activities, such as exercise, meditation, or hobbies that bring you joy.<br>
            - Maintain a healthy lifestyle with a balanced diet and adequate sleep.<br>
            - Consider talking to friends or family if you ever feel overwhelmed; social support is vital for mental well-being.<br>
            - Monitor your feelings regularly; if you notice changes, don’t hesitate to seek professional advice.
        `;
    } else if (score > 5 && score <= 12) {
        message = `<strong>Your score is ${score}/18. This indicates mild emotional or behavioral difficulties.</strong><br>`;
        message += "You may be experiencing some challenges that are manageable but could benefit from attention. Common symptoms may include occasional feelings of sadness, irritability, or anxiety.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - Consider establishing a daily routine that includes time for relaxation and activities you enjoy.<br>
            - Engage in physical activities; exercise is proven to enhance mood and reduce anxiety.<br>
            - Practice mindfulness or meditation to help manage stress levels.<br>
            - If feelings of sadness or anxiety persist, consider speaking with a mental health professional for guidance and support.<br>
            - Journaling your thoughts and feelings can also help you identify triggers and patterns over time.
        `;
    } else if (score > 12 && score <= 15) {
        message = `<strong>Your score is ${score}/18. This indicates moderate emotional or behavioral difficulties.</strong><br>`;
        message += "You may be experiencing noticeable challenges that could impact your daily life, such as increased irritability, difficulty concentrating, or feelings of hopelessness.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - It's advisable to seek professional support. A mental health professional can provide therapy, such as Cognitive Behavioral Therapy (CBT), which is effective for managing emotional difficulties.<br>
            - Consider discussing medication options with your healthcare provider. Medications such as SSRIs or mood stabilizers may be beneficial in managing symptoms.<br>
            - Develop a structured daily routine. Include regular sleep patterns, nutritious meals, and scheduled times for physical activity.<br>
            - Engage in social activities to reduce feelings of isolation; reach out to friends or family for support.<br>
            - Practice stress-reduction techniques, such as deep breathing exercises or yoga, to help manage anxiety.
        `;
    } else if (score > 15) {
        message = `<strong>Your score is ${score}/18. This indicates significant emotional or behavioral difficulties.</strong><br>`;
        message += "You are likely experiencing substantial challenges that may affect your relationships and daily functioning. Symptoms may include persistent feelings of sadness, severe anxiety, or withdrawal from social interactions.";
        recommendation = `
            <strong>Recommendations:</strong><br>
            - It is crucial to seek immediate help from a qualified mental health professional. They can provide a thorough assessment and develop a tailored treatment plan for you.<br>
            - Medication may be necessary to manage your symptoms effectively. Common options include mood stabilizers, antidepressants, or antipsychotics, depending on your specific situation.<br>
            - Establish a daily routine that prioritizes self-care, including regular meals, exercise, and sleep hygiene.<br>
            - Consider joining a support group where you can connect with others facing similar challenges; sharing experiences can be therapeutic.<br>
            - Engage in mindfulness practices to help ground yourself in the present moment and reduce feelings of overwhelm.<br>
            - If you experience any thoughts of self-harm or suicide, please seek immediate help from a crisis hotline or mental health professional.
        `;
    }

    message += `<br><br><p class = "recommendation_p"><strong>if you have any concerns about your Depression please do not hesitate to see a Psychological Consultant.</strong></p>`;
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