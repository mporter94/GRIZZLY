// <!----------------------->
// <!-- DELETE? Modal -->
// <!----------------------->
// <div class="modal fade" id="delete_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog modal-dialog-centered">
//     <div class="modal-content">
//       <div class="modal-header">
        
//       </div>
//       <div class="modal-body">
//         <h2>Are you sure you want to Delete?</h2>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//         <button type="button" class="btn btn-danger" id="confirm_delete_btn">Delete</button>
//       </div>
//     </div>
//   </div>
// </div>

// <!--------------------------------------->
// <!-- NUMBER OF SEATS (OPEN TRIP) Modal -->
// <!--------------------------------------->
// <div class="modal fade" id="seats_input_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog modal-dialog-centered">
//     <div class="modal-content">
//       <div class="modal-header">
        
//       </div>
//       <div class="modal-body">
//         <h2>How many seats for this trip?</h2>
//         <input type="number" class="form-control" id="numberOfSeats">
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//         <button type="button" class="btn btn-success" id="seats_submit">Submit</button>
//       </div>
//     </div>
//   </div>
// </div>



// <!------------------------------>
// <!-- VIEW APPLICANTS Modal ----->
// <!------------------------------>
// <div class="modal fade user_modal" id="view_applicants_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog modal-dialog-centered">
//     <div class="modal-content">
//       <div class="modal-header">
//         <img src="/GRIZZLY/images/bear.png" style="height:30px;">
//         <h2 class="modal_title">VIEW APPLICANTS for TRIP #<span id="tripNumberTitle"></span></h2>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//             <div class="table_container" id="table_display_database">
//                 <table class="table table-striped table-sm">
//                     <thead>
//                         <tr>
//                             <th scope="col">App #</th>
//                             <th scope="col">User (Name)</th>
//                             <th scope="col">Email</th>
//                             <th scope="col">Spots</th>
//                         </tr>
//                     </thead>
//                     <tbody id="applicants_display_table"></tbody>
//                 </table>

//                 <h1 id="noResults" class="hide">There are no current Applicants</h1>
//             </div>
//       </div>
//     </div>
//   </div>
// </div>