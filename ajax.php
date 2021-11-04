<?php
session_start();

Require_once('includes/dataConnection.php');  
$data = new dataConnection;

$dataArray = [];

if(isset($_POST['type']) && isset($_POST['securitykey']) && $_POST['securitykey'] == 'ZzRKwS2vMp6') {

  $type = $_POST['type'];

  switch($type) {
    // FORM - REGISTER USER
    case 'registerUser':
        if(isset($_POST['form'])) {
            $form = json_decode($_POST['form']);
            
            $username        = $form->username;
            $email           = $form->email;
            $password        = $form->password;
            $permission      = $form->permission;
            $token           = $form->token;

            $titles = 'username, email, password, permission, token';
            $values = "'{$username}','{$email}','{$password}','{$permission}','{$token}'";
            $insertResult = $data->insertQuery('grizzlyUsers', $titles, $values);

            $selectAllresult = $data->selectALLQuery('grizzlyUsers', `AND username = $username`);

            while($row = mysqli_fetch_array($selectAllresult)) {
              $userID     = $row['userID'];
              $username   = $row['username'];
              $email      = $row['email'];
              $password   = $row['password'];
              $permission = $row['permission'];
              $token      = $row['token'];
            }
            //SET SESSION
            $_SESSION['id'] = $userID;
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;
            $_SESSION['permission'] = $permission;
            $_SESSION['token'] = $token;
            $_SESSION['security'] = 'cJy$e!p#3BU6';

            if($selectAllresult) {
              //success
              $dataArray['data'] = 'user added to table';
            } else {
              //failure
              $dataArray['error'] = array($insertResult, $insertQuery,$selectAllQuery, mysqli_error($data->_Link));
            }            
        } else {
            $dataArray['error'] = 'No Form Sent';
        }
    break;
    // FORM - LOGIN USER
    case 'loginUser':
        if(isset($_POST['form'])) {
            $form = json_decode($_POST['form']);
            
            $enteredUsername  = $form->username;
            $enteredPassword  = $form->password;
            $stayLogin        = $form->stayLogin;

            $selectAllresult = $data->selectAllQuery('grizzlyUsers',"AND username='$enteredUsername'");

            while($row = mysqli_fetch_array($selectAllresult)) {
              $userID     = $row['userID'];
              $username   = $row['username'];
              $email      = $row['email'];
              $password   = $row['password'];
              $permission = $row['permission'];
              $token      = $row['token'];
            }

            if($enteredUsername == $username && $enteredPassword == $password) {
              //success
              //start user session - stay logged in?
              $_SESSION['id'] = $userID;
              $_SESSION['username'] = $username;
              $_SESSION['permission'] = $permission;
              $_SESSION['email'] = $email;
              $_SESSION['token'] = $token;
              $_SESSION['security'] = 'cJy$e!p#3BU6';
              if($stayLogin == true) {
                  setcookie('userID', $userID, time() + (86400 * 30));
              } else {
                setcookie('userID', $userID, time() + (86400 * 30));
              }
              //save data to dataArray
              $dataArray['data'] = 'User Login CONFIRMED';
              $dataArray['userID'] = $userID;
              $dataArray['username'] = $username;
              $dataArray['permission'] = $permission;
            } else {
              //failure
              $dataArray['error'] = array($selectAllresult, $selectAllQuery, mysqli_error($data->_Link), 'User Login REJECTED');

              if($enteredUsername !== $username) {
                  $dataArray['incorrect'] = 'Username';
              }
              if($enteredPassword !== $password) {
                  $dataArray['incorrect'] += 'Password';
              }
            }
        } else {
            $dataArray['error'] = 'No Form Sent';
        }
    break;
    // DISPLAY USERS DATABASE
    case 'getUsers':
        $selectAllresult = $data->selectAllQuery('grizzlyUsers','ORDER BY permission ASC, userID ASC');

        $rVal = array();
        while($row = mysqli_fetch_array($selectAllresult)) {
            $rVal[] = $row;
        }

        if($selectAllresult) {
            //this is how we return the dataarray echo the data
            $dataArray['success'] = 'Users Table Retrieval Complete';
            $dataArray['data'] = $rVal;
            $dataArray['resultNumber'] = mysqli_num_rows($rVal);
        } else {
            $dataArray['error'] = 'Users Table Retrieval Failure';
        }
    break;
    // DISPLAY USERS DATABASE
    case 'getSpecificUser':
      if(isset($_POST['userID'])) {
        $userID = $_POST['userID'];

        $selectAllresult = $data->selectAllQuery('grizzlyUsers', "AND userID = $userID");

        $userInfo = array();
        while($row = mysqli_fetch_array($selectAllresult)) {
            $userInfo[] = $row;
        }

        if($selectAllresult) {
            //this is how we return the dataarray echo the data
            $dataArray['success'] = 'Users Table Retrieval Complete';
            $dataArray['data'] = $userInfo;
        } else {
            $dataArray['error'] = 'Users Table Retrieval Failure';
        }
      }
    break;
    // UPDATE USERS PERMISSION
    case 'updatePermission':
        if(isset($_POST['user'])) {
          $form = json_decode($_POST['user']);
          $userID        = $form->user_id;
          $permission    = $form->user_perm;
  
          $updateResult = $data->updateQuery('grizzlyUsers', "permission='{$permission}'", 'userID', $userID);
  
          if($updateResult) {
            //this is how we return the dataarray echo the data
            $dataArray['success'] = 'User Permission Updated';
            $dataArray['userID'] = $userID;
            $dataArray['permission'] = $permission;

            $_SESSION['permssion'] = $permission;
          } else {
            $dataArray['error'] = 'User Permission Update Failure';
          }
        }
    break;
    // DELETE USER FROM DATABASE
    case 'deleteUser':
        if(isset($_POST['user'])) {
          $userID = json_decode($_POST['user']);

          $deleteResult = $data->deletQuery('grizzlyUsers','userID',$userID);

          if($deleteResult) {
              $dataArray['success'] = `User {$userID} Successfully Deleted`;
          } else {
              $dataArray['error'] = `User {$userID} Failed to Deleted`;
          }
        }
    break;

    // CLOSE TRIP
    case 'closeTrip':
      if(isset($_POST['trip'])) {
        $tripID  = json_decode($_POST['trip']);

        $updateResult = $data->updateQuery('grizzlyTrips', "seats = '0' ", 'tripID', $tripID);

        if($updateResult) {
          $dataArray['success'] = `Trip {$tripID} Closed`;

        } else {
          $dataArray['error'] = `Trip {$tripID} Failed to Close`;
        }
      }
    break;
    // OPEN TRIP
    case 'openTrip':
      if(isset($_POST['data'])) {
        $form       = json_decode($_POST['data']);
        $tripID     = $form->trip;
        $seats      = $form->seats;

        $updateResult = $data->updateQuery('grizzlyTrips',"seats='{$seats}'",'tripID', $tripID);

        if($updateResult) {
          //this is how we return the dataarray echo the data
          $dataArray['success'] = `Trip {$tripID} Open`;

        } else {
          $dataArray['error'] = `Trip {$tripID} Failed to Open`;
        }
      }
    break;
    // FORM - DELETE TRIP FROM DATABASE
    case 'deleteTrip':
      if(isset($_POST['trip'])) {
        $tripID = json_decode($_POST['trip']);
        
        $deleteResult = $data->deleteQuery('grizzlyTrips','tripID',$tripID);

        if($deleteResult) {
            $dataArray['success'] = `Trip {$tripId} Successfully Deleted`;
        } else {
            $dataArray['error'] = `Trip {$tripId} Failed to Deleted`;
        }
      }
    break;
    // DISPLAY RAFTING TRIP DATABASE   
    case 'getTrips':
      $selectAllresult = $data->selectAllQuery("grizzlyTrips", "ORDER BY tripID DESC");

      $rVal = array();
      while($row = mysqli_fetch_array($selectAllresult)) {
          $rVal[] = $row;
      }

      if($selectAllresult) {
          $dataArray['success'] = 'Trips Retrieval Complete';
          $dataArray['data'] = $rVal;
      } else {
          $dataArray['error'] = array($selectAllresult, $selectAllQuery, mysqli_error($data->_Link), 'Trips Retrieval Failure');
      }
    break;
    case 'viewApplicants':
      if(isset($_POST['trip'])) {
        $tripID = $_POST['trip'];

        $query = "SELECT a.*, u.username FROM grizzlyapps a LEFT JOIN grizzlyUsers u ON u.userID = a.userID WHERE a.show=1 AND a.tripID = $tripID";
        $result = mysqli_query($data->_Link, $query);

        $rVal = [];
        while($row = mysqli_fetch_array($result)) {
          $rVal[] = $row;
        }

        if($result) {
          $dataArray['success'] = `All Applicants for trip $tripID Retrieved`;
          $dataArray['data'] = $rVal;
        } else {
          $dataArray['error'] = `All Applicants for trip $tripID Retrieved Failure`;
        }
      }
    break;

    // DISPLAY MYTRIPS   
    case 'getMyTrips':
      if(isset($_POST['userID'])) {
        $userID = $_POST['userID'];

        $query = "SELECT a.*, t.* FROM grizzlyapps a LEFT JOIN grizzlyTrips t ON t.tripID = a.tripID WHERE t.show=1 AND a.userID = $userID";
        $result = mysqli_query($data->_Link,$query);

        $rVal = array();
        while($row = mysqli_fetch_array($result)) {
            $rVal[] = $row;
        }

        if($result) {
            //this is how we return the dataarray echo the data
            $dataArray['success'] = 'MyTrips Table Retrieval Complete';
            $dataArray['data'] = $rVal;
        } else {
            $dataArray['error'] = 'MyTrips Table Retrieval Failure';
        }
      } else {
        $dataArray['error'] = 'MyTrips Table Unreachable';
      }
    break;
    // CHECK FOR # OF OPEN SEATS 
    case 'tripModalSeatCheck':
      if(isset($_POST['tripID'])) {
        $tripID = json_decode($_POST['tripID']);

        //CHECK QUERY TO DETEMINE IF THERE ARE ENOUGH SEATS
        $checkResult = $data->checkOpenSeatsQuery($tripID);

        while($row = mysqli_fetch_array($checkResult)) {
          $openSeats = $row['seats-reservedSeats'];
        }
        
        if($checkResult) {
          //success
          $dataArray['data'] = $openSeats;
        } else {
          //failure
          $dataArray['error'] = array($result, $query, mysqli_error($data->_Link));
        }
      } else {
        $dataArray['error'] = 'No Form Sent';
      }
    break;
    // FORM - ADD SAVED TRIPS
    case 'addSavedTrip':
      if(isset($_POST['form'])) {
        $form = json_decode($_POST['form']);
          $userID   = $form->user;
          $spots   = $form->spots;
          $trip    = $form->trip;

        //CHECK QUERY TO DETEMINE IF THERE ARE ENOUGH SEATS
        $checkResult = $data->checkOpenSeatsQuery($trip);
        while($row = mysqli_fetch_array($checkResult)) {
          $openSeats = $row['seats-reservedSeats'];
        }

        if($spots <= $openSeats) {
          //UPLOAD FORM TO grizzlyapps
          switch($spots) {
            case '1':
              $userID      = $userID;
              $trip        = $form->trip;
              $email       = $form->email;
              $firstName   = $form->firstName1;
              $lastName    = $form->lastName1;

              $titles = 'userID, tripID, spots, email, firstName1, lastName1';
              $values = "{$userID}, {$trip}, {$spots},'{$email}','{$firstName}','{$lastName}'";

              $insertResult = $data->insertQuery('grizzlyapps', $titles, $values);
            break;
            case '2':
              $userID       = $userID;
              $trip         = $form->trip;
              $email        = $form->email;
              $firstName1   = $form->firstName1;
              $lastName1    = $form->lastName1;
              $firstName2   = $form->firstName2;
              $lastName2    = $form->lastName2;

              
              // $insertQuery = "INSERT INTO grizzlyapps ('userID, tripID, spots, email, firstName1, lastName1, firstName2, lastName2') VALUES ({$userID}, {$trip}, {$spots},'{$email}','{$firstName1}','{$lastName1}','{$firstName2}','{$lastName2}')";
              // $insertResult = mysqli_query($data->_Link, $insertQuery);


              $titles = 'userID, tripID, spots, email, firstName1, lastName1, firstName2, lastName2';
              $values = "{$userID}, {$trip}, {$spots},'{$email}','{$firstName1}','{$lastName1}','{$firstName2}','{$lastName2}'";

              $insertResult = $data->insertQuery('grizzlyapps', $titles, $values);
            break;
            case '3':
              $userID       = $userID;
              $trip         = $form->trip;
              $email        = $form->email;
              $firstName1   = $form->firstName1;
              $lastName1    = $form->lastName1;
              $firstName2   = $form->firstName2;
              $lastName2    = $form->lastName2;
              $firstName3   = $form->firstName3;
              $lastName3    = $form->lastName3;

              $titles = 'userID, tripID, spots, email, firstName1, lastName1, firstName2, lastName2, firstName3, lastName3';
              $values = "{$userID}, {$trip}, {$spots},'{$email}','{$firstName1}','{$lastName1}','{$firstName2}','{$lastName2}','{$firstName3}','{$lastName3}'";

              $insertResult = $data->insertQuery('grizzlyapps', $titles, $values);
            break;
            case '4':
              $userID       = $userID;
              $trip         = $form->trip;
              $email        = $form->email;
              $firstName1   = $form->firstName1;
              $lastName1    = $form->lastName1;
              $firstName2   = $form->firstName2;
              $lastName2    = $form->lastName2;
              $firstName3   = $form->firstName3;
              $lastName3    = $form->lastName3;
              $firstName4   = $form->firstName4;
              $lastName4    = $form->lastName4;

              $titles = 'userID, tripID, spots, email, firstName1, lastName1, firstName2, lastName2, firstName3, lastName3, firstName4, lastName4';

              $values = "{$userID}, {$trip}, {$spots},'{$email}','{$firstName1}','{$lastName1}','{$firstName2}','{$lastName2}','{$firstName3}','{$lastName3}','{$firstName4}','{$lastName4}'";

              $insertResult = $data->insertQuery('grizzlyapps', $titles, $values);
            break;
          }

          //UPDATE reservedSeats in grizzlyTrips
          $updateResult = $data->updateQuery('grizzlyTrips', `reservedSeats = reservedSeats+$spots`, 'tripID', $trip);

          if($updateResult) {
            //success
            $dataArray['data'] = 'Trip Booking Complete';
          } else {
            //failure
            $dataArray['error'] = array($updateResult, $updateQuery, mysqli_error($data->_Link));
          }
        } else {
          //if there aren't enough seats
          $dataArray['tripFull'] = `There are not enough seats - OPEN SEATS: $openSeats`;
        }
      } else {
        $dataArray['error'] = 'No Form Sent';
      }
    break;
    // FORM - DELETE TRIP FROM DATABASE
    case 'deleteSavedTrip':
      if(isset($_POST['form'])) {
          $form = json_decode($_POST['form']);
            $appID  = $form->appID;
            $tripID = $form->tripID;
            $spots  = $form->spots;

          $deleteResult = $data->deleteQuery('grizzlyapps','appID',$appID);

          //UPDATE reservedSeats in grizzlyTrips
          $updateResult = $data->updateQuery('grizzlyTrips',"reservedSeats = reservedSeats-$spots", 'tripID', $tripID);

          if($updateResult) {
              $dataArray['success'] = `Saved Trip {$appID} Successfully Deleted`;
          } else {
              $dataArray['error'] = `Saved Trip {$appID} Failed to Deleted`;
          }
      }
    break;


    // FORM - ADMIN ADD RAFTING TRIP
    case 'addRaftingTrip':
      if(isset($_POST['form'])) {
        $form = json_decode($_POST['form']);
        
        $type         = 1;
        $difficulty   = $form->difficulty;
        $date         = $form->date;
        $duration     = $form->duration;
        $location     = $form->location;
        $seats        = intval($form->seats);

        $titles = 'type, difficulty, date, duration, location, seats';
        $values = "'{$type}','{$difficulty}','{$date}', '{$duration}', '{$location}', {$seats}";

        $insertResult = $data->insertQuery('grizzlyTrips', $titles, $values);

        if($insertResult) {
          //success
          $dataArray['data'] = 'form added to table';
        } else {
          //failure
          $dataArray['error'] = array($insertResult, $insertQuery, mysqli_error($data->_Link));
        }
      } else {
        $dataArray['error'] = 'No Form Sent';
      }
    break;
    // FORM - ADMIN ADD FISHING TRIP
    case 'addFishingTrip':
        if(isset($_POST['form'])) {
          $form = json_decode($_POST['form']);
          
          $type         = 2;
          $date         = $form->date;
          $duration     = $form->duration;
          $location     = $form->location;
          $seats        = intval($form->seats);
          
          $titles = 'type, date, duration, location, seats';
          $values = "'{$type}','{$date}', '{$duration}', '{$location}', {$seats}";

          $insertResult = $data->insertQuery('grizzlyTrips', $titles, $values);

          if($insertResult) {
            //success
            $dataArray['data'] = 'form added to table';
          } else {
            //failure
            $dataArray['error'] = array($insertResult, $insertQuery, mysqli_error($data->_Link));
          }
        } else {
          $dataArray['error'] = 'No Form Sent';
        }
    break;
    // FORM - ADMIN ADD KAYAKING TRIP
    case 'addKayakingTrip':
        if(isset($_POST['form'])) {
          $form = json_decode($_POST['form']);
          $type         = 3;
          $difficulty   = $form->difficulty;
          $date         = $form->date;
          $duration     = $form->duration;
          $location     = $form->location;
          $seats        = intval($form->seats);

          $titles = 'type, difficulty, date, duration, location, seats';
          $values = "'{$type}','{$difficulty}','{$date}', '{$duration}', '{$location}', {$seats}";

          $insertResult = $data->insertQuery('grizzlyTrips', $titles, $values);

          if($insertResult) {
              //success
              $dataArray['data'] = 'form added to table';
          } else {
              //failure
              $dataArray['error'] = array($insertResult, $insertQuery, mysqli_error($data->_Link));
          }
        } else {
        $dataArray['error'] = 'No Form Sent';
        }
    break;


    default:
        $dataArray['error'] = 'Failure, NO TYPE FOUND';
    break;
  }
   
} else {
  $dataArray['error'] = 'Get lost hacker';
}


echo json_encode($dataArray);

?>