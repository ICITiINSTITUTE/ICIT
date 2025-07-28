<?php
// यह सुनिश्चित करें कि यह स्क्रिप्ट केवल POST अनुरोधों को स्वीकार करे
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // इनपुट डेटा को सैनिटाइज़ करें
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // एक त्रुटि सरणी आरंभ करें
    $errors = [];

    // बुनियादी सत्यापन
    if (empty($name)) {
        $errors[] = "Name is required.";
  