<?php

require_once 'QueryBuilder.php';

class User extends QueryBuilder
{
    private $userId;
    private $firstname;
    private $lastname;
    private $email;

    public function setUserID($id)
    {
        $this->userId = $id;
    }

    public function setFirstName($firstname)
    {
        $this->firstname = trim($firstname);
    }

    public function setLastName($lastname)
    {
        $this->lastname = trim($lastname);
    }

    public function setEmail($email)
    {
        $this->email = trim($email);
    }

    public function add()
    {
        $this->setQuery('INSERT INTO cms (firstname, lastname, email) VALUES (?, ?, ?)');
        $this->setParams([$this->firstname, $this->lastname, $this->email]);
        return $this->executeQuery();
    }
}