<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $code, string $message): void {
    http_response_code($code);
    echo json_encode(['message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Method not allowed.');
}
if (strlen(file_get_contents('php://input')) > 12000) respond(413, 'Message too large.');
// Hidden honeypot: acknowledge silently to discourage automated spam.
if (!empty($_POST['website'])) respond(200, 'Thank you. Your message has been submitted.');
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$topic = trim((string)($_POST['topic'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$allowedTopics = ['General inquiry', 'Programs and services', 'Donations and partnerships', 'Volunteering', 'Other'];
if ($name === '' || mb_strlen($name) > 120 || preg_match('/[\r\n]/', $name) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
    !in_array($topic, $allowedTopics, true) ||
    $message === '' || mb_strlen($message) > 4000) {
    respond(422, 'Please check the form fields and try again.');
}
$subject = 'AlSakeena Contact: ' . $topic;
$body = "New inquiry from the AlSakeena website\n\nName: " . $name .
        "\nEmail: " . $email . "\nTopic: " . $topic . "\n\nMessage:\n" . $message;
$headers = [
    'From' => 'AlSakeena Website <info@alsakeena.org>',
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'AlSakeena Contact Form'
];
if (!mail('info@alsakeena.org', $subject, $body, $headers)) {
    error_log('AlSakeena contact: PHP mail() failed.');
    respond(503, 'We could not send your message right now. Please email info@alsakeena.org directly.');
}
respond(200, 'Thank you for contacting AlSakeena. Your message has been submitted.');
