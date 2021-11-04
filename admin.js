function adminNav() {
    $(document).on('click', `.admin_nav .dashboard_admin_link`, function() {
        $('.dashboard_admin_content').removeClass('hide');
        $('.rafting_admin_content').addClass('hide');
        $('.fishing_admin_content').addClass('hide');
        $('.kayaking_admin_content').addClass('hide');
        $('.user_admin_content').addClass('hide');
    });
    $(document).on('click', `.admin_nav .rafting_admin_link`, function() {
        $('.dashboard_admin_content').addClass('hide');
        $('.rafting_admin_content').removeClass('hide');
        $('.fishing_admin_content').addClass('hide');
        $('.kayaking_admin_content').addClass('hide');
        $('.user_admin_content').addClass('hide');
    });
    $(document).on('click', `.admin_nav .fishing_admin_link`, function() {
        $('.dashboard_admin_content').addClass('hide');
        $('.rafting_admin_content').addClass('hide');
        $('.fishing_admin_content').removeClass('hide');
        $('.kayaking_admin_content').addClass('hide');
        $('.user_admin_content').addClass('hide');
    });
    $(document).on('click', `.admin_nav .kayaking_admin_link`, function() {
        $('.dashboard_admin_content').addClass('hide');
        $('.rafting_admin_content').addClass('hide');
        $('.fishing_admin_content').addClass('hide');
        $('.kayaking_admin_content').removeClass('hide');
        $('.user_admin_content').addClass('hide');
    });
    $(document).on('click', `.admin_nav .users_admin_link`, function() {
        $('.dashboard_admin_content').addClass('hide');
        $('.rafting_admin_content').addClass('hide');
        $('.fishing_admin_content').addClass('hide');
        $('.kayaking_admin_content').addClass('hide');
        $('.user_admin_content').removeClass('hide');
    });
}

//-----------------------//
//-- USER FUNCTIONS -----//
//-----------------------//
function populateUsersTable() {
let exploreGrid = document.querySelector('#user_display_table');
exploreGrid.innerHTML = '';

$.ajax({
    //url
    url: '/GRIZZLY/ajax.php',
    //data type is json
    dataType: 'json',
    type: 'POST',
    //data we are sending
    data: {
        type: 'getUsers', // => $_POST['type']
        securitykey: 'ZzRKwS2vMp6'
    },
    //function if we succeeed (data failure falls into this bucket)
    success: function(dataRetrieved) {
    console.log(dataRetrieved);
    if(dataRetrieved.error) {
        //error
        console.log('ajax error', dataRetrieved.error);
    } else {
        //success
        let objectArray = dataRetrieved.data;
        let numberOfUsers = 0;

        objectArray.forEach(function (object) {
            let userID      = object.userID;
            let username    = object.username;
            let email       = object.email;
            let permission  = object.permission;
            let token       = object.token;

            let html = `<tr data-row="${userID}">
            <td class="user_id">${userID}</td>
            <td class="username">${username}</td>
            <td class="username">${email}</td>
            <td class="user_perm" id="user_${userID}_perm">${permission}</td>
            <td>
                <button type="button" class="btn btn-outline-primary btn-sm change_permission_btn" data-perm="${permission}" data-user="${userID}">Change Permission</button>
            </td>
            <td>
                <button type="button" class="btn btn-outline-success btn-sm change_password_btn" data-user="${userID}" data-bs-toggle="modal" data-bs-target="#change_password_modal">Change Password</button>
            </td>`;
            if(permission == 'user') {
                html += `<td>
                    <button type="button" class="btn btn-outline-danger btn-sm delete_user_btn" data-user="${userID}" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
                </td>`;
            } else {
                html += `<td></td>`;
            }
            html += `</tr>`;

            exploreGrid.insertAdjacentHTML('beforeend', html);

            numberOfUsers++;
        });

        $('#users_number').html(numberOfUsers);
        $('#user_database_count').html(numberOfUsers);
    }
    },
    //function if we fail (script failure not data failure)
    error: function(dataRetrieved) {
        //error
        console.log('ajax error: ' + dataRetrieved);
    }
});
}
function changePassword() {
  $(document).on('click', `#user_display_database .change_password_btn`, function() {
      let btn = $(this);
      let userID = btn.attr('data-user');
      console.log(userID);

      //open modal
      //fill modal with inputs
      //submit modal form
      //ajax updates
      //close modal

  //   $.ajax({
  //       //url
  //       url: '/GATOR_AIRLINES/ajax.php',
  //       //data type is json
  //       dataType: 'json',
  //       type: 'POST',
  //       //data we are sending
  //       data: {
  //           type: 'getUsers', // => $_POST['type']
  //           securitykey: '123lklk',
  //           user: userID
  //       },
  //       //function if we succeeed (data failure falls into this bucket)
  //       success: function(dataRetrieved) {
  //       console.log(dataRetrieved);
  //       if(dataRetrieved.error) {
  //           //error
  //           console.log('ajax error', dataRetrieved.error);
  //       } else {
  //           //success
  //           let objectArray = dataRetrieved.data;
      
  //           objectArray.forEach(function (object) {
  //             let userID      = object.id;
  //             let username    = object.username;
  //             let password    = object.password;
  //             let permission  = object.permission;
  //             let token       = object.token;
      
  //             let html = `<tr>
  //               <td class="user_id">${userID}</td>
  //               <td class="username">${username}</td>
  //               <td class="user_pass">${password}</td>
  //               <td class="user_perm">${permission}</td>
  //               <td>
  //                   <button type="button" class="btn btn-outline-primary btn-sm" name="user_${userID}">Update</button>
  //               </td>
  //               <td>
  //                   <button type="button" class="btn btn-outline-danger btn-sm" name="user_${userID}">Delete</button>
  //               </td>
  //             </tr>`;
      
  //             let exploreGrid = document.querySelector('#user_display_table');
  //             exploreGrid.insertAdjacentHTML('beforeend', html);
  //           });
  //       }
  //       },
  //       //function if we fail (script failure not data failure)
  //       error: function(dataRetrieved) {
  //         //error
  //         console.log('ajax error: ' + dataRetrieved);
  //       }
  //   });
  });
}
function changePermission() {
  $(document).on('click', `#user_display_table .change_permission_btn`, function() {
      let btn = $(this);
      let userID = btn.attr('data-user');
      let userPerm = btn.attr('data-perm');
      console.log(`Update Perm for user: ${userID}`);

      let update_perm = '';

      if(userPerm == 'admin') {
          update_perm = 'user';
      } else if(userPerm == 'user') {
          update_perm = 'admin';
      }
      let data = {
          user_id: userID,
          user_perm: update_perm,
      };

      $.ajax({
      //url
      url: '/GRIZZLY/ajax.php',
      //data type is json
      dataType: 'json',
      type: 'POST',
      //data we are sending
      data: {
          type: 'updatePermission', // => $_POST['type']
          securitykey: 'ZzRKwS2vMp6',
          user: JSON.stringify(data)
      },
      //function if we succeeed (data failure falls into this bucket)
      success: function(dataRetrieved) {
      if(dataRetrieved.error) {
          //error
          console.log('ajax error', dataRetrieved.error);
      } else {
          //success
          let objectArray = dataRetrieved.data;
          
          userID = dataRetrieved.userID;
          userPerm = dataRetrieved.permission;

          //replace row
          $(`#user_${userID}_perm`).textContent = userPerm;

          populateUsersTable();
      }
      },
      //function if we fail (script failure not data failure)
      error: function(dataRetrieved) {
          //error
          console.log('ajax error: ' + dataRetrieved);
      }
      });
      
  });
}
function deleteUser() {
  $(document).on('click', `#user_display_table .delete_user_btn`, function() {
      let btn = $(this);
      let userID = btn.attr('data-user');
      console.log(`Delete User: ${userID}`);

      $(document).on(`click`, `#confirm_delete_btn`, function() {
      $.ajax({
          //url
          url: '/GRIZZLY/ajax.php',
          //data type is json
          dataType: 'json',
          type: 'POST',
          //data we are sending
          data: {
              type: 'deleteUser', // => $_POST['type']
              securitykey: 'ZzRKwS2vMp6',
              user: JSON.stringify(userID)
          },
          //function if we succeeed (data failure falls into this bucket)
          success: function(dataRetrieved) {
          if(dataRetrieved.error) {
              //error
              console.log('ajax error', dataRetrieved.error);
          } else {
          //close modal
          $(`#delete_modal`).modal('toggle');
          //success
          let objectArray = dataRetrieved.data;
          
          populateUsersTable();
          }
          },
          //function if we fail (script failure not data failure)
          error: function(dataRetrieved) {
          //error
          console.log('ajax error: ' + dataRetrieved);
          }
      });
      });
  });
}

//-----------------------//
//-- TRIP FUNCTIONS -----//
//-----------------------//
function populateTripTables() {
    let raftingTable = document.querySelector('#rafting_display_table');
    raftingTable.innerHTML = '';

    let fishingTable = document.querySelector('#fishing_display_table');
    fishingTable.innerHTML = '';

    let kayakingTable = document.querySelector('#kayaking_display_table');
    kayakingTable.innerHTML = '';
    
    $.ajax({
        //url
        url: '/GRIZZLY/ajax.php',
        //data type is json
        dataType: 'json',
        type: 'POST',
        //data we are sending
        data: {
            type: 'getTrips', // => $_POST['type']
            securitykey: 'ZzRKwS2vMp6'
        },
        //function if we succeeed (data failure falls into this bucket)
        success: function(dataRetrieved) {
        console.log(dataRetrieved);
        if(dataRetrieved.error) {
            //error
            console.log('ajax error // ', dataRetrieved.error);
        } else {
            //success
            let objectArray = dataRetrieved.data;
            let numberOfRaftingTrips = 0;
            let numberOfFishingTrips = 0;
            let numberOfKayakingTrips = 0;
            let html = '';
    
            objectArray.forEach(function (object) {
                let tripID      = object.tripID;
                let type        = object.type;
                let difficulty  = object.difficulty;
                let date        = object.date;
                    date = date.slice(0,10);
                    let day   = date.slice(8,10);
                    let month = parseInt(date.slice(5,7));
                    let year  = date.slice(0,4);
                let duration    = object.duration;
                let location    = object.location;
                let seats       = object.seats;
                let rSeats      = object.reservedSeats;
                let openSeats   = seats - rSeats;

                if(duration == 0) {
                    duration = 'Day Trip';
                } else {
                    duration += ' Days';
                }

                switch(month) {
                    case 1:
                        month = 'Jan';
                    break;
                    case 2:
                        month = 'Feb';
                    break;
                    case 3:
                        month = 'March';
                    break;
                    case 4:
                        month = 'April';
                    break;
                    case 5:
                        month = 'May';
                    break;
                    case 6:
                        month = 'June';
                    break;
                    case 7:
                        month = 'July';
                    break;
                    case 8:
                        month = 'Aug';
                    break;
                    case 9:
                        month = 'Sept';
                    break;
                    case 10:
                        month = 'Oct';
                    break;
                    case 11:
                        month = 'Nov';
                    break;
                    case 12:
                        month = 'Dec';
                    break;
                    default:
                        month = month;
                    break;
                }
    
                switch(type) {
                    case '1':
                    //RAFTING TABLE
                    html = `<tr data-row="${tripID}">
                    <td class="tripID">#${tripID}</td>
                    <td class="difficulty">${difficulty}</td>
                    <td class="date">${month} ${day}, ${year}</td>
                    <td class="duration">${duration}</td>
                    <td class="location">${location}</td>
                    <td class="seats">${seats}</td>
                    <td class="seats">${rSeats}</td>`;
                    if(seats > 0) {
                        html += `<td>
                            <button type="button" class="btn btn-outline-success btn-sm close_trip_btn" data-trip="${tripID}">Close Trip</button>
                        </td>`;
                    } else {
                        html += `<td>
                            <button type="button" class="btn btn-success btn-sm open_trip_btn" data-trip="${tripID}">Open Trip</button>
                        </td>`;
                    }
                    html += `<td>
                            <button type="button" class="btn btn-success btn-sm view_applicants_btn" data-trip="${tripID}" data-bs-toggle="modal" data-bs-target="#view_applicants_modal">View Applicants</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm delete_trip_btn" data-trip="${tripID}">Delete</button>
                        </td>
                    </tr>`;
    
                    raftingTable.insertAdjacentHTML('beforeend', html);
        
                    numberOfRaftingTrips++;
                    break;
                    case '2':
                    //FISHING TABLE
                    html = `<tr data-row="${tripID}">
                    <td class="tripID">#${tripID}</td>
                    <td class="date">${month} ${day}, ${year}</td>
                    <td class="duration">${duration}</td>
                    <td class="location">${location}</td>
                    <td class="seats">${seats}</td>
                    <td class="seats">${rSeats}</td>`;
                    if(seats > 0) {
                        html += `<td>
                            <button type="button" class="btn btn-outline-success btn-sm close_trip_btn" data-trip="${tripID}">Close Trip</button>
                        </td>`;
                    } else {
                        html += `<td>
                            <button type="button" class="btn btn-success btn-sm open_trip_btn" data-trip="${tripID}">Open Trip</button>
                        </td>`;
                    }
                    html += `<td>
                            <button type="button" class="btn btn-success btn-sm view_applicants_btn" data-trip="${tripID}" data-bs-toggle="modal" data-bs-target="#view_applicants_modal">View Applicants</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm delete_trip_btn" data-trip="${tripID}" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
                        </td>
                    </tr>`;
    
                    fishingTable.insertAdjacentHTML('beforeend', html);
        
                    numberOfFishingTrips++;
                    break;
                    case '3':
                    //KAYAKING TABLE
                    html = `<tr data-row="${tripID}">
                    <td class="tripID">#${tripID}</td>
                    <td class="difficulty">${difficulty}</td>
                    <td class="date">${month} ${day}, ${year}</td>
                    <td class="duration">${duration}</td>
                    <td class="location">${location}</td>
                    <td class="seats">${seats}</td>
                    <td class="seats">${rSeats}</td>`;
                    if(seats > 0) {
                        html += `<td>
                            <button type="button" class="btn btn-outline-success btn-sm close_trip_btn" data-trip="${tripID}">Close Trip</button>
                        </td>`;
                    } else {
                        html += `<td>
                            <button type="button" class="btn btn-success btn-sm open_trip_btn" data-trip="${tripID}">Open Trip</button>
                        </td>`;
                    }
                    html += `<td>
                            <button type="button" class="btn btn-success btn-sm view_applicants_btn" data-trip="${tripID}" data-bs-toggle="modal" data-bs-target="#view_applicants_modal">View Applicants</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm delete_trip_btn" data-trip="${tripID}" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
                        </td>
                    </tr>`;
    
                    kayakingTable.insertAdjacentHTML('beforeend', html);
        
                    numberOfKayakingTrips++;
                    break;
                }
            });
    
            //RAFTING DISPLAY #
            $('#rafting_number').html(numberOfRaftingTrips);
            $('#rafting_database_count').html(numberOfRaftingTrips);

            //FISHING DISPLAY #
            $('#fishing_number').html(numberOfFishingTrips);
            $('#fishing_database_count').html(numberOfFishingTrips);

            //KAYAKING DISPLAY #
            $('#kayaking_number').html(numberOfKayakingTrips);
            $('#kayaking_database_count').html(numberOfKayakingTrips);
        }
        },
        //function if we fail (script failure not data failure)
        error: function(dataRetrieved) {
            //error
            console.log('ajax error: ' + dataRetrieved);
        }
    });
}
function viewApplicants() {
  $(document).on('click', `.admin_display_database .view_applicants_btn`, function() {
    let btn = $(this);
    let trip = btn.attr('data-trip');
    btn.prop('disabled', true);
    console.log(`View Applicants for Trip ${trip}`);

    $('#applicants_display_table').html('');
    $('#noResults').addClass('hide');
    
    //CHANGE AJAX
    $.ajax({
      //url
      url: '/GRIZZLY/ajax.php',
      //type is post
      type: 'POST',
      //data type is json
      dataType: 'json',
      //the data we are sending
      data: {
          type: 'viewApplicants', //THIS WILL BE SENT TO PHP AS $_POST['type']
          trip: JSON.stringify(trip), //THIS WILL BE SENT TO PHP AS $_POST['form']
          securitykey: 'ZzRKwS2vMp6'
      },
      //dynamic we dont want cache
      cache: false,
      //function if we succeeed (data failure falls into this bucket)
      success: function(dataRetrieved) {
        // enable the button again
        btn.prop('disabled', false);
        if(dataRetrieved.error) {
            //error
            console.log('ajax error');
        } else {
            //success
            let ObjectArray = dataRetrieved.data;
            if (ObjectArray === undefined || ObjectArray.length == 0) {
              // array empty or does not exist
              $('#noResults').removeClass('hide');
            } else {
              ObjectArray.forEach( function(object) {
                let tripID      = object.tripID;
                let appID       = object.appID;
                let username    = object.username;
                let email       = object.email;
                let spots       = object.spots;

                //modal html
                $('#tripNumberTitle').html(tripID);

                html = `<tr>
                          <td>${appID}</td>
                          <td>${username}</td>
                          <td>${email}</td>
                          <td>${spots}</td>
                      </tr>`;

                let table = document.getElementById('applicants_display_table');
                table.insertAdjacentHTML('beforeend',html);

                //open modal
                $('#view_applicants_modal').modal('show');
              });
            }
        }
      },
      //function if we fail (script failure not data failure)
      error: function(dataRetrieved) {
        //error
        console.log('ajax error' + dataRetrieved);
        
        //enable the button again
        btn.prop('disabled', false);
      }
    });
  });
}

function closeTrip() {
    $(document).on('click', `.admin_display_database .close_trip_btn`, function() {
      let btn = $(this);
      let trip = btn.attr('data-trip');
      btn.prop('disabled', true);
      console.log(`Trip ${trip} Closed`);
      
      //CHANGE AJAX
      $.ajax({
        //url
        url: '/GRIZZLY/ajax.php',
        //type is post
        type: 'POST',
        //data type is json
        dataType: 'json',
        //the data we are sending
        data: {
            type: 'closeTrip', //THIS WILL BE SENT TO PHP AS $_POST['type']
            trip: JSON.stringify(trip), //THIS WILL BE SENT TO PHP AS $_POST['form']
            securitykey: 'ZzRKwS2vMp6'
        },
        //dynamic we dont want cache
        cache: false,
        //function if we succeeed (data failure falls into this bucket)
        success: function(dataRetrieved) {
        // enable the button again
        btn.prop('disabled', false);
        if(dataRetrieved.error) {
            //error
            console.log('ajax error');
        } else {
            //success
            populateTripTables();
        }
        },
        //function if we fail (script failure not data failure)
        error: function(dataRetrieved) {
        //error
        console.log('ajax error' + dataRetrieved);
        
        //enable the button again
        btn.prop('disabled', false);
        }
      });
    });
}
function openTrip() {
    $(document).on('click', `.admin_display_database .open_trip_btn`, function() {
      let btn = $(this);
      btn.prop('disabled', true);
      let trip = btn.attr('data-trip');
      console.log(`Trip ${trip} Open`);

      //que modal with input for seat number
      $(`#seats_input_modal`).modal('show');
      //submit btn on seat # modal
      $(document).on(`click`, `#seats_submit`, function() {
        let btn = $(this);
        btn.prop('disabled', true);
        let error = false;

        if($(`#numberOfSeats`).val() == '' || $(`#numberOfSeats`).val() == undefined) { 
            btn.prop('disabled', false); 
            error = true; 
        }

        //if no error
        if(!error) {
            let data = {
                trip: trip,
                seats: $('#numberOfSeats').val().trim()
            }

            $.ajax({
                //url
                url: '/GRIZZLY/ajax.php',
                //type is post
                type: 'POST',
                //data type is json
                dataType: 'json',
                //the data we are sending
                data: {
                    type: 'openTrip', //THIS WILL BE SENT TO PHP AS $_POST['type']
                    data: JSON.stringify(data), //THIS WILL BE SENT TO PHP AS $_POST['form']
                    securitykey: 'ZzRKwS2vMp6'
                },
                //dynamic we dont want cache
                cache: false,
                //function if we succeeed (data failure falls into this bucket)
                success: function(dataRetrieved) {
                // enable the button again
                btn.prop('disabled', false);
                if(dataRetrieved.error) {
                    //error
                    console.log('ajax error');
                } else {
                    //success
                    //after successful run clear the form
                    $(`#numberOfSeats`).val('');

                    //close modal
                    $(`#seats_input_modal`).modal('hide');

                    //refresh display table
                    populateTripTables();
                }
                },
                //function if we fail (script failure not data failure)
                error: function(dataRetrieved) {
                //error
                console.log('ajax error' + dataRetrieved);
                
                //enable the button again
                btn.prop('disabled', false);
                }
            });
        }
      });

      //enable the button again
      btn.prop('disabled', false);
    });
}
function deleteTrip() {
    $(document).on('click', `.admin_display_database .delete_trip_btn`, function() {
        let btn = $(this);
        let tripID = btn.attr('data-trip');
        console.log(`Delete Trip: ${tripID}`);
    
        $(document).on(`click`, `#confirm_delete_btn`, function() {
        $.ajax({
            //url
            url: '/GRIZZLY/ajax.php',
            //data type is json
            dataType: 'json',
            type: 'POST',
            //data we are sending
            data: {
                type: 'deleteTrip', // => $_POST['type']
                securitykey: 'ZzRKwS2vMp6',
                trip: JSON.stringify(tripID)
            },
            //function if we succeeed (data failure falls into this bucket)
            success: function(dataRetrieved) {
                if(dataRetrieved.error) {
                    //error
                    console.log('ajax error', dataRetrieved.error);
                } else {
                    //close modal
                    $(`#delete_modal`).modal('toggle');
                    //success

                    console.log(dataRetrieved.success);
                    
                    populateRaftingTable();
                }
            },
            //function if we fail (script failure not data failure)
            error: function(dataRetrieved) {
                //error
                console.log('ajax error', dataRetrieved);
            }
            });
        });
    });
}

function addRaftingTrip() {
    function alertMessage(type, message) {
      let formAlert = document.getElementById(`rafting_form_alert`);
      
      if (type === 'error') {
        let html = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>${message}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        formAlert.innerHTML = html;
      }
      if (type === 'success') {
        let html = `<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>${message}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        formAlert.innerHTML = html;
        setTimeout(function() {
          formAlert.innerHTML = '';
        } , 8000);
      }
    }
    let ajaxErrorMessge = `There was a problem submitting the form. Please try again.`
  
    $(document).on('click', `#add_rafting_trip`, function() {
      console.log('button pushed');
      //assign button as a variable
      let btn = $(this);
      //assign error
      let error = false;
      //disable the  button to prevent double clicks
      btn.prop('disabled', true);
  
      //create the form as an object
      let form = {
        difficulty: $(`#add_rafting_difficulty`).val().trim(),
        date: $(`#add_rafting_date`).val().trim(),
        duration: $(`#add_rafting_duration`).val().trim(),
        location: $(`#add_rafting_location`).val().trim(),
        seats: $(`#add_rafting_seats`).val()
      };
  
      console.log(form);
  
      //check every input on the form to make sure it is not blank -->could add alert or red box etc here to notify which input is in error
      $(`#add_rafting_trip_form input`).each(function() {
        if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
      });
      $(`#add_rafting_trip_form select`).each(function() {
        if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
      });
  
  
      //if no error
      if(!error) {
        //CHANGE AJAX
        $.ajax({
          //url
          url: '/GRIZZLY/ajax.php',
          //type is post
          type: 'POST',
          //data type is json
          dataType: 'json',
          //the data we are sending
          data: {
            type: 'addRaftingTrip', //THIS WILL BE SENT TO PHP AS $_POST['type']
            form: JSON.stringify(form), //THIS WILL BE SENT TO PHP AS $_POST['form']
            securitykey: 'ZzRKwS2vMp6'
          },
          //dynamic we dont want cache
          cache: false,
          //function if we succeeed (data failure falls into this bucket)
          success: function(dataRetrieved) {
            console.log(dataRetrieved);
            // enable the button again
            btn.prop('disabled', false);
            if(dataRetrieved.error) {
                //error
                console.log('ajax error');
                alertMessage('error', ajaxErrorMessge);
            } else {
              //success
              console.log(dataRetrieved.data);
              //success message alert
              alertMessage('success', `Rafting Trip Added to the Database`);
              //asign the data
              let data = dataRetrieved.data;
              
              //after successful run clear the form
              $(`#add_rafting_trip_form input`).each(function() {
                $(this).val('');
              });
              $(`#add_rafting_trip_form select`).each(function() {
                $(this).val('');
              });
  
              //clear table
              let database = document.getElementById(`rafting_display_table`);
              database.innerHTML = '';
              //reinsert flight data into table
              populateRaftingTable();
            }
          },
          //function if we fail (script failure not data failure)
          error: function(dataRetrieved) {
            //error
            console.log('ajax error' + dataRetrieved);
            alertMessage('error', ajaxErrorMessge);
            
            //enable the button again
            btn.prop('disabled', false);
          }
        });
      } else {
        alertMessage('error', `Please Complete All Fields`);
      }
    });
}
function addFishingTrip() {
    //tie event listener to document not to element this means function can be enabled before element created
    function alertMessage(type, message) {
      let formAlert = document.getElementById(`fishing_form_alert`);
      
      if (type === 'error') {
        let html = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>${message}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        formAlert.innerHTML = html;
      }
      if (type === 'success') {
        let html = `<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>${message}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        formAlert.innerHTML = html;
        setTimeout(function() {
          formAlert.innerHTML = '';
        } , 8000);
      }
    }
    let ajaxErrorMessge = `There was a problem submitting the form. Please try again.`
  
    $(document).on('click', `#add_fishing_trip`, function() {
      console.log('button pushed');
      //assign button as a variable
      let btn = $(this);
      //assign error
      let error = false;
      //disable the  button to prevent double clicks
      btn.prop('disabled', true);
  
      //create the form as an object
      let form = {
        date: $(`#add_fishing_date`).val().trim(),
        duration: $(`#add_fishing_duration`).val().trim(),
        location: $(`#add_fishing_location`).val().trim(),
        seats: $(`#add_fishing_seats`).val()
      };
  
      console.log(form);
  
      //check every input on the form to make sure it is not blank -->could add alert or red box etc here to notify which input is in error
      $(`#add_fishing_trip_form input`).each(function() {
        if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
      });
      $(`#add_fishing_trip_form select`).each(function() {
        if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
      });
  
  
      //if no error
      if(!error) {
        //CHANGE AJAX
        $.ajax({
          //url
          url: '/GRIZZLY/ajax.php',
          //type is post
          type: 'POST',
          //data type is json
          dataType: 'json',
          //the data we are sending
          data: {
            type: 'addFishingTrip', //THIS WILL BE SENT TO PHP AS $_POST['type']
            form: JSON.stringify(form), //THIS WILL BE SENT TO PHP AS $_POST['form']
            securitykey: 'ZzRKwS2vMp6'
          },
          //dynamic we dont want cache
          cache: false,
          //function if we succeeed (data failure falls into this bucket)
          success: function(dataRetrieved) {
            console.log(dataRetrieved);
            // enable the button again
            btn.prop('disabled', false);
            if(dataRetrieved.error) {
                //error
                console.log('ajax error');
                alertMessage('error', ajaxErrorMessge);
            } else {
              //success
              console.log(dataRetrieved.data);
              //success message alert
              alertMessage('success', `Fishing Trip Added to the Database`);
              //asign the data
              let data = dataRetrieved.data;
              
              //after successful run clear the form
              $(`#add_fishing_trip_form input`).each(function() {
                $(this).val('');
              });
              $(`#add_fishing_trip_form select`).each(function() {
                $(this).val('');
              });
  
              //clear table
              let database = document.getElementById(`fishing_display_table`);
              database.innerHTML = '';
              //reinsert flight data into table
              populateFishingTable();
            }
          },
          //function if we fail (script failure not data failure)
          error: function(dataRetrieved) {
            //error
            console.log('ajax error' + dataRetrieved);
            alertMessage('error', ajaxErrorMessge);
            
            //enable the button again
            btn.prop('disabled', false);
          }
        });
      } else {
        alertMessage('error', `Please Complete All Fields`);
      }
    });
}
function addKayakingTrip() {
    //tie event listener to document not to element this means function can be enabled before element created
    function alertMessage(type, message) {
      let formAlert = document.getElementById(`kayaking_form_alert`);
      
      if (type === 'error') {
        let html = `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>${message}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        formAlert.innerHTML = html;
      }
      if (type === 'success') {
        let html = `<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>${message}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        formAlert.innerHTML = html;
        setTimeout(function() {
          formAlert.innerHTML = '';
        } , 8000);
      }
    }
    let ajaxErrorMessge = `There was a problem submitting the form. Please try again.`
  
    $(document).on('click', `#add_kayaking_trip`, function() {
      console.log('button pushed');
      //assign button as a variable
      let btn = $(this);
      //assign error
      let error = false;
      //disable the  button to prevent double clicks
      btn.prop('disabled', true);
  
      //create the form as an object
      let form = {
        difficulty: $(`#add_kayaking_difficulty`).val().trim(),
        date: $(`#add_kayaking_date`).val().trim(),
        duration: $(`#add_kayaking_duration`).val().trim(),
        location: $(`#add_kayaking_location`).val().trim(),
        seats: $(`#add_kayaking_seats`).val()
      };
  
      console.log(form);
  
      //check every input on the form to make sure it is not blank -->could add alert or red box etc here to notify which input is in error
      $(`#add_kayaking_trip_form input`).each(function() {
        if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
      });
      $(`#add_kayaking_trip_form select`).each(function() {
        if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
      });
  
  
      //if no error
      if(!error) {
        //CHANGE AJAX
        $.ajax({
          //url
          url: '/GRIZZLY/ajax.php',
          //type is post
          type: 'POST',
          //data type is json
          dataType: 'json',
          //the data we are sending
          data: {
            type: 'addKayakingTrip', //THIS WILL BE SENT TO PHP AS $_POST['type']
            form: JSON.stringify(form), //THIS WILL BE SENT TO PHP AS $_POST['form']
            securitykey: 'ZzRKwS2vMp6'
          },
          //dynamic we dont want cache
          cache: false,
          //function if we succeeed (data failure falls into this bucket)
          success: function(dataRetrieved) {
            console.log(dataRetrieved);
            // enable the button again
            btn.prop('disabled', false);
            if(dataRetrieved.error) {
                //error
                console.log('ajax error');
                alertMessage('error', ajaxErrorMessge);
            } else {
              //success
              console.log(dataRetrieved.data);
              //success message alert
              alertMessage('success', `Kayaking Trip Added to the Database`);
              //asign the data
              let data = dataRetrieved.data;
              
              //after successful run clear the form
              $(`#add_kayaking_trip_form input`).each(function() {
                $(this).val('');
              });
              $(`#add_kayaking_trip_form select`).each(function() {
                $(this).val('');
              });
  
              //clear table
              let database = document.getElementById(`kayaking_display_table`);
              database.innerHTML = '';
              //reinsert flight data into table
              populateKayakingTable();
            }
          },
          //function if we fail (script failure not data failure)
          error: function(dataRetrieved) {
            //error
            console.log('ajax error' + dataRetrieved);
            alertMessage('error', ajaxErrorMessge);
            
            //enable the button again
            btn.prop('disabled', false);
          }
        });
      } else {
        alertMessage('error', `Please Complete All Fields`);
      }
    });
}
