document.addEventListener("DOMContentLoaded", function() {
    // Get all test question containers for ED and PME
    const edQuestions = document.querySelectorAll('#questionnaire .test-question select[id^="edits"]');
    const pmeQuestions = document.querySelectorAll('#questionnaire .test-question select[id^="pedt"]');

    // Get the buttons 
    const nextButton = document.querySelector('.submit-button[type="button"]'); // NEXT button
    const skipButton = document.getElementById('skip-button'); // SKIP button
    const submitButton = document.querySelector('.submit-button[type="submit"]'); // SUBMIT button

    // Get the sections
    const optionalQuestionsSection = document.querySelector('.optional-questions');
    const resultsSection = document.querySelector('.results-section');
    const resultsMessage = document.getElementById('results-message');

    // --- Event Listeners for Navigation ---

    // NEXT button
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateTestQuestions(edQuestions)) {
            optionalQuestionsSection.style.display = 'block';
            optionalQuestionsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Please answer all the ED questions."); 
        }
    });

    // SKIP button
    skipButton.addEventListener('click', (e) => {
        e.preventDefault();
        showResults();
    });

    // SUBMIT button 
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        showResults();
    });

    // --- Helper Functions ---

    // Validate if all test questions are answered
    function validateTestQuestions(questions) {
        return Array.from(questions).every((selectElement) => {
            return selectElement.value !== "";
        });
    }

    // Calculate and display the results
    function showResults() {
        const edScore = calculateScore(edQuestions);
        const pmeScore = calculateScore(pmeQuestions);
        
        resultsMessage.innerHTML = `
            <strong>Your Results:</strong><br>
            <h3>Erectile Dysfunction (ED) Score: ${edScore}</h3>
            <h3>Premature Ejaculation (PME) Score: ${pmeScore}</h3>
            <br>${explainResults(edScore, pmeScore)}
        `;
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Calculate the total score based on responses
    function calculateScore(questions) {
        let totalScore = 0;
        questions.forEach((selectElement) => {
            totalScore += parseInt(selectElement.value);
        });
        return totalScore;
    }

    // Generate personalized result message based on scores
    function explainResults(edScore, pmeScore) {
        let message = "";
        let recommendations = "";

        // Explanation for ED
        if (edScore <= 10) {
            message += "Your ED score indicates significant difficulties with erectile function. It's advisable to consult a healthcare provider for further evaluation and support.<br>";
        } else if (edScore <= 20) {
            message += "Your ED score suggests moderate difficulties. Consider discussing treatment options with your healthcare provider.<br>";
        } else if (edScore <= 30) {
            message += "Your ED score indicates mild difficulties, but you may be managing well. Self-care strategies could be beneficial.<br>";
        } else {
            message += "Your ED score indicates a high level of satisfaction with erectile function. Keep up the good work!<br>";
        }

        // Explanation for PME
        if (pmeScore <= 10) {
            message += "Your PME score indicates significant difficulties with premature ejaculation. It is recommended to seek professional help.<br>";
        } else if (pmeScore <= 20) {
            message += "Your PME score suggests moderate difficulties. Consider exploring techniques or therapies to improve control.<br>";
        } else if (pmeScore <= 30) {
            message += "Your PME score indicates mild difficulties, but you may be able to manage well with some strategies.<br>";
        } else {
            message += "Your PME score indicates a high level of satisfaction with ejaculatory control. Great job!<br>";
        }

        // Recommendations
        recommendations += "<strong>Recommendations:</strong><br>";
        if (edScore <= 20) {
            recommendations += "* Consult a healthcare provider for treatment options.<br>";
            recommendations += "* Consider lifestyle changes such as exercise, diet, and stress management.<br>";
        }
        if (pmeScore <= 20) {
            recommendations += "* Explore behavioral techniques or therapies to improve control over ejaculation.<br>";
            recommendations += "* Communication with your partner can also help in managing expectations and experiences.<br>";
        }

        return message + recommendations;
    }
});