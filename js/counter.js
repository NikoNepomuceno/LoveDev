// Function to start the counter
function startCounter(startDate) {
    const startDateTime = new Date(startDate).getTime();

    if (isNaN(startDateTime)) {
        alert("Invalid date format. Please enter a valid date.");
        return;
    }

    // Update the counter every 1 second
    setInterval(function () {
        const now = new Date().getTime();
        let distance = now - startDateTime; // Time since the relationship started

        // Time calculations
        const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
        distance -= years * (1000 * 60 * 60 * 24 * 365.25);

        const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
        distance -= months * (1000 * 60 * 60 * 24 * 30.44);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        distance -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(distance / (1000 * 60 * 60));
        distance -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(distance / (1000 * 60));
        distance -= minutes * (1000 * 60);

        const seconds = Math.floor(distance / 1000);

        // Display the results
        document.getElementById("years").textContent = years;
        document.getElementById("months").textContent = months;
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }, 1000);
}

// Get user input and start counter
document.getElementById("startButton").addEventListener("click", function () {
    const userDate = document.getElementById("dateInput").value;
    startCounter(userDate);
});
