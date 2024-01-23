<?php

require '../../classes/User.php';

$user = new User;
$data = $user->all();

echo json_encode(['data' => $data]);