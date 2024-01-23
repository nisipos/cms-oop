<?php

require '../../classes/User.php';

if ($_GET) {
    $user = new User;
    $data = $user->show($_GET['id']);
    echo json_encode($data);
}