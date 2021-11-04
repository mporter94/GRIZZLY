<?php

class dataConnection { 
    // Construct: Open SQL
    public function __construct() {
        $this->connect();
    }

    // CONNECT TO DATABASE;
    public function connect() {
        define('DB_HOST', "216.172.168.27");
        define('DB_USER', "overlan1_mporter");
        define('DB_PASS', "on%rZnu8__px");
        define('DB_NAME', "overlan1_playground");
        $this->_Link = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    }

    // Destruct: Close SQL
    public function __destruct() {
        $this->close();
    }

    public function close() {
        if(isset($this->_Link)) {
            @mysqli_close($this->_Link); //supress php error message on close to display exit error message
            unset($this->_Link);
        }
    }

    public function processURI() {
        $page = 'rafting';

        $elements = $this->parseURI();
        //GRIZZLY/[page]
        if(strtolower($elements[0]) == 'grizzly' && isset($elements[1]) && $elements[1] != '') {
            switch(strtolower($elements[1])) {
                case 'fishing':
                    $page = 'fishing';
                break;
                case 'rafting':
                    $page = 'rafting';
                break;
                case 'kayaking':
                    $page = 'kayaking';
                break;
                case 'mytrips':
                    if(isset($_SESSION)) {
                        $page = 'myTrips';
                    } else {
                        $page = 'rafting';
                    }
                break;
                case 'admin':
                    if(isset($_SESSION['permission']) && $_SESSION['permission'] == 'admin' && isset($_SESSION['security']) && $_SESSION['security'] == 'cJy$e!p#3BU6') {
                        $page = 'admin';
                    } else {
                        $page = 'rafting';
                    }
                break;
                default:
                    $page = 'error';
                break;
            }
        }

        return $page;
    }

    //function to break uri into component elements
    public function parseURI() {
        $path = ltrim($_SERVER['REQUEST_URI'], '/'); // Trim leading slash(es)
        $path = explode('?', $path); //trim get parameters (wont affect page selection)
        $path = $path[0];
        $elements = explode('/', $path); //Split on slashes

        return $elements;
    }



    //----------------------------------//
    //--------------QUERIES-------------//
    public function checkOpenSeatsQuery($trip) {
        $checkQuery = "SELECT seats-reservedSeats FROM grizzlyTrips WHERE tripID = $trip";
        $checkResult = mysqli_query($this->_Link, $checkQuery);
        return $checkResult;
    }

    public function selectAllQuery($database, $andORorder) {
        $selectAllQuery = "SELECT * FROM $database WHERE `show`='1' $andORorder";
        $selectAllresult = mysqli_query($this->_Link, $selectAllQuery);
        return $selectAllresult;
    }

    public function selectQuery($selection, $database, $andORorder) {
        $selectQuery = "SELECT $selection FROM $database WHERE `show`='1' $andORorder";
        $selectResult = mysqli_query($this->_Link, $selectQuery);
        return $selectResult;
    }

    public function deleteQuery($database, $idType, $id) {
        $deleteQuery = "UPDATE $database SET `show`='0' WHERE $idType = $id";
        $deleteResult = mysqli_query($this->_Link, $deleteQuery);
        return $deleteResult;
    }

    public function updateQuery($database, $set, $idType, $id) {
        $updateQuery = "UPDATE $database SET $set WHERE $idType = $id";
        $updateResult = mysqli_query($this->_Link, $updateQuery);
        return $updateResult;
    }

    public function insertQuery($database, $titles, $values) {
        $insertQuery = "INSERT INTO $database ($titles) VALUES ($values)";
        $insertResult = mysqli_query($this->_Link, $insertQuery);
        return $insertResult;
    }

}

?>