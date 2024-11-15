<?php
include('db.php');

// Fetch all tasks
$sql = "SELECT * FROM tasks";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>".$row['Category']."</td>
                <td>".$row['Sub_Category']."</td>
                <td>".$row['Duration']."</td>
                <td>".$row['Task']."</td>
                <td>
                    <button onclick='updateRow(this)'>Update</button>
                    <button onclick='deleteRow(this)'>Delete</button>
                </td>
              </tr>";
    }
} else {
    echo "0 results";
}
?>
