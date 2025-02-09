function validateCode() {
    const name = document.getElementById("name").value.trim();
    const classCode = document.getElementById("classCode").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Class code to URL mapping
    const codeToLink = {
        "ABC123": "https://tower-game-umber.vercel.app/",
        "LEARN42": "https://runner-build.vercel.app/",
        "STUDENT01": "https://bubble-web-iota.vercel.app/"
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
