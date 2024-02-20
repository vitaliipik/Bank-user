import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {BASE_URL} from '../constant'

const BankEditDialog = ({ bankId, onClose, onEditSuccess }) => {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  const handleChange = (field, value) => {
    setEditData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const handleEdit =async () => {
     await fetch(BASE_URL+`/api/banks/${bankId}/edit/`, {
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
        <DialogTitle>Bank Actions</DialogTitle>
        <DialogContent>
    <DialogContentText>
          Edit bank details:
        </DialogContentText>
        <TextField
          label="bank name"
          value={editData.bank_name}
          onChange={(e) => handleChange('bank_name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="routing number"
          value={editData.routing_number}
          onChange={(e) => handleChange('routing_number', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="swift bic"
          value={editData.swift_bic}
          onChange={(e) => handleChange('swift_bic', e.target.value)}
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

export default BankEditDialog;
