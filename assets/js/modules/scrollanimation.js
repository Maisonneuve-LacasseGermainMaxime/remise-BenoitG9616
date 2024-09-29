// Function to add the 'paragraph-visible' class when the paragraph is in view
function revealOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('paragraph-visible');
            observer.unobserve(entry.target); // Stop observing once it's revealed
        }
    });
}

// Setting up the Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the paragraph is visible
    };
    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    
    // Observe each paragraph
    const paragraphs = document.querySelectorAll('.paragraph');
    paragraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });
});