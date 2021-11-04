//function to make a unique id for a new element on the document
function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let check = true;
    while(check) {
        for (let i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        if(!$(`#i${text}`).length) {
            check = false;
        }
    }
    return `i${text}`;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function tokenGen(length) {
    let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let b = [];

    for(i=0; i < length; i++) {
      let c = Math.random() * (a.length - 1);
      b[i] = a[c];
    }
    return b.join('');
}

function alertMessage(id, message) {
    let html = `<div class="alert alert-danger" role="alert"><strong>${message}</strong></div>`;

    $(`#${id} .modal #form_alert`).innerHTML = html;
}

//----------------------------//
//------MODAL FUNCTIONS-------//
function forceCloseModal(id) {
    //updated to hide modal by id
    //$(`#${id}`).modal('hide');
    //BOOTSTRAP 5 MODAL FORCE CLOSE METHOD
    let modalEl = document.getElementById(id);
    let modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
    modal.dispose();
    //$(`#${id}`).dispose(); //destroys modal
}

//function to build a generic modal container for a class 
function buildModal(that, title, mClass) {
    //ensure there is a mid (modalID) in the class object passed to the function
    if(!that.mid || that.mid === undefined || that.mid === null) { that.mid = makeid(); }
    let id = that.mid;
    let html = `<div id='${id}' class='modal ${mClass}' tabindex='-1' role='dialog' data-bs-backdrop="static" data-bs-keyboard="false"> 
                    <div class='modal-dialog modal-dialog-centered' role='document'> 
                        <div class='modal-content'> 
                            <div class='modal-header'> 
                                <h4 class='modal-title'>${title}</h4>
                                <button type='button' class='close modal-close btn-close' aria-label='Cancel'><!--<span aria-hidden='true'>&times;</span>--></button>
                            </div>
                            <div class='modal-body' id="${id}Body">
                                
                            </div>
                        </div>
                    </div>	
                </div>`;
    $('body').append(html);

    //NEW MODAL FORMAT
    let modal = new bootstrap.Modal(document.getElementById(id), {
        keyboard: false,
        backdrop: 'static'
    });

    modal.show();
    that.container = $(`#${id}Body`);
    $(document).on('click', `#${id} .modal-close`, function() {
        forceCloseModal(id);
    });

    return id;
}

//function to build a simple modal(no title) return id
function buildModalSimple() {
    let id = makeid();
    let html = `<div id='${id}' class='modal' tabindex='-1' role='dialog' data-bs-backdrop="static" data-bs-keyboard="false"> 
                    <div class='modal-dialog modal-dialog-centered' role='document'> 
                        <div class='modal-content'> 
                            <div class='modal-header'> 
                                <div id="${id}Header"></div>
                                
                                <button type='button' class='close modal-close btn-close' aria-label='Cancel'><!--<span aria-hidden='true'>&times;</span>--></button>
                            </div>
                            <div id="form_alert"></div>
                            <div class='modal-body' id="${id}Body">
                            </div>
                        </div>
                    </div>	
                </div>`;
    $('body').append(html);
    //let modal = $(`#${id}`);
    /*modal.modal({
        backdrop: 'static',
        keyboard: false,
        //show: true
    });*/

    //NEW MODAL FORMAT
    let modal = new bootstrap.Modal(document.getElementById(id), {
        keyboard: false,
        backdrop: 'static'
    });

    modal.show();

    $(document).on('click', `#${id} .modal-close`, function() {
        forceCloseModal(id);
    });

    return id;
}
//function to build a simple modal(no title) return id
function buildModalDelete() {
    let id = makeid();
    let html = `<div id='${id}' class='modal delete_modal' tabindex='-1' role='dialog' data-bs-backdrop="static" data-bs-keyboard="false"> 
    <div class='modal-dialog modal-dialog-centered' role='document'> 
        <div class='modal-content'> 
            <div class='modal-header'> 
                <div id="${id}Header"></div>
            </div>
            <div id="form_alert"></div>
            <div class='modal-body' id="${id}Body">
                <h2>Are you sure you want to <span>Delete</span>?</h2>
    
                <div class="btn_container">
                    <button type="button" class="btn btn-secondary modal-close">Cancel</button>
        
                    <button type="button" class="btn btn-danger confirm_delete_btn">Delete</button>
                </div>
            </div>
        </div>
    </div>	
</div>`;
    $('body').append(html);

    //NEW MODAL FORMAT
    let modal = new bootstrap.Modal(document.getElementById(id), {
        keyboard: false,
        backdrop: 'static'
    });

    modal.show();

    $(document).on('click', `#${id} .modal-close`, function() {
        forceCloseModal(id);
    });
    return id;
}

//function to build a simple modal(no title) return id
function buildModalSimpleBig() {
    let id = makeid();
    let html = `<div id='${id}' class='modal big-modal' tabindex='-1' role='dialog' data-bs-backdrop="static" data-bs-keyboard="false"> 
                    <div class='modal-dialog' role='document'> 
                        <div class='modal-content'> 
                            <div class='modal-header'> 
                                <button type='button' class='close modal-close btn-close' aria-label='Cancel'><!--<span aria-hidden='true'>&times;</span>--></button>
                            </div>
                            <div class='modal-body' id="${id}Body">
                                
                            </div>
                        </div>
                    </div>	
                </div>`;
    $('body').append(html);
    //let modal = $(`#${id}`);
    /*modal.modal({
        backdrop: 'static',
        keyboard: false,
        //show: true
    });*/

    //NEW MODAL FORMAT
    let modal = new bootstrap.Modal(document.getElementById(id), {
        keyboard: false,
        backdrop: 'static'
    });

    modal.show();
    

    $(document).on('click', `#${id} .modal-close`, function() {
        forceCloseModal(id);
    });

    return id;
}