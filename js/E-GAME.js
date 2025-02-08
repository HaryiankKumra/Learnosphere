document.addEventListener("DOMContentLoaded", function() {
    const courses = document.querySelectorAll(".course-card");

    function checkScroll() {
        courses.forEach(course => {
            const rect = course.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
                course.classList.add("scrolled");
            } else {
                course.classList.remove("scrolled");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run on load
});
