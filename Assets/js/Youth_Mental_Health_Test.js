// Get all test question containers
const testQuestions = document.querySelectorAll('.test-questions .options');

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
                case "Never":
                    totalScore += 0; // Score for "Never"
                    break;
                case "Sometimes":
                    totalScore += 1; // Score for "Sometimes"
                    break;
                case "Often":
                    totalScore += 2; // Score for "Often"
                    break;
                case "No":
                    totalScore += 0; // Score for "No"
                    break;
                case "Yes":
                    totalScore += 1; // Score for "Yes"
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

    if (score <= 10) {
        message = `<strong>Your score is ${score}. This indicates low levels of emotional or behavioral difficulties.</strong><br>`;
        message += "You are generally coping well, with few symptoms indicating emotional or behavioral issues.";
    } else if (score > 10 && score <= 20) {
        message = `<strong>Your score is ${score}. This indicates mild emotional or behavioral difficulties.</strong><br>`;
        message += `
            You may be experiencing some challenges but they are manageable. Common symptoms may include:<br>
            - Occasional feelings of sadness or irritability.<br>
            - Mild anxiety or restlessness.<br>
        `;
        recommendation = `
            <br>
            * <strong>Self-Care:</strong> Engage in activities that promote relaxation and well-being, such as exercise or hobbies.<br>
            * <strong>Talk to Someone:</strong> Consider discussing your feelings with a trusted friend or family member.<br>
            * <strong>Monitor Your Feelings:</strong> Keep track of your feelings and consider seeking professional help if they persist or worsen.<br>
        `;
    } else if (score > 20 && score <= 30) {
        message = `<strong>Your score is ${score}. This indicates moderate emotional or behavioral difficulties.</strong><br>`;
        message += `
            You may be experiencing noticeable challenges that could impact your daily life. Common symptoms may include:<br>
            - Frequent feelings of sadness or anxiety.<br>
            - Difficulty concentrating or making decisions.<br>
        `;
        recommendation = `
            <br>
            * <strong>Consider Professional Support:</strong> It may be beneficial to speak with a mental health professional for guidance.<br>
            * <strong>Practice Mindfulness:</strong> Techniques such as meditation or yoga can help manage stress and anxiety.<br>
            * <strong>Develop Coping Strategies:</strong> Identify triggers and develop strategies to cope with them effectively.<br>
        `;
    } else if (score > 30 && score <= 40) {
        message = `<strong>Your score is ${score}. This indicates significant emotional or behavioral difficulties.</strong><br>`;
        message += `
            You are likely experiencing substantial challenges that may affect your relationships and daily functioning. Common symptoms may include:<br>
            - Persistent feelings of sadness or hopelessness.<br>
            - Increased irritability or anger.<br>
            - Social withdrawal or avoidance of activities.<br>
        `;
        recommendation = `
            <br>
            * <strong>Seek Professional Help:</strong> It is advisable to consult a mental health professional for further assessment and support.<br>
            * <strong>Therapeutic Approaches:</strong> Consider therapies such as Cognitive Behavioral Therapy (CBT) or other evidence-based treatments.<br>
            * <strong>Build a Support Network:</strong> Surround yourself with supportive friends and family who understand what you are going through.<br>
        `;
    } else {
        message = `<strong>Your score is ${score}. This indicates severe emotional or behavioral difficulties.</strong><br>`;
        message += `
            You may be experiencing significant distress that severely impacts your daily life. Common symptoms may include:<br>
            - Intense feelings of sadness or despair.<br>
            - Severe anxiety or panic attacks.<br>
            - Difficulty functioning in daily activities or maintaining relationships.<br>
        `;
        recommendation = `
            <br>
            * <strong>Immediate Professional Help:</strong> It is crucial to seek immediate help from a qualified mental health professional.<br>
            * <strong>Intensive Therapy:</strong> Explore intensive therapy options tailored to your needs.<br>
            * <strong>Medication Consultation:</strong> Discuss medication options with your healthcare provider to manage symptoms effectively.<br>
            * <strong>Support Groups:</strong> Consider joining support groups for individuals facing similar challenges.<br>
        `;
    }
    return message + `<br><strong>Recommendations:</strong> ${recommendation}`;
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