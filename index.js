// function loginToApplyAlert() {
//     // let alert = document.getElementByClass('loginToApplyAlert');
//     // var bsAlert = new bootstrap.Alert(myAlert);

//     setTimeout(function(){ 
//         $('.loginToApplyAlert').fadeTo('slow',0.85);
//         console.log('alert shown');
//     }, 1500);

//     setTimeout(function(){ 
//         $('.loginToApplyAlert').fadeTo('slow',0);
//         console.log('alert hidden');
//     }, 15000);
// }

class raftingPage {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        this.userID = getCookie('userID');
        this.url = url;
        this.security = 'ZzRKwS2vMp6';
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        that.writePage(that);
        that.initiateFunctions(that);

        /*
        if(that.data == '') {
            that.loadFooterData(that);
        } else {
            console.log(that.data);
            that.writeFooter(that);
        }*/
    }

    writePage(that) {
        let html = `<div class="body_container index_page">
                        <div class="home_pic background" id="rafting_image">
                            <a href="/EDGE/"><img src="/GRIZZLY/images/edge_logo.png" class="edge_logo"></a>
                            <h3 class="edge_title">Check out our sister site!</h3>
                        </div>

                        <div class="page_text">
                            <img src="images/logo.png" class="home_logo">

                            <h2 class="est">EST. 1990</h2>

                            <p>Founded by a group of friends with a passion for the mountains and souls hungry to experience the wild, this company was built for those who are wild at heart.</p>
                        </div>

                        <div class="index_grid">
                            <div class="index_row rafting_row">
                                <div class="title_card shadow">
                                    <h1>RAFTING</h1>
                                    <img src="images/icon_rafting.png" style="height:150px;">
                                </div>
                                <div class="scroll_container">
                                    <div id="raft_trip_container" class="card_grid"></div>
                                </div>
                            </div>
                        </div>

                    </div>`;
  
        that.container.html(html);
    }
    
    initiateFunctions(that) {
        that.raftingCards(that);
        that.tripModal(that);
    }
    raftingCards(that) {
        $.ajax({
            url: this.url,
            dataType: 'json',
            type: 'POST',
            data: {
                type: 'getTrips',
                securitykey: that.security
            },
            //function if we succeeed (data failure falls into this bucket)
            success: function(dataRetrieved) {
            if(dataRetrieved.error) {
                //error
                console.log('ajax error', dataRetrieved.error);
            } else {
                //success
                let objectArray = dataRetrieved.data;
                console.log(dataRetrieved);
        
                objectArray.forEach(function (object) {
                  let tripID      = object.tripID;
                  let type        = object.type;
                  let difficulty  = object.difficulty;
                  let date        = object.date;
                      let dateEdit  = date.slice(0,10);
                      let day       = dateEdit.slice(8,10);
                      let month     = parseInt(dateEdit.slice(5,7));
                      let year      = dateEdit.slice(0,4);
                  let duration    = object.duration;
                  let location    = object.location;
                  let seats       = object.seats;
                  let rSeats      = object.reservedSeats;
                  let openSeats   = seats - rSeats;
    
                  let html = '';
      
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
                  if(type == 1) {
                    if(openSeats > 0) {
                        html = `<!-- RAFTING CARD -->
                        <div class="trip_card active" data-trip="${tripID}">
    
                            <div class="trip_card_content">
                                <div class="trip_card_info">
                                    <h2>${month} ${day}, ${year}</h2>
                                        <h3>${duration}</h3>
                                </div>
                                <div class="trip_card_info">
                                    <h2>Location</h2>
                                        <h3>${location}</h3>
                                </div>
                                <div class="trip_card_info">
                                    <h2>Difficulty</h2>
                                        <h3>${difficulty}</h3>
                                </div>
                                <div class="trip_card_info">
                                    <h2>Open Seats</h2>
                                        <h3>${openSeats} out of ${seats}</h3>
                                </div>
                            </div>
    
                            <h1 class="trip_ref_num">Trip #${tripID}</h1>
    
                            <h1 class="trip_card_title">${difficulty}</h1>
                        </div>`;
                    } else {
                        html = `<!-- RAFTING CARD -->
                        <div class="trip_card disabled" data-trip="${tripID}">
    
                            <div class="trip_card_content">
                                <div class="trip_card_info">
                                    <h2>${month} ${day}, ${year}</h2>
                                        <h3>${duration}</h3>
                                </div>
                                <div class="trip_card_info">
                                    <h2>Location</h2>
                                        <h3>${location}</h3>
                                </div>
                                <div class="trip_card_info">
                                    <h2>Difficulty</h2>
                                        <h3>${difficulty}</h3>
                                </div>
                            </div>
    
                            <h1 class="trip_ref_num">Trip #${tripID}</h1>
        
                            <h1 class="trip_card_title">${difficulty}</h1>
                        </div>`;
                    }
        
                    let raftCards = document.getElementById(`raft_trip_container`);
                    raftCards.insertAdjacentHTML('beforeend',html);
                  }
                });
            }
            },
            //function if we fail (script failure not data failure)
            error: function(dataRetrieved) {
                //error
                console.log('ajax error: ' + dataRetrieved);
            }
        });
    }
    tripModal(that) {
        $(document).on('click', '#raft_trip_container .active', function() {
            let tripID = $(this).attr('data-trip');

            //ajax call to check open seats here.
            $.ajax({
                url: that.url,
                type: 'POST',
                dataType: 'json',
                data: {
                type: 'tripModalSeatCheck',
                tripID: JSON.stringify(tripID),
                securitykey: that.security
                },
                cache: false,
                //function if we succeeed (data failure falls into this bucket)
                success: function(dataRetrieved) {
                if(dataRetrieved.error) {
                    //error
                    console.log('ajax error');
                } else {
                    //success
                    console.log(`seat check: ${parseInt(dataRetrieved.data)}`);
                    let openSeats = parseInt(dataRetrieved.data);

                    //ID's
                    let formAlertID = makeid();
                    let number_of_bookings_container = makeid();
                    let number_of_bookings_btn = makeid();
                    let applyForm = makeid();
                    let number_of_seats = makeid();
                    let number_of_applicants = makeid();
                    let app_email = makeid();
                    let apply_trip = makeid();
                    let submit_btn = makeid();

                    let person = makeid();
                    let applyBtn = makeid();
                    
                    //DETERMINE HOW MANY SEATS ARE AVAILABLE TO BOOK (MAX 4 PER APP)
                    if(openSeats > 0) {
                        if(openSeats > 4) {
                            openSeats = 4;
                        }

                        let options = `<option value="" selected>Select an Option</option>`;
                        for(let i=0; i < openSeats; i++) {
                            options += `<option value="${i+1}">${i+1}</option>`;
                        }
                        let html = `<img src="/GRIZZLY/images/icon_rafting.png" class="modal_icon">
                        <h1>Cost: $120 USD/person</h1>

                        <div id="${formAlertID}"></div>
                        <div id="${number_of_bookings_container}" class="number_of_bookings_container">
                            <div class="mb-3">
                                <label class="form-label">How many spots do you want to reserve?</label>
                                <select class="form-select" id="${number_of_seats}">
                                    ${options}
                                </select>
                            </div>
                            
                            <button class="btn btn-success" id="${number_of_bookings_btn}">Continue Your Booking</button>
                        </div>

                        <div class="applyForm hide" id="${applyForm}">
                            <div id="${number_of_applicants}"></div>

                            <div class="mb-3">
                                <label class="form-label">Email address</label>
                                <input type="email" class="form-control" id="${app_email}">
                                <div id="emailHelp" class="form-text">For updates and payment receipt.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Trip Applying For</label>
                                <input type="text" class="form-control" value="${tripID} - RAFTING" id="${apply_trip}" data-trip="${tripID}" readonly>
                            </div>

                            <div id="${submit_btn}"></div>
                            
                        </div>`;

                        let title = "<img src='/GRIZZLY/images/nav_logo.png' id='login_gator_logo'></img>";

                        let mid = buildModalSimple();
                        $(`#${mid}`).toggleClass('trip_modal');
                        $(`#${mid}Header`).html(title);
                        $(`#${mid}Body`).html(html);
                    } //DON'T NEED AN ELSE. IF TRIPS ARE 0 SEATS, THEY ARE CLOSED

                    //FORM GEN
                    $(document).on('click', `#${number_of_bookings_btn}`, function() {
                        let btn = $(this);
                        let error = false;
                        btn.prop('disabled', true);

                        let seats = $(`#${number_of_seats}`).val();
                        console.log(`# of applicants: ${seats}`);

                        $(`#${number_of_bookings_container}`).addClass('hide');
                        $(`#${applyForm}`).removeClass('hide');

                        let applicants = '';
                        for(let i = 1; i <= seats; i++) {
                            applicants += `<label>Person #${i}</label>
                                <div class="row mb-3">
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="${person}_first_name_${i}">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" id="${person}_last_name_${i}">
                                    </div>
                                </div>`;
                        };

                        let button = `<button class="btn btn-outline-success" id="${applyBtn}" data-applicants="${seats}">Book Your Trip</button>`;

                        $(`#${number_of_applicants}`).html(applicants);
                        $(`#${submit_btn}`).html(button);
                    });

                    //FORM SUBMISSION - THAT.SAVEDTRIP(THAT)
                    function alertMessage(type, message) {
                        let formAlert = document.getElementById(formAlertID);
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
                
                    //form submission
                    $(document).on('click', `#${applyBtn}`, function() {
                        console.log('button pushed');
                        let btn = $(this);
                        let error = false;
                        btn.prop('disabled', true);

                        let spots = btn.attr('data-applicants');
                        let trip = $(`#${apply_trip}`).attr('data-trip');
                        let form = "";
                    
                        switch(spots) {
                            case '1':
                                form = {
                                    user: that.userID,
                                    spots: spots,
                                    trip: trip,
                                    email: $(`#${app_email}`).val().trim(),
                                    firstName1: $(`#${person}_first_name_1`).val().trim(),
                                    lastName1: $(`#${person}_last_name_1`).val().trim(),
                                };
                            break;
                            case '2':
                                form = {
                                    user: that.userID,
                                    spots: spots,
                                    trip: trip,
                                    email: $(`#${app_email}`).val().trim(),
                                    firstName1: $(`#${person}_first_name_1`).val().trim(),
                                    lastName1: $(`#${person}_last_name_1`).val().trim(),
                                    firstName2: $(`#${person}_first_name_2`).val().trim(),
                                    lastName2: $(`#${person}_last_name_2`).val().trim(),
                                };
                            break;
                            case '3':
                                form = {
                                    user: that.userID,
                                    spots: spots,
                                    trip: trip,
                                    email: $(`#${app_email}`).val().trim(),
                                    firstName1: $(`#${person}_first_name_1`).val().trim(),
                                    lastName1: $(`#${person}_last_name_1`).val().trim(),
                                    firstName2: $(`#${person}_first_name_2`).val().trim(),
                                    lastName2: $(`#${person}_last_name_2`).val().trim(),
                                    firstName3: $(`#${person}_first_name_3`).val().trim(),
                                    lastName3: $(`#${person}_last_name_3`).val().trim(),
                                };
                            break;
                            case '4':
                                form = {
                                    user: that.userID,
                                    spots: spots,
                                    trip: trip,
                                    email: $(`#${app_email}`).val().trim(),
                                    firstName1: $(`#${person}_first_name_1`).val().trim(),
                                    lastName1: $(`#${person}_last_name_1`).val().trim(),
                                    firstName2: $(`#${person}_first_name_2`).val().trim(),
                                    lastName2: $(`#${person}_last_name_2`).val().trim(),
                                    firstName3: $(`#${person}_first_name_3`).val().trim(),
                                    lastName3: $(`#${person}_last_name_3`).val().trim(),
                                    firstName4: $(`#${person}_first_name_4`).val().trim(),
                                    lastName4: $(`#${person}_last_name_4`).val().trim(),
                                };
                            break;
                        }
                        console.log(form);
                    
                        $(`#applyForm input`).each(function() {
                            if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
                        });
                    
                    
                        if(!error) {
                            $.ajax({
                            url: that.url,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                type: 'addSavedTrip',
                                form: JSON.stringify(form),
                                securitykey: that.security
                            },
                            cache: false,
                            //function if we succeeed (data failure falls into this bucket)
                            success: function(dataRetrieved) {
                                console.log(dataRetrieved);
                                // enable the button again
                                btn.prop('disabled', false);
                                if (dataRetrieved.tripFull) {
                                    console.log(dataRetrieved.tripFull);
                                    alertMessage('error', 'There are not enough Seats. Please try again with fewer seats.');
                                } else if(dataRetrieved.error) {
                                        //error
                                        console.log('ajax error');
                                        alertMessage('error', ajaxErrorMessge);
                                } else {
                                    //success
                                    console.log(dataRetrieved.data);
                                    alertMessage('success', `You are booked! See your trips on <a href='mytrips'>MyTrips</a> Tab`);
                                    //asign the data
                                    let data = dataRetrieved.data;
                                    
                                    //after successful run clear the form
                                    $(`#applyForm input`).each(function() {
                                        $(this).val('');
                                    });
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
                },
                //function if we fail (script failure not data failure)
                error: function(dataRetrieved) {
                    //error
                    console.log('ajax error' + dataRetrieved);
                }
            });
        });
       
    }
    addSavedTrip(that) {
        function alertMessage(type, message) {
          let formAlert = document.getElementById(formAlertID);
          
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
      
        //form submission
        $(document).on('click', `#applyBtn`, function() {
          console.log('button pushed');
          let btn = $(this);
          let error = false;
          btn.prop('disabled', true);

          let spots = btn.attr('data-applicants');
          let trip = $(`#apply_trip`).attr('data-trip');
          let form = "";
    
          switch(spots) {
              case '1':
                form = {
                    spots: spots,
                    trip: trip,
                    email: $(`#app_email`).val().trim(),
                    firstName1: $('#app_first_name_1').val().trim(),
                    lastName1: $('#app_last_name_1').val().trim(),
                  };
              break;
              case '2':
                form = {
                    spots: spots,
                    trip: trip,
                    email: $(`#app_email`).val().trim(),
                    firstName1: $('#app_first_name_1').val().trim(),
                    lastName1: $('#app_last_name_1').val().trim(),
                    firstName2: $('#app_first_name_2').val().trim(),
                    lastName2: $('#app_last_name_2').val().trim(),
                  };
              break;
              case '3':
                form = {
                    spots: spots,
                    trip: trip,
                    email: $(`#app_email`).val().trim(),
                    firstName1: $('#app_first_name_1').val().trim(),
                    lastName1: $('#app_last_name_1').val().trim(),
                    firstName2: $('#app_first_name_2').val().trim(),
                    lastName2: $('#app_last_name_2').val().trim(),
                    firstName3: $('#app_first_name_3').val().trim(),
                    lastName3: $('#app_last_name_3').val().trim(),
                  };
              break;
              case '4':
                form = {
                    spots: spots,
                    trip: trip,
                    email: $(`#app_email`).val().trim(),
                    firstName1: $('#app_first_name_1').val().trim(),
                    lastName1: $('#app_last_name_1').val().trim(),
                    firstName2: $('#app_first_name_2').val().trim(),
                    lastName2: $('#app_last_name_2').val().trim(),
                    firstName3: $('#app_first_name_3').val().trim(),
                    lastName3: $('#app_last_name_3').val().trim(),
                    firstName4: $('#app_first_name_4').val().trim(),
                    lastName4: $('#app_last_name_4').val().trim(),
                  };
              break;
          }
          console.log(form);
      
          $(`#applyForm input`).each(function() {
            if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
          });
      
    
          if(!error) {
            $.ajax({
              url: that.url,
              type: 'POST',
              dataType: 'json',
              data: {
                type: 'addSavedTrip',
                form: JSON.stringify(form),
                securitykey: that.security
              },
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
                } else if (dataRetrieved.tripFull) {
                    alertMessage('error', 'There are not enough Seats. Please try again with fewer seats.');
                } else {
                  //success
                  console.log(dataRetrieved.data);
                  //success message alert
                  alertMessage('success', `You are booked! See your trips on <a href='mytrips'>MyTrips</a> Tab`);
                  //asign the data
                  let data = dataRetrieved.data;
                  
                  //after successful run clear the form
                  $(`#applyForm input`).each(function() {
                    $(this).val('');
                  });
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
}
class fishingPage {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        //this.userID = getCookie('userID');
        this.url = url;
        this.security = 'ZzRKwS2vMp6';
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        that.fishingCards(that);
        that.writePage(that);

        /*
        if(that.data == '') {
            that.loadFooterData(that);
        } else {
            console.log(that.data);
            that.writeFooter(that);
        }*/
    }

    fishingCards(that) {
        $.ajax({
            url: that.url,
            dataType: 'json',
            type: 'POST',
            data: {
                type: 'getTrips',
                securitykey: that.security
            },
            success: function(dataRetrieved) {
            if(dataRetrieved.error) {
                //error
                console.log('ajax error', dataRetrieved.error);
            } else {
                //success
                let objectArray = dataRetrieved.data;
                console.log(dataRetrieved);
        
                objectArray.forEach(function (object) {
                  let tripID      = object.tripID;
                  let type        = object.type;
                  let date        = object.date;
                      date      = date.slice(0,10);
                      let day   = date.slice(8,10);
                      let month = parseInt(date.slice(5,7));
                      let year  = date.slice(0,4);
                  let duration    = object.duration;
                  let location    = object.location;
                  let seats       = object.seats;
                  let rSeats      = object.reservedSeats;
                  let openSeats   = seats - rSeats;
                  let html = '';
      
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
                  if(type == 2) {
                    if(openSeats > 0) {
                        html = `<!-- FISHING CARD -->
                                <div class="trip_card active" data-trip="${tripID}">
                                    <div class="trip_card_content">
                                        <div class="trip_card_info">
                                            <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                        </div>
                                        <div class="trip_card_info">
                                            <h2>Type/Location</h2>
                                            <h3>${location}</h3>
                                        </div>
                                        <div class="trip_card_info">
                                            <h2>Open Seats</h2>
                                                <h3>${openSeats} out of ${seats}</h3>
                                        </div>
                                    </div>
                
                                    <h1 class="trip_ref_num">Trip #${tripID}</h1>
    
                                    <h1 class="trip_card_title">${location}</h1>
                                </div>`;
                    } else {
                        html = `<!-- FISHING CARD -->
                            <div class="trip_card disabled" data-trip="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                        <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Type/Location</h2>
                                        <h3>${location}</h3>
                                    </div>
                                </div>
    
                                <h1 class="trip_ref_num">Trip #${tripID}</h1>
    
                                <h1 class="trip_card_title">${location}</h1>
                            </div>`;
                    }
    
                    let fishingCards = document.getElementById(`fishing_trip_container`);
                    fishingCards.insertAdjacentHTML('beforeend',html);
                  }
                });
            }
            },
            //function if we fail (script failure not data failure)
            error: function(dataRetrieved) {
                //error
                console.log('ajax error: ' + dataRetrieved);
            }
        });
    }
    
    writePage(that) {
        let html = `<div class="body_container index_page">
                        <div class="home_pic background" id="fishing_image">
                            <div class="alert alert-warning loginToApplyAlert" role="alert">
                                Login to Apply for a Trip!
                            </div>
                        </div>

                        <div class="page_text">
                            <img src="images/logo.png" class="home_logo">

                            <h2 class="est">EST. 1990</h2>

                            <p>Founded by a group of friends with a passion for the mountains and souls hungry to experience the wild, this company was built for those who are wild at heart.</p>
                        </div>

                        <div class="index_grid">
                            <div class="index_row fishing_row">
                                <div class="title_card shadow">
                                    <h1>FLY FISHING</h1>
                                    <img src="images/icon_fishing.png" alt="" style="height:150px;">
                                </div>
                                <div class="scroll_container">
                                    <div id="fishing_trip_container" class="card_grid"></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>`;
                
        that.container.html(html);
    }
}
class kayakingPage {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        //this.userID = getCookie('userID');
        this.url = url;
        this.security = 'ZzRKwS2vMp6';
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        that.kayakingCards(that);
        that.writePage(that);

        /*
        if(that.data == '') {
            that.loadFooterData(that);
        } else {
            console.log(that.data);
            that.writeFooter(that);
        }*/
    }

    kayakingCards(that) {
        $.ajax({
            url: that.url,
            dataType: 'json',
            type: 'POST',
            data: {
                type: 'getTrips',
                securitykey: that.security
            },
            //function if we succeeed (data failure falls into this bucket)
            success: function(dataRetrieved) {
            if(dataRetrieved.error) {
                //error
                console.log('ajax error', dataRetrieved.error);
            } else {
                //success
                let objectArray = dataRetrieved.data;
                console.log(dataRetrieved);
        
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
                  let html = '';
      
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
                  if(type == 3) {
                    if(openSeats > 0) {
                        html = `<!-- KAYAKING CARD -->
                            <div class="trip_card active" data-trip="${tripID}">
                            
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Difficulty</h2>
                                            <h3>${difficulty}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Open Seats</h2>
                                            <h3>${openSeats} out of ${seats}</h3>
                                    </div>
                                </div>
        
                                <h1 class="trip_ref_num">Trip #${tripID}</h1>
            
                                <h1 class="trip_card_title">${difficulty}</h1>
                            </div>`;
                      } else {
                        html = `<!-- KAYAKING CARD -->
                            <div class="trip_card disabled" data-trip="${tripID}">  
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Difficulty</h2>
                                            <h3>${difficulty}</h3>
                                    </div>
                                </div>
        
                                <h1 class="trip_ref_num">Trip #${tripID}</h1>
        
                                <h1 class="trip_card_title">${difficulty}</h1>
                            </div>`;
                      }
                       
                      let kayakingCards = document.getElementById(`kayak_trip_container`);
                      kayakingCards.insertAdjacentHTML('beforeend',html);
                  }
                  
                });
            }
            },
            //function if we fail (script failure not data failure)
            error: function(dataRetrieved) {
                //error
                console.log('ajax error: ' + dataRetrieved);
            }
        });
    }
    
    writePage(that) {
        let html = `<div class="body_container index_page">
                        <div class="home_pic background" id="kayaking_image">
                            <div class="alert alert-warning loginToApplyAlert" role="alert">
                                Login to Apply for a Trip!
                            </div>
                        </div>

                        <div class="page_text">
                            <img src="images/logo.png" class="home_logo">

                            <h2 class="est">EST. 1990</h2>

                            <p>Founded by a group of friends with a passion for the mountains and souls hungry to experience the wild, this company was built for those who are wild at heart.</p>
                        </div>

                        <div class="index_grid">
                            <div class="index_row kayak_row">
                                <div class="title_card shadow">
                                    <h1>KAYAK KAMPING</h1>
                                    <img src="images/icon_kayaking.png" alt="" style="height:150px;">
                                </div>
                                <div class="scroll_container">
                                    <div id="kayak_trip_container" class="card_grid"></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>`;
                
        that.container.html(html);
    }
}
class myTripsPage {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        this.userID = getCookie('userID');
        this.url = url;
        this.security = 'ZzRKwS2vMp6';
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        
        that.writePage(that);
        that.initiateFunctions(that);

        /*
        if(that.data == '') {
            that.loadFooterData(that);
        } else {
            console.log(that.data);
            that.writeFooter(that);
        }*/
    }
    writePage(that) {
        let html = `<div class="body_container index_page">
                        <div class="home_pic background" id="trips_image"></div>

                        <div class="page_text">
                            <img src="images/bear.png" class="home_logo">

                            <h2 class="est">GRIZZLY OUTDOORS</h2>
                        </div>

                        <div class="index_grid">
                            <div class="index_row rafting_row">
                                <div class="title_card shadow">
                                    <h1>Your Saved Trips</h1>
                                    <img src="images/icon_trip.png" style="height:150px;">
                                </div>
                                <div class="scroll_container">
                                    <div id="my_trip_container" class="card_grid_container">
                                        <div id="my_trip_cards" class="card_grid"></div>
                                        <!-- PLACEHODLER - MY TRIP CARD -->
                                        <div class="trip_card placeholderCard pctwo">
                                            <h1>BROWSE<br>OUR<br>TRIPS</h1>
                                            <a href="rafting" class="btn btn-outline-light">See Rafting Trips</a>
                                            <a href="fishing" class="btn btn-outline-light">See Fishing Trips</a>
                                            <a href="kayaking" class="btn btn-outline-light">See Kayaking Trips</a>
                                        </div>
                                        <!-- PLACEHODLER - MY TRIP CARD -->
                                        <div class="trip_card placeholderCard">
                                            <img src="images/logo.png">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>`;
                
        that.container.html(html);
    }
    initiateFunctions(that) {
        that.myTripCards(that);
        that.deleteMyTrip(that);
    }

    myTripCards(that) {
        $('#my_trip_cards').html('');

        $.ajax({
            url: that.url,
            dataType: 'json',
            type: 'POST',
            data: {
                type: 'getMyTrips',
                userID: that.userID,
                securitykey: that.security
            },
            //function if we succeeed (data failure falls into this bucket)
            success: function(dataRetrieved) {
            if(dataRetrieved.error) {
                //error
                console.log('ajax error', dataRetrieved.error);
            } else {
                //success
                let objectArray = dataRetrieved.data;
                console.log(objectArray);
        
                objectArray.forEach(function (object) {
                let tripID      = object.tripID;
                let appID       = object.appID;
                let type        = object.type;
                let seats       = object.seats;
                let spots       = object.spots;
                let typeText    = '';
                let difficulty  = object.difficulty;
                let date        = object.date;
                    date = date.slice(0,10);
                    let day   = date.slice(8,10);
                    let month = parseInt(date.slice(5,7));
                    let year  = date.slice(0,4);
                let duration    = object.duration;
                let location    = object.location;
                let html = '';
    
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
                        typeText = 'rafting';

                        if(seats > 0) {
                            html = `<!-- MY TRIP CARD -->
                            <div class="trip_card mytrip_card" data-tripType="${type}" id="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Difficulty</h2>
                                            <h3>${difficulty}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Seats Reserved</h2>
                                            <h3>${spots}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <div class="btn btn-sm btn-outline-danger delete_mytrip_btn" data-spots="${spots}" data-trip="${tripID}" data-app="${appID}">Delete</div>
                                    </div>
                                </div>

                                <h1 class="trip_ref_num">App #${appID} / Trip #${tripID}</h1>

                                <h1 class="trip_card_title">
                                    <img src="images/icon_${typeText}.png" style="height:40px;transform: rotate( 
                                        90deg);">
                                    ${typeText.toUpperCase()}
                                </h1>
                            </div>`;
                        } else {
                            html = `<!-- MY TRIP CARD -->
                            <div class="trip_card mytrip_card disabled" data-tripType="${type}" id="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Difficulty</h2>
                                            <h3>${difficulty}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Seats Reserved</h2>
                                            <h3>${spots}</h3>
                                    </div>
                                </div>

                                <h1 class="trip_ref_num">THIS TRIP HAS BEEN CLOSED</h1>

                                <h1 class="trip_card_title">
                                    <img src="images/icon_${typeText}.png" style="height:40px;transform: rotate( 
                                        90deg);">
                                    ${typeText.toUpperCase()}
                                </h1>
                            </div>`;
                        }
                    break;
                    case '2':
                        typeText = 'fishing';

                        if(seats > 0) {
                            html = `<!-- MY TRIP CARD -->
                            <div class="trip_card mytrip_card" data-tripType="${type}" id="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Seats Reserved</h2>
                                            <h3>${spots}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <div class="btn btn-sm btn-outline-danger delete_mytrip_btn" data-spots="${spots}" data-trip="${tripID}" data-app="${appID}">Delete</div>
                                    </div>
                                </div>

                                <h1 class="trip_ref_num">App #${appID} / Trip #${tripID}</h1>

                                <h1 class="trip_card_title">
                                    <img src="images/icon_${typeText}.png" style="height:50px;transform: rotate( 
                                        90deg);">
                                    ${typeText.toUpperCase()}
                                </h1>
                            </div>`;
                        } else {
                            html = `<!-- MY TRIP CARD -->
                            <div class="trip_card mytrip_card disabled" data-tripType="${type}" id="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Seats Reserved</h2>
                                            <h3>${spots}</h3>
                                    </div>
                                </div>

                                <h1 class="trip_ref_num">THIS TRIP HAS BEEN CLOSED</h1>

                                <h1 class="trip_card_title">
                                    <img src="images/icon_${typeText}.png" style="height:50px;transform: rotate( 
                                        90deg);">
                                    ${typeText.toUpperCase()}
                                </h1>
                            </div>`;
                        }
                    break;
                    case '3':
                        typeText = 'kayaking';

                        if(seats > 0) {
                            html = `<!-- MY TRIP CARD -->
                            <div class="trip_card mytrip_card" data-tripType="${type}" id="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Difficulty</h2>
                                            <h3>${difficulty}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Seats Reserved</h2>
                                            <h3>${spots}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <div class="btn btn-sm btn-outline-danger delete_mytrip_btn" data-spots="${spots}" data-trip="${tripID}" data-app="${appID}">Delete</div>
                                    </div>
                                </div>

                                <h1 class="trip_ref_num">App #${appID} / Trip #${tripID}</h1>

                                <h1 class="trip_card_title">
                                    <img src="images/icon_${typeText}.png" style="height:50px;transform: rotate( 
                                        90deg);">
                                    ${typeText.toUpperCase()}
                                </h1>
                            </div>`;
                        } else {
                            html = `<!-- MY TRIP CARD -->
                            <div class="trip_card mytrip_card disabled" data-tripType="${type}" id="${tripID}">
                                <div class="trip_card_content">
                                    <div class="trip_card_info">
                                        <h2>${month} ${day}, ${year}</h2>
                                            <h3>${duration}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Location</h2>
                                            <h3>${location}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Difficulty</h2>
                                            <h3>${difficulty}</h3>
                                    </div>
                                    <div class="trip_card_info">
                                        <h2>Seats Reserved</h2>
                                            <h3>${spots}</h3>
                                    </div>
                                </div>

                                <h1 class="trip_ref_num">THIS TRIP HAS BEEN CLOSED</h1>

                                <h1 class="trip_card_title">
                                    <img src="images/icon_${typeText}.png" style="height:50px;transform: rotate( 
                                        90deg);">
                                    ${typeText.toUpperCase()}
                                </h1>
                            </div>`;
                        }
                    break;
                }

                let myTripCards = document.getElementById(`my_trip_cards`);
                myTripCards.insertAdjacentHTML('afterbegin',html);
                });
            }
            },
            //function if we fail (script failure not data failure)
            error: function(dataRetrieved) {
                //error
                console.log('ajax error: ' + dataRetrieved);
            }
        });
    }
    deleteMyTrip(that) {
        $(document).on('click', `.mytrip_card .delete_mytrip_btn`, function() {
            let btn = $(this);
            let form = {
                appID: btn.attr('data-app'),
                tripID: btn.attr('data-trip'),
                spots: btn.attr('data-spots')
            }
            console.log(`Delete App: ${form}`);
            let deleteModalID = buildModalDelete();
        
            $(document).on(`click`, `.confirm_delete_btn`, function() {
                $.ajax({
                    url: that.url,
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        type: 'deleteSavedTrip',
                        securitykey: that.security,
                        form: JSON.stringify(form)
                    },
                    success: function(dataRetrieved) {
                        if(dataRetrieved.error) {
                            //error
                            console.log('ajax error', dataRetrieved.error);
                        } else {
                            //success
                            forceCloseModal(deleteModalID);
                            let objectArray = dataRetrieved.data;
                            that.myTripCards(that);
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
}
class errorPage {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        //this.userID = getCookie('userID');
        this.url = url;
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        that.writePage(that);

        /*
        if(that.data == '') {
            that.loadFooterData(that);
        } else {
            console.log(that.data);
            that.writeFooter(that);
        }*/
    }
    
    writePage(that) {
        let html = `<div class="body_container error_page">
                        <div class="error_image">
                            <div class="error_text_container shadow">
                                <h2>404 Error</h2>
                                
                                <h3>Yeah...You're lost.</h3>
                                <h3>That page doesn't exist.</h3>
                    
                                <div class="btnContainer">
                                    <a href="/GRIZZLY/" class='btn btn-dark btn-lg'>Home</a>
                                </div>
                            </div>
                        </div>    
                    </div>`;
                
        that.container.html(html);
    }
}
class adminPage {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        this.userID = getCookie('userID');
        this.url = url;
        this.security = 'ZzRKwS2vMp6';
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        
        that.loadNavData(that);
    }
    
    loadNavData(that) {
        $.ajax({
            url: that.url,
            type: 'POST',
            dataType: 'json',
            data: {
                type: 'getSpecificUser',
                securitykey: 'ZzRKwS2vMp6',
                userID: that.userID
            },
            cache: false,
            success: function(dataRetrieved) {
                that.data = dataRetrieved.data;
                that.writePage(that);
                that.initiateFunctions();
            },
            error: function(dataRetrieved) { //if error with AJAX
                console.log(dataRetrieved); //note error to console
            }
        });
    }
    writePage(that) {
        let html = `<div class="body_container admin_page">
        <div class="admin_pic">
            <img src="/GRIZZLY/images/logo.png" class="home_logo shadow">
        </div>

        <div class="page_text">

            <h2>Welcome, ${this.data['0'].username}!</h2>

            <div class="admin_content_container">
                <ul class="nav nav-pills flex-column admin_nav shadow">
                    <li class="nav-item dashboard_admin_link">
                        <a class="nav-link">Dashboard</a>
                    </li>
                    <li class="nav-item rafting_admin_link">
                        <a class="nav-link">Rafting Trips</a>
                    </li>
                    <li class="nav-item fishing_admin_link">
                        <a class="nav-link">Fishing Trips</a>
                    </li>
                    <li class="nav-item kayaking_admin_link">
                        <a class="nav-link">Kayaking Trips</a>
                    </li>
                    <li class="nav-item users_admin_link">
                        <a class="nav-link">Users</a>
                    </li>
                </ul>

                <!-- DASHBOARD ADMIN CONTENT -->
                <div class="dashboard_admin_content table_container">
                    <div class="dashboard_item shadow">
                        <h1>RAFTING TRIPS</h1>

                        <div id="rafting_number" class="number_container">?</div>

                        <img src='/GRIZZLY/images/icon_rafting.png' style='height:10em;'>
                    </div>
                    <div class="dashboard_item shadow">
                        <h1>FISHING TRIPS</h1>

                        <div id="fishing_number" class="number_container">?</div>

                        <img src='/GRIZZLY/images/icon_fishing.png' style='height:10em;'>
                    </div>
                    <div class="dashboard_item shadow">
                        <h1>KAYAKING TRIPS</h1>

                        <div id="kayaking_number" class="number_container">?</div>

                        <img src='/GRIZZLY/images/icon_kayaking.png' style='height:10em;'>
                    </div>
                    <div class="dashboard_item shadow">
                        <h1>USERS</h1>

                        <div id="users_number" class="number_container">?</div>

                        <img src='/GRIZZLY/images/icon_users.png' style='height:10em;'>
                    </div>
                </div>
                <!-- RAFTING ADMIN CONTENT -->
                <div class="rafting_admin_content table_container hide">
                    <div class="add_rafting_trip shadow">
                        <div class="form_title">
                            <h1>Add a 
                            <img src='/GRIZZLY/images/icon_rafting.png' style='height:50px;'>
                            Trip</h1>

                            <a type="button" class="btn btn-success add_new_btn" data-bs-toggle="collapse" href="#raftingCollapse">Add New</a>
                        </div>

                        <div class="collapse" id="raftingCollapse">
                            <div id='rafting_form_alert'></div>

                            <div id="add_rafting_trip_form">
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Difficulty</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_rafting_difficulty">
                                            <option value="" selected>Select One</option>
                                            <option value="Level 1">Level 1</option>
                                            <option value="Level 2">Level 2</option>
                                            <option value="Level 3">Level 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Date</label>
                                    <div class="col-10">
                                        <input type="date" class="form-control" id="add_rafting_date">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Trip Length</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_rafting_duration">
                                            <option value="" selected>Select One</option>
                                            <option value="0">Day Trip</option>
                                            <option value="2">2 Days</option>
                                            <option value="3">3 Days</option>
                                            <option value="4">4 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Location</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_rafting_location">
                                            <option value="" selected>Select One</option>
                                            <option value="Uncompahgre River">Uncompahgre River</option>
                                            <option value="Dolores River">Dolores River</option>
                                            <option value="Animas River">Animas River</option>
                                            <option value="Colorado River">Colorado River</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Seats</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_rafting_seats">
                                            <option value="" selected>Select One</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                </div>
                                

                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button id="add_rafting_trip" class="btn btn-outline-success">Add Trip</input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- DISPLAY TABLE FROM DATABASE -->
                    <div class="display_field shadow">
                        <h1>RAFTING TRIP DABASE (<span id="rafting_database_count"></span>)</h1>
                        <div class="table_container admin_display" id="table_display_database">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Difficulty</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Trip Length</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Max Seats</th>
                                        <th scope="col">Reserved Seats</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="rafting_display_table" class="admin_display_database">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- FISHING ADMIN CONTENT -->
                <div class="fishing_admin_content table_container hide">
                    <div class="add_fishing_trip shadow">
                        <div class="form_title">
                            <h1>Add a 
                            <img src='/GRIZZLY/images/icon_fishing.png' style='height:50px;'>
                            Trip</h1>

                            <a type="button" class="btn btn-success add_new_btn" data-bs-toggle="collapse" href="#fishingCollapse">Add New</a>
                        </div>

                        <div class="collapse" id="fishingCollapse">
                            <div id='fishing_form_alert'></div>

                            <div id="add_fishing_trip_form">
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Date</label>
                                    <div class="col-10">
                                        <input type="date" class="form-control" id="add_fishing_date" placeholder="i.e. 02/08/21">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Trip Length</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_fishing_duration">
                                            <option value="" selected>Select One</option>
                                            <option value="0">Day Trip</option>
                                            <option value="2">2 Days</option>
                                            <option value="3">3 Days</option>
                                            <option value="4">4 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Type/Location</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_fishing_location">
                                            <option value="" selected>Select One</option>
                                            <option value="River">River</option>
                                            <option value="Lake">Lake</option>
                                            <option value="Lake/River">Lake/River</option>
                                            <option value="Resevoir">Resevoir</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Seats</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_fishing_seats">
                                            <option value="" selected>Select One</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                </div>
                                

                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button id="add_fishing_trip" class="btn btn-outline-success">Add Trip</input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- DISPLAY TABLE FROM DATABASE -->
                    <div class="display_field shadow">
                        <h1>FISHING TRIP DABASE (<span id="fishing_database_count"></span>)</h1>
                        <div class="table_container admin_display" id="table_display_database">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Trip Length</th>
                                        <th scope="col">Type/Location</th>
                                        <th scope="col">Max Seats</th>
                                        <th scope="col">Reserved Seats</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="fishing_display_table" class="admin_display_database">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- KAYAKING ADMIN CONTENT -->
                <div class="kayaking_admin_content table_container hide">
                    <div class="add_kayaking_trip shadow">
                        <div class="form_title">
                            <h1>Add a 
                            <img src='/GRIZZLY/images/icon_kayaking.png' style='height:50px;'>
                            Trip</h1>

                            <a type="button" class="btn btn-success add_new_btn" data-bs-toggle="collapse" href="#kayakCollapse">Add New</a>
                        </div>

                        <div class="collapse" id="kayakCollapse">
                            <div id='kayaking_form_alert'></div>

                            <div id="add_kayaking_trip_form">
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Difficulty</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_kayaking_difficulty">
                                            <option value="" selected>Select One</option>
                                            <option value="Level 1">Level 1</option>
                                            <option value="Level 2">Level 2</option>
                                            <option value="Level 3">Level 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Date</label>
                                    <div class="col-10">
                                        <input type="date" class="form-control" id="add_kayaking_date" placeholder="i.e. 02/08/21">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Trip Length</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_kayaking_duration">
                                            <option value="" selected>Select One</option>
                                            <option value="0">Day Trip</option>
                                            <option value="2">2 Days</option>
                                            <option value="3">3 Days</option>
                                            <option value="4">4 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Location</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_kayaking_location">
                                            <option value="" selected>Select One</option>
                                            <option value="Uncompahgre River">Uncompahgre River</option>
                                            <option value="Dolores River">Dolores River</option>
                                            <option value="Animas River">Animas River</option>
                                            <option value="Colorado River">Colorado River</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-2 col-form-label">Seats</label>
                                    <div class="col-10">
                                        <select class="form-select" id="add_kayaking_seats">
                                            <option value="" selected>Select One</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                </div>
                                

                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button id="add_kayaking_trip" class="btn btn-outline-success">Add Trip</input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- DISPLAY TABLE FROM DATABASE -->
                    <div class="display_field shadow">
                        <h1>KAYAK TRIP DABASE (<span id="kayaking_database_count"></span>)</h1>
                        <div class="table_container admin_display" id="table_display_database">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Difficulty</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Trip Length</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Max Seats</th>
                                        <th scope="col">Reserved Seats</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="kayaking_display_table" class="admin_display_database">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- USERS ADMIN CONTENT -->
                <div class="user_admin_content table_container hide">
                    <!-- DISPLAY TABLE FROM DATABASE -->
                    <div class="display_field shadow">
                        <h1>USERS DABASE (<span id="user_database_count"></span>)</h1>
                        <div class="table_container admin_display" id="table_display_database">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Permission</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="user_display_table" class="admin_display_database">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
        </div>`;
                
        that.container.html(html);
    }

    initiateFunctions() {
        let that = this;
        //POPULATE TABLES
        that.populateUsersTable(that);
        that.populateTripTables(that);

        //ADMIN NAV
        that.adminNav(that);
        
        //USER FUNCTIONS
        that.changePermission(that);
        // that.changePassword(that);
        that.deleteUser(that);

        //TABLE FUNCTIONS
        that.closeTrip(that);
        that.openTrip(that);
        that.deleteTrip(that);
        that.viewApplicants(that);

        //ADD TRIPS
        that.addRaftingTrip(that);
        that.addFishingTrip(that);
        that.addKayakingTrip(that);

    }

    //ADMIN NAV FUNCTION
    adminNav() {
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
    //USER TABLE & FUNCTIONS
    populateUsersTable(that) {
        let exploreGrid = document.querySelector('#user_display_table');
        exploreGrid.innerHTML = '';

        $.ajax({
            url: that.url,
            dataType: 'json',
            type: 'POST',
            data: {
                type: 'getUsers',
                securitykey: that.security
            },
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
                        <button type="button" class="btn btn-outline-success btn-sm change_password_btn" data-user="${userID}">Change Password</button>
                    </td>`;
                    if(permission == 'user') {
                        html += `<td>
                            <button type="button" class="btn btn-outline-danger btn-sm delete_user_btn" data-user="${userID}">Delete</button>
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
    changePassword(that) {
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
        //       url: that.url,
        //       dataType: 'json',
        //       type: 'POST',
        //       data: {
        //           type: 'getUsers',
        //           securitykey: that.security,
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
        //           
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
    changePermission(that) {
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
                url: that.url,
                dataType: 'json',
                type: 'POST',
                data: {
                    type: 'updatePermission',
                    securitykey: that.security,
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
        
                    that.populateUsersTable(that);
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
    deleteUser(that) {
        $(document).on('click', `#user_display_table .delete_user_btn`, function() {
            let btn = $(this);
            let userID = btn.attr('data-user');
            console.log(`Delete User: ${userID}`);

            let deleteModalID = buildModalDelete();
    
            $(document).on(`click`, `.confirm_delete_btn`, function() {
            $.ajax({
                url: that.url,
                dataType: 'json',
                type: 'POST',
                data: {
                    type: 'deleteUser',
                    securitykey: that.security,
                    user: JSON.stringify(userID)
                },
                //function if we succeeed (data failure falls into this bucket)
                success: function(dataRetrieved) {
                    if(dataRetrieved.error) {
                        //error
                        console.log('ajax error', dataRetrieved.error);
                    } else {
                        //close modal
                        forceCloseModal(deleteModalID);
                        //success
                        that.populateUsersTable(that);
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

    //TRIP TABLE & FUNCTIONS
    populateTripTables(that) {
        let raftingTable = document.querySelector('#rafting_display_table');
        raftingTable.innerHTML = '';

        let fishingTable = document.querySelector('#fishing_display_table');
        fishingTable.innerHTML = '';

        let kayakingTable = document.querySelector('#kayaking_display_table');
        kayakingTable.innerHTML = '';
        
        $.ajax({
            url: that.url,
            dataType: 'json',
            type: 'POST',
            data: {
                type: 'getTrips',
                securitykey: that.security
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
                                <button type="button" class="btn btn-success btn-sm view_applicants_btn" data-trip="${tripID}">View Applicants</button>
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
                                <button type="button" class="btn btn-success btn-sm view_applicants_btn" data-trip="${tripID}">View Applicants</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-danger btn-sm delete_trip_btn" data-trip="${tripID}">Delete</button>
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
                                <button type="button" class="btn btn-success btn-sm view_applicants_btn" data-trip="${tripID}">View Applicants</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-danger btn-sm delete_trip_btn" data-trip="${tripID}">Delete</button>
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
    viewApplicants(that) {
        $(document).on('click', `.admin_display_database .view_applicants_btn`, function() {
          let btn = $(this);
          let trip = btn.attr('data-trip');
          btn.prop('disabled', true);
          console.log(`View Applicants for Trip ${trip}`);
          
          $.ajax({
            url: that.url,
            type: 'POST',
            dataType: 'json',
            data: {
                type: 'viewApplicants',
                trip: JSON.stringify(trip),
                securitykey: that.security
            },
            cache: false,
            success: function(dataRetrieved) {
              // enable the button again
              btn.prop('disabled', false);
              if(dataRetrieved.error) {
                  //error
                  console.log('ajax error');
              } else {
                  //success
                  let ObjectArray = dataRetrieved.data;

                  if (ObjectArray === undefined || ObjectArray.length === 0) {
                    // array empty or does not exist
                        //modal
                        let tableID = makeid();
                        let mid = buildModalSimple();
                        $(`#${mid}`).toggleClass('view_applicants_modal');
                        let title = `<div class='modal_header_grid'><img src='/GRIZZLY/images/bear.png' style='height:30px;'><h2 class='modal_title'>VIEW APPLICANTS for TRIP #${trip}</h2></div>`;
                        let body = `<div class="table_container" id="table_display_database">
                                <table class="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">App #</th>
                                            <th scope="col">User (Name)</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Spots</th>
                                        </tr>
                                    </thead>
                                    <tbody id="${tableID}"></tbody>
                                </table>
                
                                <h1 class="noResults">There are no current Applicants</h1>
                            </div>`;
                        $(`#${mid}Header`).html(title);
                        $(`#${mid}Body`).html(body);
                  } else {
                      //modal
                      let tableID = makeid();
                      let mid = buildModalSimple();
                      $(`#${mid}`).toggleClass('view_applicants_modal');
                      let title = `<div class='modal_header_grid'><img src='/GRIZZLY/images/bear.png' style='height:30px;'><h2 class='modal_title'>VIEW APPLICANTS for TRIP #${trip}</h2></div>`;
                      let body = `<div class="table_container" id="table_display_database">
                              <table class="table table-striped table-sm">
                                  <thead>
                                      <tr>
                                          <th scope="col">App #</th>
                                          <th scope="col">User (Name)</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">Spots</th>
                                      </tr>
                                  </thead>
                                  <tbody id="${tableID}"></tbody>
                              </table>
                          </div>`;
                      $(`#${mid}Header`).html(title);
                      $(`#${mid}Body`).html(body);

                    ObjectArray.forEach( function(object) {
                      let tripID      = object.tripID;
                      let appID       = object.appID;
                      let username    = object.username;
                      let email       = object.email;
                      let spots       = object.spots;

                      let html = `<tr>
                                <td>${appID}</td>
                                <td>${username}</td>
                                <td>${email}</td>
                                <td>${spots}</td>
                            </tr>`;
                    
                      let table = document.getElementById(tableID);
                      table.insertAdjacentHTML('beforeend',html);
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
    closeTrip(that) {
        $(document).on('click', `.admin_display_database .close_trip_btn`, function() {
            let btn = $(this);
            let trip = btn.attr('data-trip');
            btn.prop('disabled', true);
            console.log(`Trip ${trip} Closed`);
            
            $.ajax({
                url: that.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    type: 'closeTrip',
                    trip: JSON.stringify(trip),
                    securitykey: that.security
                },
                cache: false,
                success: function(dataRetrieved) {
                    // enable the button again
                    btn.prop('disabled', false);
                    if(dataRetrieved.error) {
                        //error
                        console.log('ajax error');
                    } else {
                        //success
                        that.populateTripTables(that);
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
    openTrip(that) {
        $(document).on('click', `.admin_display_database .open_trip_btn`, function() {
            let btn = $(this);
            btn.prop('disabled', true);
            let trip = btn.attr('data-trip');
            console.log(`Trip ${trip} Open`);

            //modal
            let title = "<img src='/GRIZZLY/images/nav_logo.png' id='login_gator_logo'></img>";
            let mid = buildModalSimple();
            $(`#${mid}`).toggleClass('seats_input_modal');
            $(`#${mid}Header`).html(title);
            $(`#${mid}Body`).html(`<h2>How many seats for this trip?</h2>
            <input type="number" class="form-control" id="numberOfSeats">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" id="seats_submit">Submit</button>`);

            //submit btn on seat # modal
            $(document).on(`click`, `#seats_submit`, function() {
                let btn = $(this);
                btn.prop('disabled', true);
                let error = false;
        
                if($(`#numberOfSeats`).val() == '' || $(`#numberOfSeats`).val() == undefined) { 
                    btn.prop('disabled', false); 
                    error = true; 
                }
        
                if(!error) {
                    let data = {
                        trip: trip,
                        seats: $('#numberOfSeats').val().trim()
                    }
                    $.ajax({
                        url: that.url,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            type: 'openTrip',
                            data: JSON.stringify(data),
                            securitykey: that.security
                        },
                        cache: false,
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
                            that.populateTripTables(that);
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

                forceCloseModal(mid);
            });
            //enable the button again
            btn.prop('disabled', false);
        });
    }
    deleteTrip(that) {
        $(document).on('click', `.admin_display_database .delete_trip_btn`, function() {
            let btn = $(this);
            let tripID = btn.attr('data-trip');
            console.log(`Delete Trip: ${tripID}`);
        
            let deleteModalID = buildModalDelete();

            $(document).on(`click`, `.confirm_delete_btn`, function() {
                $.ajax({
                    url: that.url,
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        type: 'deleteTrip',
                        securitykey: that.security,
                        trip: JSON.stringify(tripID)
                    },
                    success: function(dataRetrieved) {
                        if(dataRetrieved.error) {
                            //error
                            console.log('ajax error', dataRetrieved.error);
                        } else {
                            //success
                            //close modal
                            forceCloseModal(deleteModalID);
                            console.log(dataRetrieved.success);
                            that.populateTripTables(that);
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
    //ADD TRIP FUNCTIONS
    addRaftingTrip(that) {
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
            let btn = $(this);
            let error = false;
            btn.prop('disabled', true);
        
            let form = {
                difficulty: $(`#add_rafting_difficulty`).val().trim(),
                date: $(`#add_rafting_date`).val().trim(),
                duration: $(`#add_rafting_duration`).val().trim(),
                location: $(`#add_rafting_location`).val().trim(),
                seats: $(`#add_rafting_seats`).val()
            };
        
            console.log(form);

            $(`#add_rafting_trip_form input`).each(function() {
                if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
            });
            $(`#add_rafting_trip_form select`).each(function() {
                if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
            });
        
            if(!error) {
                $.ajax({
                url: that.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    type: 'addRaftingTrip',
                    form: JSON.stringify(form),
                    securitykey: that.security
                },
                cache: false,
                success: function(dataRetrieved) {
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
                    that.populateTripTables(that);
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
    addFishingTrip(that) {
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
            let btn = $(this);
            let error = false;
            btn.prop('disabled', true);
        
            let form = {
                date: $(`#add_fishing_date`).val().trim(),
                duration: $(`#add_fishing_duration`).val().trim(),
                location: $(`#add_fishing_location`).val().trim(),
                seats: $(`#add_fishing_seats`).val()
            };
        
            console.log(form);
        
            $(`#add_fishing_trip_form input`).each(function() {
                if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
            });
            $(`#add_fishing_trip_form select`).each(function() {
                if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
            });
        
        
            if(!error) {
                $.ajax({
                url: that.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    type: 'addFishingTrip',
                    form: JSON.stringify(form),
                    securitykey: that.security
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
                    that.populateTripTables(that);
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
    addKayakingTrip(that) {
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
            let btn = $(this);
            let error = false;
            btn.prop('disabled', true);
        
            let form = {
                difficulty: $(`#add_kayaking_difficulty`).val().trim(),
                date: $(`#add_kayaking_date`).val().trim(),
                duration: $(`#add_kayaking_duration`).val().trim(),
                location: $(`#add_kayaking_location`).val().trim(),
                seats: $(`#add_kayaking_seats`).val()
            };
            console.log(form);
        
            $(`#add_kayaking_trip_form input`).each(function() {
                if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
            });
            $(`#add_kayaking_trip_form select`).each(function() {
                if($(this).val() == '' || $(this).val() == undefined) { btn.prop('disabled', false); error = true; }
            });
        
            if(!error) {
                $.ajax({
                url: that.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    type: 'addKayakingTrip',
                    form: JSON.stringify(form),
                    securitykey: that.security
                },
                cache: false,
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
                    that.populateTripTables(that);
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
}