<?php

require '../../classes/User.php';

if ($_POST) {
    $user = new User;
    $user->setFirstName($_POST['firstName']);
    $user->setLastName($_POST['lastName']);
    $user->setEmail($_POST['email']);

    if ($user->add()) {
        exit(json_encode(['success' => true, 'message' => 'Successfully created user.']));
    }
    exit(json_encode(['success' => false, 'message' => 'Oops.. Something went wrong!']));
}
echo json_encode(['status' => false, 'message' => 'Invalid access!']);