// Timer variables and filter function
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;

function filterTable() {
    const selected = document.getElementById("filter").value.toLowerCase();
    const tableRows = document.querySelectorAll(".table-body tr");
    tableRows.forEach(row => {
        const category = row.cells[0].innerText.trim().toLowerCase();
        row.style.display = (selected === "all" || category === selected) ? "table-row" : "none";
    });
}
document.getElementById("filter").addEventListener("change", filterTable);

// Stopwatch functionality
function startStopButton() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            document.getElementById('startstopbutton').innerText = 'STOP';
            let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            document.querySelector('.stopwatch').innerText = formattedTime;
        }, 1000);
    } else {
        isRunning = false;
        clearInterval(intervalId);
        document.getElementById("startstopbutton").innerText = "Start";
    }
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("startstopbutton").innerText = "Start";
    document.querySelector('.stopwatch').innerText = "00:00:00";
}

// Add Task Dynamically
document.querySelector("form[action='php/insertTask.php']").addEventListener("submit", function(event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const subCategory = document.getElementById("subCategory").value;
    const duration = document.querySelector('.stopwatch').innerText;
    const task = document.getElementById("task").value;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${category}</td>
        <td>${subCategory}</td>
        <td>${duration}</td>
        <td>${task}</td>
        <td>
            <button onclick="updateRow(this)">Update</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
    document.querySelector(".table-body").appendChild(newRow);
    document.getElementById("new-entry").reset();
    resetTimer();
});

// Update and Delete Row Functions
function updateRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
    document.getElementById("category").value = cells[0].innerText.trim();
    document.getElementById("subCategory").value = cells[1].innerText.trim();
    document.querySelector('.stopwatch').innerText = cells[2].innerText.trim();
    document.getElementById("task").value = cells[3].innerText.trim();
    row.remove();
}

function deleteRow(button) {
    button.closest("tr").remove();
}

// Login and Signup Event Listeners
document.getElementById('loginFormElement').onsubmit = function(e) {
    e.preventDefault();
    const username = document.querySelector('input[name="Username"]').value;
    const password = document.querySelector('input[name="Password"]').value;

    if (!username || !password) {
        alert("Please fill in both fields!");
        return;
    }

    fetch('php/login.php', {
        method: 'POST',
        body: new URLSearchParams({
            Username: username,
            Password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "tracker.html";
        } else {
            alert("Invalid username or password.");
        }
    })
    .catch(error => alert("Error: " + error.message));
};

document.getElementById('signupFormElement').onsubmit = function(e) {
    e.preventDefault();
    const username = document.querySelector('input[name="Username"]').value;
    const password = document.querySelector('input[name="Password"]').value;
    const email = document.querySelector('input[name="Email"]').value;
    const phone = document.querySelector('input[name="PhoneNumber"]').value;
    const dob = document.querySelector('input[name="DateOfBirth"]').value;

    if (!username || !password || !email || !phone || !dob) {
        alert("Please fill in all fields!");
        return;
    }

    fetch('php/signup.php', {
        method: 'POST',
        body: new URLSearchParams({
            Username: username,
            Password: password,
            Email: email,
            PhoneNumber: phone,
            DateOfBirth: dob
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "tracker.html";
        } else {
            alert("Error during signup: " + data.message);
        }
    })
    .catch(error => alert("Error: " + error.message));
};
