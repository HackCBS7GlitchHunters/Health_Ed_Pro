// Get all test question containers
const testQuestions = document.querySelectorAll('.test-question');

// Get the submit button and the next button
const nextButton = document.querySelector('.submit-button[type="button"]'); // NEXT button
const submitButton = document.querySelector('.submit-button[type="submit"]'); // SUBMIT button

// Get the optional questions section
const optionalQuestionsSection = document.querySelector('.optional-questions');

// Get the results section
const resultsSection = document.querySelector('.results-section');
const resultsMessage = document.getElementById('results-message');

// Initialize an array to hold scores
let scores = [];

// Function to handle option button clicks
const handleOptionButtonClick = (button, optionButtons) => {
    // Deselect all buttons in this question
    optionButtons.forEach((btn) => {
        btn.classList.remove('selected');
        btn.style.pointerEvents = "auto"; // Enable pointer events for all buttons
    });

    // Select the clicked button
    button.classList.add('selected');
    button.style.pointerEvents = "none"; // Disable pointer events for the selected button

    // Store the selected score
    const questionIndex = Array.from(testQuestions).indexOf(button.closest('.test-question'));
    scores[questionIndex] = parseInt(button.getAttribute('data-value'));
};

// Add event listeners to each test question's option buttons
document.querySelectorAll('.options').forEach((optionsContainer) => {
    const optionButtons = optionsContainer.querySelectorAll('.option-button');

    optionButtons.forEach((button) => {
        button.addEventListener('click', () => handleOptionButtonClick(button, optionButtons));
    });
});

// Function to calculate the total score
function calculateScore() {
    return scores.reduce((total, score) => total + (score || 0), 0);
}

// Add event listener to NEXT button
nextButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Check if all questions have been answered
    if (scores.length < testQuestions.length || scores.includes(undefined)) {
        alert('Please answer all questions before proceeding.');
        return;
    }

    // Hide test questions and show optional questions
    document.querySelector('.step').style.display = 'none';
    optionalQuestionsSection.style.display = 'block';
});

// Add event listener to SUBMIT button
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    showResults();
});

// Function to show results
function showResults() {
    const totalScore = calculateScore();
    let message = '';

    if (totalScore <= 10) {
        message = 'Your results suggest minimal OCD symptoms.';
    } else if (totalScore <= 20) {
        message = 'Your results suggest mild OCD symptoms.';
    } else if (totalScore <= 30) {
        message = 'Your results suggest moderate OCD symptoms.';
    } else {
        message = 'Your results suggest severe OCD symptoms. Consider seeking professional help.';
    }

    // Display results
    resultsMessage.textContent = message;
    optionalQuestionsSection.style.display = 'none';
    resultsSection.style.display = 'block';
}

// Optional: Handle form submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for submitting your information!');
    // You can add more functionality here, like sending data to a server
});


//    this is for  household income 

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