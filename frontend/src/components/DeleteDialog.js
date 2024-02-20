import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from '@mui/material';
import {BASE_URL} from '../constant'

const DeleteDialog = ({ globalField,id, onClose, onDeleteSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
   fetch(BASE_URL+`/api/${globalField}/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
         .then(response => {
          if (response.ok) {
             onDeleteSuccess();
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
      <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>Delete</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
