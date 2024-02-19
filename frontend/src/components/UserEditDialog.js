import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';


const UserEditDialog = ({ userId, onClose, onDeleteSuccess, onEditSuccess }) => {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  const handleChange = (field, value) => {
    setEditData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const handleEdit =async () => {
     await fetch(`/api/users/${userId}/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
          body:JSON.stringify(editData)
  })
      .then(response => {
          if (response.ok) {
              onEditSuccess(editData);
              handleClose();
          }
          else
          return response.json().then((error) => { throw new Error(error.message); });
      })
      .catch(error => {
          console.log(error)
        alert(error.message);
        // Handle error
      });
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Actions</DialogTitle>
        <DialogContent>
    <DialogContentText>
          Edit or delete user details:
        </DialogContentText>
        <TextField
          label="Password"
          value={editData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="First Name"
          value={editData.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={editData.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          value={editData.username}
          onChange={(e) => handleChange('username', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={editData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          fullWidth
          margin="normal"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color="primary">
            Edit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserEditDialog;
