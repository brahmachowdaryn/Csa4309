<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "task_tracker_system"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if (isset($_POST['submit'])) {
    // Get form data
    $category = $_POST['category'];
    $subCategory = $_POST['subCategory'];
    $duration = $_POST['duration'];
    $task = $_POST['task'];

    // Prepare the SQL statement
    $sql = "INSERT INTO tasks (Category, Sub_Category, Duration, Task) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    // Bind parameters and execute the statement
    $stmt->bind_param("ssss", $category, $subCategory, $duration, $task);

    if ($stmt->execute()) {
        echo "New Task Added!";
        header("Location: ../traker.html"); // Redirect to your tracker page
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
