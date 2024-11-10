// Subscribe form handling
document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with ${email}!`); // Display a thank you message
    this.reset(); // Reset the form fields
});

// Comment form handling
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const name = this.querySelector('input[type="text"]').value;
    const comment = this.querySelector('textarea').value;

    // Create a new comment element
    const commentSection = document.getElementById('comments');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<p><strong>${name}:</strong> ${comment}</p>`; // Use backticks for template literals
    commentSection.appendChild(newComment); // Add the new comment to the comment section
    this.reset(); // Reset the form fields
});

// Search functionality
document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase(); // Get the search query
    const posts = document.querySelectorAll('.post'); // Select all posts
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase(); // Get post title
        // Show or hide post based on search query
        post.style.display = title.includes(query) ? 'block' : 'none';
    });
});

// Simulate loading more posts
function loadMorePosts() {
    alert('Loading more posts...'); // Simulate loading more posts
    // Logic to load more posts can be added here
    // For example, you could append more post elements to the DOM
}

// Function to share on social media
function shareOnSocial(platform) {
    const url = window.location.href; // Get the current page URL
    let shareUrl = '';
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`; // Twitter share URL
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; // Facebook share URL
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`; // LinkedIn share URL
            break;
        default:
            alert('Unsupported platform');
            return;
    }
    window.open(shareUrl, '_blank'); // Open share URL in a new tab
}

// Additional functionality can be added below as needed