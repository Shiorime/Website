<?php
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $priority = filter_input(INPUT_POST, "priority", FILTER_VALIDATE_INT);
    $type = filter_input(INPUT_POST, "type", FILTER_VALIDATE_INT);
    $terms = filter_input(INPUT_POST, "terms", FILTER_VALIDATE_BOOL);

    if (!$terms)
    {
        die("Terms must be accepted!");
    }

    $host = "localhost";
    $dbname = "message_db";
    $username = "root";
    $password = "";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (mysqli_connect_errno())
    {
        die("Connection error: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO message (name, email, body, priority, type)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql))
    {
        die(msqli_error($conn));
    }

    mysqli_stmt_bind_param($stmt, "sssii", $name, $email, $message, $priority, $type);

    mysqli_stmt_execute($stmt);

    echo "Record saved.";