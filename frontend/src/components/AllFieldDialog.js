import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import UserListItem from "./UserListItem";
import BankListItem from "./BankListItem";
import {BASE_URL} from '../constant'

const AllFieldDialog = ({ globalField, id, onClose, onEditSuccess }) => {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});
let [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, []);
  const handleChange = (field, value) => {
    setEditData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const handleAdd =async () => {
     await fetch(BASE_URL+`/${globalField}/append/${id}/${editData["id"]}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(response => {
          if (response.ok) {

              getData()
          }
          else
          return response.json().then((error) => { throw new Error(error.message); });
      })
      .catch(error => {
          console.log(error)
        alert(error.message);
      });
  };

    let getData = async () => {
        let response = await fetch(BASE_URL+`/${globalField}/child/${id}`,{
            method: 'GET',
             'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true',
        })
        let data = await response.json()
        setData(data)
    }

     const handleDelete =async (item_id) => {
     await fetch(BASE_URL+`/${globalField}/delete/${id}/${item_id}/`, {
    method: 'DELETE',
         mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(response => {
          if (response.ok) {

getData()

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
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>Show all{  (globalField==="users") ? "bank" : "user"}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{  (globalField==="users") ? "bank" : "user"} Actions</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Paste id of {  (globalField==="users") ? "bank" : "user"} to add:
              </DialogContentText>
              <TextField
          label="id of element to add"
          onChange={(e) => handleChange('id', e.target.value)}
          fullWidth
          margin="normal"
        />
                <DialogActions>
              <Button onClick={handleAdd} color="primary">
                Add
              </Button>

          </DialogActions>
              {(data.length===0) ? "no items" : <div className="list-item-container">
                  {data.map((dataItem, index) => (
                      (globalField==="users") ? <BankListItem key={index}
                                    field={dataItem}
                                    showEdit={false}
                                    user_id={id}
                                    globalField={globalField}
                                    deleteNotif={()=>handleDelete(dataItem.id)} /> :
                           <UserListItem key={index}
                                         field={dataItem}
                                         deleteNotif={()=>handleDelete(dataItem.id)}
                                             showEdit={false}
                                             globalField={globalField}
                                 />

                  ))}
              </div>}

          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose} color="primary">
                  Close
              </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export default AllFieldDialog;