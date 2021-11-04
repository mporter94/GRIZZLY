class navigation {
    constructor({data = '', container = '', url = 'ajax.php'} = {data: '', container: '', url: 'ajax.php'}) {
        this.userID = getCookie('userID');
        this.url = url;
        this.data = data;
        this.container = container;
        this.id = makeid();
    }

    get html() {
        let that = this;

        // if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }
        
        if(that.data == '') {
            that.loadNavData(that);
        } else {
            that.writeNavigation(that);
        }
        that.initiateFunctions(that);
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
                that.writeNavigation(that);
            },
            error: function(dataRetrieved) { //if error with AJAX
                console.log(dataRetrieved); //note error to console
            }
        });
    }

    writeRightSideNav(that) {
        if(that.data) {
            let avi = '/GRIZZLY/images/icon_profile.png';
            // if (that.data.userInfo && that.userInfo.avatar && that.data.userInfo.avatar != '') {
            //     avi = `/uploades/public/${that.data.userInfo.avatar}`;
            // }

            return `<div class='profile_btn'>
                <img src='${avi}' style='height:35px;'>
            </div>
            
            <a href='logout.php' class='logout_nav_btn'>
                <img src='/GRIZZLY/images/icon_logout.png' style='height:35px;'>
            </a>`;

        } else {
            return `<button class='btn btn-dark register_modal_btn'>Register</button>

            <button class='btn btn-outline-dark login_modal_btn'>Login</button>`;

        }
    }

    writePermissionTabs(that) {
        if(that.data) {
            if (that.data['0'].permission) {
                return `<li class='nav-item admin_link'>
                            <a href='/GRIZZLY/myTrips' class='nav-link'>
                                <img src='/GRIZZLY/images/icon_trip.png' style='height:20px;'>
                                My Trips
                            </a>
                        </li>
                        <li class='nav-item admin_link'>
                            <a href='/GRIZZLY/admin' class='nav-link'>
                                <img src='/GRIZZLY/images/icon_compass.png' style='height:20px;'>
                                Admin
                            </a>
                        </li>`;
            } else {
                return `<li class='nav-item admin_link'>
                            <a href='/GRIZZLY/myTrips' class='nav-link'>
                                <img src='/GRIZZLY/images/icon_trip.png' style='height:20px;'>
                                My Trips
                            </a>
                        </li>`;
            }
        } else {
            return ''
        }
    }
    
    writeNavigation(that) {
        let rightSideNav = that.writeRightSideNav(that);
        let permissionTabs = that.writePermissionTabs(that);

        let html = `<nav class="navbar fixed-top navbar-light" id="${that.id}">
                        <div id="${that.id}Container" class="container-fluid">
                            <a class="navbar-brand" href="/GRIZZLY/">
                            <img src="/GRIZZLY/images/nav_logo.png" alt="" style="height:35px;">
                        </a>
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class='nav-item rafting_link'>
                                <a href='/GRIZZLY/rafting' class='nav-link'>
                                    <img src='/GRIZZLY/images/icon_rafting.png' style='height:20px;'>
                                    Rafting
                                </a>
                            </li>
                            <li class='nav-item fishing_link'>
                                <a href='/GRIZZLY/fishing' class='nav-link'>
                                    <img src='/GRIZZLY/images/icon_fishing.png' style='height:20px;'>
                                    Fly Fishing
                                </a>
                            </li>
                            <li class='nav-item kayaking_link'>
                                <a href='/GRIZZLY/kayaking' class='nav-link'>
                                    <img src='/GRIZZLY/images/icon_kayaking.png' style='height:20px;'>
                                    Kayak Kamping
                                </a>
                            </li>
                            ${permissionTabs}
                        </ul>
                        <div class="rightNavBtnContainer">
                            ${rightSideNav}
                        </div>
                        </div>
                    </nav>`;
  
        that.container.html(html);
    }

    // alertMessage(that, message) {
    //     let html = `<div class="alert alert-danger" role="alert"><strong>${message}</strong></div>`;

    //     $(`${that.id} form_alert`).innerHTML = html;
    // }

    registerUser(that) {
        let ajaxErrorMessge = `There was a problem submitting the form.<br>Please try again later.`;

        $(document).on('click', `#register_btn`, function() {
          console.log('button pushed');
          //assign button as a variable
          let btn = $(this);
          //assign error
          let error = false;
          //disable the  button to prevent double clicks
          btn.prop('disabled', true);
      
          let password = $(`#register_password`).val().trim();
          let confirmPassword = $(`#register_confirm_password`).val().trim();
      
          if(password !== confirmPassword) {
            error = true;
          }
      
          //create the form as an object
          let form = {
            username: $(`#register_username`).val().trim(),
            email: $(`#register_email`).val().trim(),
            password: password,
            permission: 'user',
            token: tokenGen(16)
          }
      
          console.log(form);
      
          //check every input on the form to make sure it is not blank -->could add alert or red box etc here to notify which input is in error
          $(`#register_user_form input`).each(function() {
            if($(this).val() == '' || $(this).val() == undefined) { 
              btn.prop('disabled', false); 
              error = true; 
              alertMessage('Please fill out all Fields');
            }
          });
      
          if(!error) {
            $.ajax({
              url: that.url,
              type: 'POST',
              dataType: 'json',
              data: {
              type: 'registerUser',
              form: JSON.stringify(form),
              securitykey: 'ZzRKwS2vMp6'
              },
              cache: false,
              success: function(dataRetrieved) {
                console.log(dataRetrieved);
                // enable the button again
                btn.prop('disabled', false);
                if(dataRetrieved.error) {
                  //error
                  console.log('ajax error');
                  alertMessage(ajaxErrorMessge);
                } else {
                  //success
                  console.log(dataRetrieved.data);
                  //asign the data
                  let data = dataRetrieved.data;
                  
                  //CLOSE MODAL
                  that.forceCloseModal(that);
      
                  //after successful run clear the form
                  $(`#register_user_form input`).each(function() {
                    $(this).val('');
                  });
                }
              },
              //function if we fail (script failure not data failure)
              error: function(dataRetrieved) {
              //error
              console.log('ajax error' + dataRetrieved);
              alertMessage(ajaxErrorMessge);
              
              //enable the button again
              btn.prop('disabled', false);
              }
            });
          } else {
            alertMessage(`Please Complete All Fields`);
          }
        });
    }
      
    loginUser(that, id) {
        let ajaxErrorMessge = `There was a problem submitting the form.<br>Please try again later.`;

        $(document).on('click', `#login_btn`, function() {
          //assign button as a variable
          let btn = $(this);
          //assign error
          let error = false;
          //disable the  button to prevent double clicks
          btn.prop('disabled', true);
      
          let username = $(`#login_name`).val().trim();
          let password = $(`#login_pass`).val().trim();
          let stayLogin = $(`#stay_login_check`).val().trim();
          if(stayLogin == '') {
            stayLogin = false;
          } else {
            stayLogin = true;
          }
      
          let form = {
            username: username,
            password: password,
            stayLogin: stayLogin
          }
          console.log(form);
      
          $(`#login_form input`).each(function() {
            if($(this).val() == '' || $(this).val() == undefined) { 
              btn.prop('disabled', false); 
              error = true; 
              alertMessage('Please fill out all Fields');
            }
          });
      
          if(!error) {
            $.ajax({
              url: that.url,
              type: 'POST',
              dataType: 'json',
              data: {
                type: 'loginUser',
                form: JSON.stringify(form),
                securitykey: 'ZzRKwS2vMp6'
              },
              cache: false,
              success: function(dataRetrieved) {
                console.log(dataRetrieved);
                // enable the button again
                btn.prop('disabled', false);
                if(dataRetrieved.error) {
                  //error
                  console.log('ajax error');
                  if(dataRetrieved.incorrect){
                    alertMessage(`Incorrect ${dataRetrieved.incorrect}<br>Please try again.`);
                  } else {
                    alertMessage(ajaxErrorMessge);
                  }
                } else {
                  //success
                  console.log(dataRetrieved.data);
                  //asign the data
                  let data = dataRetrieved.data;
                  
                  //CLOSE MODAL
                  //forceCloseModal(that.id);
                  that.writeNavigation(that);
      
                  //after successful run clear the form
                  $(`.login_form input`).each(function() {
                    $(this).val('');
                  });
                  forceCloseModal(id);
                  location.reload(); return;
      
                  //FIX redirect to the admin page
                  // var url = "https://playground.overlandmissions.com/GRIZZLY_RAFTING/index.php";
                  // $(location).prop('href', url);
                }
              },
              //function if we fail (script failure not data failure)
              error: function(dataRetrieved) {
                //error
                console.log('ajax error' + dataRetrieved);
                alertMessage(ajaxErrorMessge);
                
                //enable the button again
                btn.prop('disabled', false);
              }
            });
          } else {
            alertMessage(`Please Complete All Fields`);
          }
        });
    }

    initiateFunctions(that) {
        // LOGIN MODAL
        $(document).on('click', '.login_modal_btn', function() {
            let title = "<img src='/GRIZZLY/images/nav_logo.png' id='login_gator_logo'></img>";
            let mid = buildModalSimple();
            $(`#${mid}`).toggleClass('login_modal');
            $(`#${mid}Header`).html(title);
            $(`#${mid}Body`).html(`
            <!-- LOGIN FORM -->
            <div class="login_form">
                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input id="login_name" type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input id="login_pass" type="password" class="form-control">
                </div>
                <div class="mb-3 form-check">
                    <input id="stay_login_check" type="checkbox" class="form-check-input" value="yes">
                    <label class="form-check-label">Stay Logged In</label>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button id="login_btn" class="btn btn-success">Login</button>
                </div>
  
                <div class="d-grid gap-2 col-6 mx-auto">
                  <button class="btn btn-link btn-sm login_modal_link" id="forgot_pass_content_btn">Forgot Password?</button>
                </div>
            </div>`);

            that.loginUser(that, mid);
        });

        // REGISTER MODAL
        $(document).on('click', '.register_modal_btn', function() {
            let title = "<img src='/GRIZZLY/images/nav_logo.png' style='height:30px;'>";
            let mid = buildModalSimple();
            $(`#${mid}`).toggleClass('register_modal');
            $(`#${mid}Header`).html(title);
            $(`#${mid}Body`).html(`<div id="form_alert"></div>
            <div id="register_user_form">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input type="text" class="form-control" id="register_username">
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="register_email">
                  <div class="form-text">To recover your account, if lost.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" id="register_password" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" id="register_confirm_password" class="form-control">
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button id="register_btn" class="btn btn-success">Register</button>
                </div>
            </div>`);

            that.registerUser(that);
        });

        // PROFILE MODAL
        $(document).on('click', '.profile_btn', function() {
            let title = "<div class='modal_header_grid'><img src='/GRIZZLY/images/bear.png' style='height:30px;'><h2 class='modal_title'>PROFILE</h2></div>";
            let mid = buildModalSimple();
            $(`#${mid}`).toggleClass('profile_modal');
            $(`#${mid}Header`).html(title);
            $(`#${mid}Body`).html(`<div class="profile_modal_body">
            <div class="profile_header">
              <div clas="profile_image">
                <img src='/GRIZZLY/images/icon_profile.png' class="profile_icon">
                <img src='/GRIZZLY/images/icon_edit.png' class="edit_icon">
              </div>
              <h1>${that.data['0'].username}</h1>
              <h3>${that.data['0'].permission}</h3>
            </div>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Account Details
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body account_detail_form">
  
                    <div id="form_alert"></div>
                    <div id="account_detail_form">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Username</label>
                            <input type="text" class="form-control" id="acount_detail_username" value="${that.data['0'].username}">
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" class="form-control" id="acount_detail_email" value="${that.data['0'].email}">
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Birth Date</label>
                          <input type="date" class="form-control" id="acount_detail_birth" value="${that.data['0'].dob}">
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Medical Notes/Allergies</label>
                          <textarea class="form-control" id="acount_detail_medical" rows="2" value="${that.data['0'].allergies}"></textarea>
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button id="update_account_btn" class="btn btn-success">Update</button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Preferences
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
  
                    <h3>Send Promotional Emails</h3>
                    
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                      <label class="form-check-label" for="flexSwitchCheckChecked">Yes</label>
                    </div>
  
                    <h3>Allow Cookies</h3>
  
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                      <label class="form-check-label" for="flexSwitchCheckChecked">Yes</label>
                    </div>
  
                    <h3>Allow Cookies</h3>
  
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                      <label class="form-check-label" for="flexSwitchCheckChecked">Yes</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Privacy Disclosure
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
            </div>`);
        });
    }
}

class footer {
    constructor({data = '', container = '', url = '/ajax/ajax.php'} = {data: '', container: '', url: '/ajax/ajax.php'}) {
        //this.userID = getCookie('userID');
        this.url = url;
        this.data = data;
        this.container = container;
    }

    get html() {
        let that = this;

        if(that.container == '') { console.log('YOU NEED A CONTAINER'); return; }

        that.writeFooter(that);

        /*
        if(that.data == '') {
            that.loadFooterData(that);
        } else {
            console.log(that.data);
            that.writeFooter(that);
        }*/
    }

    loadFooterData(that) {
        $.ajax({
            url: that.url,
            type: 'POST',
            dataType: 'json',
            data: {
                type: 'framescript',
                csrf_token: that.csrf,
                security_token: that.token,
                userid: that.userid
            },
            cache: false,
            success: function(dataRetrieved) {
                if(dataRetrieved.error && dataRetrieved.error !== '') {
                     new alert({msg: dataRetrieved.error, type: 'error'}).html; return; 
                    }
                let data = dataRetrieved.data;
                console.log(data);
                
                

            },
            error: function(dataRetrieved) { //if error with AJAX
                console.log(dataRetrieved); //note error to console
            }
        });
    }
    
    writeFooter(that) {
        let html = `<div class="footer ">
                        <a class="contact_link">Contact Us</a>
                        <div class="footerGrid">
                            <a href="#">
                                <i class="fab fa-facebook-f fa-lg"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-instagram fa-lg"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-youtube fa-lg"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-vimeo-v fa-lg"></i>
                            </a>
                        </div>
                        <img src="images/raft.png" class="logo">
                    </div>`;
  
        that.container.html(html);
        that.initiateFunctions(that);
    }

    initiateFunctions(that) {
        // CONTACT MODAL
        $(document).on('click', '.contact_link', function() {
            let title = "<img src='/GRIZZLY/images/bear.png' id='login_gator_logo'></img><h2 class='modal_title'>CONTACT</h2>";
            let mid = buildModalSimple();
            $(`#${mid}`).toggleClass('contact_modal');
            $(`#${mid}Header`).html(title);
            $(`#${mid}Body`).html(`<div class="contact_modal_body">
                                        <img src="images/icon_phone.png">
                                            <h2>USA <a href="#">+1 (970) 728-2842</a></h2>
                                        <img src="images/icon_email.png">
                                            <h2><a href="#">support@GrizzlyRafting.com</a></h2>
                                        <img src="images/icon_location.png">
                                            <h2><a href="#">19 Grand Rapid Dr.<br>Ridgway, Colorado 81432,<br>United States of America</a></h2>
                                    </div>`);
        });
    }
}
