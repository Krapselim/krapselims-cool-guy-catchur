const runner = document.getElementById("runner");
const scoreDisplay = document.getElementById("score");
let score = 0;

const buffer = 96; // 1 inch from screen edges

// Function to place runner at a random safe position
function placeRunnerRandom() {
    const maxX = window.innerWidth - runner.width - buffer;
    const maxY = window.innerHeight - runner.height - buffer;
    runner.style.left = Math.random() * maxX + buffer + "px";
    runner.style.top = Math.random() * maxY + buffer + "px";
}

// Initial placement
placeRunnerRandom();

// Runner flees when cursor is close
runner.addEventListener("mousemove", (e) => {
    const rect = runner.getBoundingClientRect();
    const runnerX = rect.left + rect.width / 2;
    const runnerY = rect.top + rect.height / 2;

    const dx = e.clientX - runnerX;
    const dy = e.clientY - runnerY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (distance < 150) { // flee distance
        let moveX = -dx / 2 + (Math.random() * 20 - 10);
        let moveY = -dy / 2 + (Math.random() * 20 - 10);

        let newLeft = rect.left + moveX;
        let newTop = rect.top + moveY;

        // Clamp positions to stay inside buffer
        const maxX = window.innerWidth - rect.width - buffer;
        const maxY = window.innerHeight - rect.height - buffer;
        newLeft = Math.max(buffer, Math.min(newLeft, maxX));
        newTop = Math.max(buffer, Math.min(newTop, maxY));

        runner.style.left = newLeft + "px";
        runner.style.top = newTop + "px";
    }
});

// Clicking the runner increases score and moves him safely
runner.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = "Score: " + score;

    // Move to new random position while respecting buffer
    placeRunnerRandom();
});
