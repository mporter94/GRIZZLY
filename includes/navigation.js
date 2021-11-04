class navigation {
    constructor({data = '', url = '/ajax/headers.php'} = {data = '', url = '/ajax/headers.php'}) {
        this.userID = getCookie('userID');
        this.url = url;
        this.data = data;
    }

    get html() {
        let that = this;

        if(that.data == '') {
            that.loadFrameData(that);
        } else {
            console.log(that.data);
            that.writeFrameDataNew(that);
        }

        setTimeout(function() {
            that.checkLoggedIn(that);
        }, 1000 * 60 * 5);
    }


    writeRightSideNav(that) {
        let html = '';

        if(that.data.userInfo) {
            let avi = '/images/system-icon.jpg';
            if (that.data.userInfo && that.userInfo.avatar && that.data.userInfo.avatar != '') {
                avi = `/uploades/public/${that.data.userInfo.avatar}`;
            }

            html = `<div class='profile_btn' data-bs-toggle='modal' data-bs-target='#profile_modal'>
                <img src='${avi}' alt='/GRIZZLY/images/icon_profile.png' style='height:35px;'>
            </div>
            
            <a href='logout.php' class='logout_nav_btn'>
                <img src='/GRIZZLY/images/icon_logout.png' style='height:35px;'>
            </a>`;

        } else {
            html = `<button class='btn btn-dark register_modal_btn' data-bs-toggle='modal' data-bs-target='#register_modal'>Register</button>

            <button class='btn btn-outline-dark login_modal_btn' data-bs-toggle='modal' data-bs-target='#login_modal'>Login</button>`
        }
    }

    writePermissionTabs(that) {
      if (that.userInfo.permission && that.data.userInfo.permission == 'admin') {
        html = `<li class='nav-item admin_link'>
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
        html = `<li class='nav-item admin_link'>
                    <a href='/GRIZZLY/myTrips' class='nav-link'>
                        <img src='/GRIZZLY/images/icon_trip.png' style='height:20px;'>
                        My Trips
                    </a>
                </li>`;
      }
    }

    writeNavigation() {
        if(that.data.userInfo) {that.permission = that.data.userInfo.permission; } else { that.permission = 0; }

        let rightSideNav = that.writeRightSideNav(that);
        let permissionTabs = that.writePermissionTabs(that);

        let html = `<nav class="navbar fixed-top navbar-light" id="nav_head">
          <div class="container-fluid">
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
            ${rightSideNav}
          </div>
        </nav>`;

        $('.grid-frame').html(html);

        that.writeFooter(that);
        that.initiateFunctions(that);
    }

    initiateFunctions(that) {
      $(document).on('click', ' ', function() {
        //LOGIN FUNCTION HERE
      });

      $(document).on('click', ` `, function() {
        //REGISTER FUNCTION HERE
      });

      $(document).on('click', `.footer .contact_link`, function() {
        //CONTACT MODAL FUNCTION HERE
      });
    }

    writeFooter(that) {
      html = `<div class="footer ">
                <a class="contact_link" data-bs-toggle="modal" data-bs-target="#contact_modal">Contact Us</a>
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

      $('body .grid-page .grid-footer').addClass('grid');
      $('body .grid-page .grid-footer').html(html);
    }

    writeLogin(that) {
      $('.grid-page .grid-frame').find('.login').remove();
      $('.grid-page .grid-frame').append(`<div class="g-col-s-30 g-col-e-31 g-768-col-s-29 center-cell login"><button class="btn btn-sm btn-p" data-tag="login">Login</button></div>`);
    }




}