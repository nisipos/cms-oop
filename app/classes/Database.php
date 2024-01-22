<?php

class Database
{
    private $host;
    private $database;
    private $dbname;
    private $user;
    private $password;
    public $connection;

    public function __construct()
    {
        $config = parse_ini_file(dirname(__DIR__)."/config/database.ini");

        $this->setHost($config['host']);
        $this->setDatabase($config['database']);
        $this->setDBName($config['dbname']);
        $this->setUser($config['user']);
        $this->setPassword($config['password']);
        
        $this->connect();
    }

    public function connect()
    {
        try {
            $connection = new PDO("$this->database:host=$this->host;dbname=$this->dbname", $this->user, $this->password);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection = $connection;
        } catch (\Exception $e) {
            throw new Exception("Database connection error :".$e->getMessage());
        }
    }

    public function setHost($host)
    {
        $this->host = $host;
    }

    public function setDatabase($database)
    {
        $this->database = $database;
    }
    
    public function setDBName($dbname)
    {
        $this->dbname = $dbname;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }
}