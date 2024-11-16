<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Online Assignment And Grading System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            position: relative;
            animation: fadeIn 1s ease-in;
            overflow: hidden;
        }

        h2 {
            color: #4A90E2;
            font-size: 2.5em;
            margin-bottom: 20px;
            animation: slideIn 0.5s ease-out;
            position: relative;
            z-index: 1;
        }

        h3 {
            font-size: 1.5em;
            margin: 10px 0;
            animation: bounce 1s infinite alternate;
            position: relative;
            z-index: 1;
        }

        footer {
            margin-top: 20px;
            font-size: 1em; /* Adjusted for clarity */
            color: #777;
            animation: fadeIn 1s ease-in;
            position: relative;
            z-index: 1;
            text-align: center; /* Center-aligned text */
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes bounce {
            from, to { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        /* Watermark styles */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 3em; /* Adjust size as needed */
            color: rgba(0, 0, 0, 0.1); /* Light color for watermark */
            white-space: nowrap;
            pointer-events: none; /* Prevent interaction with watermark */
            z-index: 0; /* Behind other elements */
        }
    </style>
</head>
<body>
    <div class="watermark">2200030963 2200030928 2200031796</div>
    <div>
        <h2 align="center">Online Assignment and Grading System</h2>
        <h3>Backend Started and Running Successfully......</h3>
        <footer>&copy; 2024 SHV Institutions</footer>
    </div>
</body>
</html>