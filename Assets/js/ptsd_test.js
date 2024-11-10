// Get all test question containers
const testQuestions = document.querySelectorAll('.test-question');

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
    showResults();
});

// --- Helper Functions ---

// Validate if all test questions are answered
function validateTestQuestions() {
    for (let i = 0; i < testQuestions.length; i++) {
        const selectedButton = testQuestions[i].querySelector('.option-button.selected');
        if (!selectedButton) {
            return false;
        }
    }
    return true;
}

// Calculate and display the results
function showResults() {
    let totalScore = calculateScore();
    resultsMessage.innerHTML = getPtdResultMessage(totalScore);
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Calculate the total score
function calculateScore() {
    let totalScore = 0;
    testQuestions.forEach((question) => {
        const selectedButton = question.querySelector('.option-button.selected');
        if (selectedButton) {
            totalScore += selectedButton.textContent === "YES" ? 1 : 0; // Increment score for "YES"
        }
    });
    return totalScore;
}

// Generate personalized result message based on PTSD score
function getPtdResultMessage(score) {
    let message = "";
    let recommendation = "";

    if (score === 0) {
        message = `<strong>Your score is ${score}/5. This indicates no exposure to traumatic events.</strong><br>`;
        message += "You have indicated that you have not experienced any traumatic events that may lead to PTSD.";
    } else if (score === 1) {
        message = `<strong>Your score is ${score}/5. This indicates very mild PTSD symptoms.</strong><br>`;
        message += `
            At this level, you may have experienced a single symptom related to trauma exposure, but it is not significantly impacting your daily life.<br>
            Common symptoms may include:<br>
            - Occasional intrusive thoughts about the traumatic event.<br>
        `;
        recommendation = `
            <br>
            * <strong>Monitor Your Feelings:</strong> Pay attention to your thoughts and feelings regarding the event.<br>
            * <strong>Talk to Someone:</strong> Consider discussing your feelings with a trusted friend or family member.<br>
            * <strong>Practice Self-Care:</strong> Engage in activities that promote well-being, such as exercise or hobbies.<br>
        `;
    } else if (score === 2) {
        message = `<strong>Your score is ${score}/5. This indicates mild PTSD symptoms.</strong><br>`;
        message += `
            You may experience some symptoms related to PTSD, but they are manageable. You might find that certain reminders of the trauma can cause discomfort.<br>
            Common symptoms include:<br>
            - Mild intrusive memories or flashbacks.<br>
            - Avoidance of reminders of the trauma.<br>
        `;
        recommendation = `
            <br>
            * <strong>Consider Professional Support:</strong> While you may be managing well, it can be beneficial to speak with a mental health professional.<br>
            * <strong>Practice Mindfulness:</strong> Techniques such as meditation or yoga can help ground you in the present moment.<br>
            * <strong>Develop Coping Strategies:</strong> Identify triggers and develop strategies to cope with them effectively.<br>
        `;
    } else if (score >= 3 && score <= 4) {
        message = `<strong>Your score is ${score}/5. This indicates moderate PTSD symptoms.</strong><br>`;
        message += `
            At this level, you may experience noticeable difficulties related to your trauma exposure. Symptoms may impact your daily activities and relationships.<br>
            Common symptoms include:<br>
            - Frequent intrusive thoughts or memories.<br>
            - Avoidance of places, people, or activities that remind you of the trauma.<br>
            - Heightened anxiety or emotional numbing.<br>
        `;
        recommendation = `
            <br>
            * <strong>Seek Professional Help:</strong> It is advisable to consult a mental health professional for further assessment and support.<br>
            * <strong>Therapeutic Approaches:</strong> Consider therapies such as Cognitive Behavioral Therapy (CBT) or Eye Movement Desensitization and Reprocessing (EMDR).<br>
            * <strong>Build a Support Network:</strong> Surround yourself with supportive friends and family who understand what you are going through.<br>
        `;
    } else {
        message = `<strong>Your score is ${score}/5. This indicates severe PTSD symptoms.</strong><br>`;
        message += `
            You are likely experiencing significant challenges related to your trauma. Symptoms may severely impact your daily functioning and relationships.<br>
            Common symptoms include:<br>
            - Persistent flashbacks or nightmares.<br>
            - Severe avoidance of reminders of the trauma.<br>
            - Heightened startle response or hypervigilance.<br>
            - Feelings of detachment from others.<br>
        `;
        recommendation = `
            <br>
            * <strong>Immediate Professional Help:</strong> It is highly recommended to seek immediate help from a qualified mental health professional who specializes in PTSD.<br>
            * <strong>Intensive Therapy:</strong> Explore intensive therapy options such as Dialectical Behavior Therapy (DBT) or other specialized treatments tailored to PTSD.<br>
            * <strong>Medication Consultation:</strong> Discuss medication options with your healthcare provider to manage symptoms effectively.<br>
            * <strong>Support Groups:</strong> Consider joining support groups for individuals with PTSD to share experiences and coping strategies.<br>
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