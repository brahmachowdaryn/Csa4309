<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['signup'])) {
    $username = $_POST['Username'];
    $password = $_POST['Password'];
    $email = $_POST['Email'];
    $phone = $_POST['PhoneNumber'];
    $dob = $_POST['DateOfBirth'];

    $conn = new mysqli("localhost", "root", "", "task_tracker_system");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert user data into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password, email, phone, dob) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $username, $password, $email, $phone, $dob);

    if ($stmt->execute()) {
        header("Location: ../traker.html"); // Redirects to tracker page upon successful signup
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
