<?php

require '../../classes/User.php';
ini_set('display_errors', 1);
if ($_POST) {
    $user = new User;

    $user->setUserID($_POST['userId']);
    $user->setFirstName($_POST['firstName']);
    $user->setLastName($_POST['lastName']);
    $user->setEmail($_POST['email']);

    if ($user->update()) {
        exit(json_encode(['success' => true, 'message' => 'Successfuly updated user.']));
    }
    exit(json_encode(['success' => false, 'message' => $user->getErrorMessage()]));
}
echo json_encode(['status' => false, 'message' => 'Invalid access!']);