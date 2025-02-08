function validateCode() {
    const name = document.getElementById("name").value.trim();
    const classCode = document.getElementById("classCode").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Sample correct class codes (replace with actual data)
    const validCodes = ["ABC123", "LEARN42", "STUDENT01"];

    if (name === "" || classCode === "") {
        errorMsg.textContent = "Please enter both Name and Class Code.";
        return;
    }

    if (validCodes.includes(classCode)) {
        window.location.href = "https://your-learning-platform.com/dashboard"; // Replace with actual link
    } else {
        errorMsg.textContent = "Invalid Class Code. Please try again.";
    }
}