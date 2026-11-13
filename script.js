
// Sample questions for testing
const questions = [
    {
        question: "What is the output of 5 + 3?",
        options: ["6", "7", "8", "9"],
        answer: 2
    },
    {
        question: "Which is the brain of a computer?",
        options: ["RAM", "CPU", "Monitor", "Keyboard"],
        answer: 1
    },
    {
        question: "What is the binary equivalent of decimal 2?",
        options: ["01", "10", "11", "100"],
        answer: 1
    },
    {
        question: "Which language is used to structure web pages?",
        options: ["HTML", "Python", "C", "Java"],
        answer: 0
    },
    {
        question: "How many bits are there in one byte?",
        options: ["4", "8", "16", "32"],
        answer: 1
    }
];

let student = {};
let timeLeft = 5 * 60;
let timerInterval;
let submitted = false;
let selectedAnswers = [];

function startTest() {
    document.querySelector(".welcome").hidden = true;
    document.getElementById("student-details").hidden = false;
}

function beginTest() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const studentClass = document.getElementById("class").value.trim();

    if (!name || !roll || !studentClass) {
        alert("Please enter all student details.");
        return;
    }

    student = { name, roll, studentClass };
    selectedAnswers = new Array(questions.length).fill(null);

    document.getElementById("student-details").hidden = true;

    showQuestions();
    startTimer();
}

function showQuestions() {
    const main = document.querySelector("main");

    const exam = document.createElement("section");
    exam.id = "exam-section";

    const heading = document.createElement("h2");
    heading.textContent = "Mock Examination";

    const details = document.createElement("p");
    details.textContent =
        `Student: ${student.name} | Roll No: ${student.roll} | Class: ${student.studentClass}`;

    const timer = document.createElement("h3");
    timer.id = "timer";
    timer.textContent = "Time Left: 05:00";

    exam.append(heading, details, timer);

    questions.forEach((q, index) => {
        const block = document.createElement("div");
        block.className = "question-block";

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${q.question}`;
        block.appendChild(title);

        q.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = `question-${index}`;
            radio.value = optionIndex;

            radio.addEventListener("change", () => {
                selectedAnswers[index] = optionIndex;
            });

            label.append(radio, document.createTextNode(" " + option));
            block.appendChild(label);
        });

        exam.appendChild(block);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Test";
    submitButton.onclick = () => submitTest(false);

    exam.appendChild(submitButton);
    main.appendChild(exam);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        document.getElementById("timer").textContent =
            `Time Left: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            submitTest(true);
        }
    }, 1000);
}

function submitTest(autoSubmitted) {
    if (submitted) return;

    submitted = true;
    clearInterval(timerInterval);

    let score = 0;

    questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.answer) {
            score++;
        }
    });

    document.getElementById("exam-section").remove();

    const result = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = "Examination Completed";

    const name = document.createElement("p");
    name.textContent = `Student: ${student.name}`;

    const roll = document.createElement("p");
    roll.textContent = `Roll Number: ${student.roll}`;

    const marks = document.createElement("h3");
    marks.textContent = `Your Score: ${score} / ${questions.length}`;

    const message = document.createElement("p");
    message.textContent = autoSubmitted
        ? "Your test was automatically submitted because time expired."
        : "Your test was submitted successfully.";

    result.append(heading, name, roll, marks, message);
    document.querySelector("main").appendChild(result);
}
