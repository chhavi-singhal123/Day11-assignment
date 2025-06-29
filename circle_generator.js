const container = document.getElementById("circleContainer");
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const circleCount = document.getElementById("circleCount");

let circles = [];
let redoStack = [];

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 70%, 60%)`;
}

function createCircle(x, y) {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.backgroundColor = getRandomColor();
    circle.style.left = `${x - 25}px`;
    circle.style.top = `${y - 25}px`;
    container.appendChild(circle);
    return circle;
}

function updateCounter() {
    circleCount.textContent = circles.length;
}

container.addEventListener("click", (e) => {
    if (e.target !== container) return;

    const circle = createCircle(e.clientX, e.clientY);
    circles.push(circle);
    redoStack = [];
    updateCounter();
});

undoBtn.addEventListener("click", () => {
    if (circles.length === 0) return;
    const lastCircle = circles.pop();
    redoStack.push(lastCircle);
    container.removeChild(lastCircle);
    updateCounter();
});

redoBtn.addEventListener("click", () => {
    if (redoStack.length === 0) return;
    const circle = redoStack.pop();
    container.appendChild(circle);
    circles.push(circle);
    updateCounter();
});

resetBtn.addEventListener("click", () => {
    circles.forEach(c => container.removeChild(c));
    circles = [];
    redoStack = [];
    updateCounter();
});
