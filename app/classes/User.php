<?php

require_once 'QueryBuilder.php';

class User extends QueryBuilder
{
    private $userId;
    private $firstname;
    private $lastname;
    private $email;
    private $errorMessage;

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

    public function setErrorMessage($errorMessage)
    {
        $this->errorMessage = $errorMessage;
    }

    public function getErrorMessage()
    {
       return $this->errorMessage;
    }

    public function all($where_clause = null)
    {
        $query = 'SELECT * FROM users';
    
        if ($where_clause != null) {
            $x = 0;
            $parameters = [];
            foreach ($where_clause as $key => $where) {
            if ($x === 0) {
                $query .= ' WHERE ';
            } elseif ($x < 0) {
                $query .= ' AND ';
            }
    
            $query .= $key.' = ? ';
    
            array_push($parameters, $where);
            }
            $this->setParams($parameters);
        }
        $this->setQuery($query);
        return $this->getAll();
    }

    public function add()
    {
        if ($this->isNameExist()) {
            $this->setErrorMessage('Name already exists!');
            return false;
        }
        $this->setQuery('INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)');
        $this->setParams([$this->firstname, $this->lastname, $this->email]);
        return $this->executeQuery();
    }

    public function isNameExist()
    {
        $this->setQuery('SELECT id FROM users WHERE firstname = ? AND lastname = ?');
        $this->setParams([$this->firstname, $this->lastname]);
        $this->executeQuery();
        return $this->getRowCount() > 0 ? true : false;
    }
}