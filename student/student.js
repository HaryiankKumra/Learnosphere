function validateCode() {
    const name = document.getElementById("name").value.trim();
    const classCode = document.getElementById("classCode").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Class code to URL mapping
    const codeToLink = {
        "ABC123": "https://your-learning-platform.com/dashboard1",
        "LEARN42": "https://your-learning-platform.com/dashboard2",
        "STUDENT01": "https://your-learning-platform.com/dashboard3"
    };

    if (name === "" || classCode === "") {
        errorMsg.textContent = "Please enter both Name and Class Code.";
        return;
    }

    if (classCode in codeToLink) {
        window.location.href = codeToLink[classCode]; // Redirect to the corresponding URL
    } else {
        errorMsg.textContent = "Invalid Class Code. Please try again.";
    }
}
