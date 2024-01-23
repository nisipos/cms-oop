<!-- User Modal -->
<div class="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="userModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">New User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="userForm">
        <div class="modal-body">
          <div class="alert alert-primary" role="alert" id="userCreationNote">
            <div class="form-text">
              Username is automatically created.
              <i><strong> format:</strong> [f][lastname] 
                  <br> e.g. <strong>name:</strong> John Doe - <strong>username:</strong> jdoe
              </i>
            </div>
          </div>
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstNameInput" name="firstName" placeholder="First Name" required>
          </div>
          <div class="mb-3">
            <label for="firstName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastNameInput" name="lastName" placeholder="Last Name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="emailInput" name="email" placeholder="Email" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save User</button>
        </div>
      </form>
    </div>
  </div>
</div>