<?php

function mail_utf8($to, $subject = '(Pas d\'objet)', $message = '', $headers = '') {
	$_header = 'MIME-Version: 1.0' . "\n";
	$_header .= 'Content-type: text/plain; charset=UTF-8' . "\n";
	return mail($to, '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $_header . $headers);
}

$name = $_POST['name'];
$organization = $_POST['organization'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$content = $_POST['content'];

if (!isset($name, $organization, $email, $subject, $content)) {
	echo json_encode([
		'status' => 'danger',
		'message' => 'Problème de communication avec le serveur.'
	]);
}

if (empty($name)) {
	echo json_encode([
		'status' => 'warning',
		'message' => 'Veuillez entrer votre nom.'
	]);
}
if (empty($email)) {
	echo json_encode([
		'status' => 'warning',
		'message' => 'Veuillez entrer votre email.'
	]);
}
if (empty($content)) {
	echo json_encode([
		'status' => 'warning',
		'message' => 'Veuillez saisir votre message.'
	]);
}

$to = 'ISA-L <contact@isa-l.com>';
$headers = 'From: ' . $name . ' <' . $email . '>' . "\n";
$headers .= 'Reply-To: ' . $name . ' <' . $email . '>' . "\n";
$headers .= 'Delivered-to: ' . $to . "\n";

$message = 'Ce message a été envoyé depuis isa-l.com de la part de '
		. $name . (empty($organization) ? '' : ' (' . $organization . ')') . "\n\n" . $content;

if (mail_utf8($to, $subject, $message, $headers)) {
	echo json_encode([
		'status' => 'success',
		'message' => 'Votre message a bien été envoyé.'
	]);
} else {
	echo json_encode([
		'status' => 'error',
		'message' => 'Votre message n\'pas pu être envoyé.'
	]);
}