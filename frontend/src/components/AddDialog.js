// UserActions.js

import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';


const AddDialog = ({ globalField, onClose, onAddSuccess }) => {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  const handleChange = (field, value) => {
    setEditData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleAdd = async () => {
   await fetch(`/api/${globalField}/new/${editData["amount"]}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
         .then(response => {
          if (response.ok) {
             onAddSuccess();
              handleClose();
          }
          else
          return response.json().then((error) => { throw new Error(error.message); });
      })
      .catch(error => {
          console.log(error)
        alert(error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>Add</Button>
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>How many do you want to add?</DialogTitle>
           <DialogContent>
        <TextField
          label="Amount"
          onChange={(e) => handleChange('amount', e.target.value)}
          fullWidth
          margin="normal"
        />
               </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
