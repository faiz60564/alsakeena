<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function reply(int $status, string $message): void {
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, 'Method not allowed.');
}
if (!empty($_POST['website'])) reply(200, 'Thank you for subscribing!');
$email = trim((string)($_POST['email'] ?? ''));
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, 'Please enter a valid email address.');
}
$headers = [
    'From' => 'AlSakeena Website <info@alsakeena.org>',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'AlSakeena Updates Form'
];
$body = "A visitor requested to subscribe to AlSakeena impact reports and updates.\n\nEmail: " . $email .
        "\n\nPlease add this address to the updates mailing list when available.";
if (!mail('info@alsakeena.org', 'AlSakeena: New Updates Subscription', $body, $headers)) {
    error_log('AlSakeena subscription: PHP mail() failed.');
    reply(503, 'Subscription could not be submitted. Please try again later.');
}
reply(200, 'Thank you for subscribing! Your request has been received.');
