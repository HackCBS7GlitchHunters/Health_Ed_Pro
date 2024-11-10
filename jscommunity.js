<script>
    // Function to toggle the visibility of the story text
    function toggleStoryText(button) {
        const storyText = button.previousElementSibling; // Get the paragraph before the button
        const isHidden = storyText.style.display === 'none' || storyText.style.display === '';
        
        if (isHidden) {
            storyText.style.display = 'block'; // Show the text
            button.textContent = 'Read Less'; // Change button text to 'Read Less'
        } else {
            storyText.style.display = 'none'; // Hide the text
            button.textContent = 'Read More'; // Change button text back to 'Read More'
        }
    }

    // Attach event listeners to each "Read More" button
    document.querySelectorAll('#story-form button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission
            toggleStoryText(button);
        });
    });
</script>