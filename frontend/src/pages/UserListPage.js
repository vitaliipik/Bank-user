import React, {useEffect, useState} from "react";
import UserListItem from "../components/UserListItem";
import AddDialog from "../components/AddDialog";
import {BASE_URL} from '../constant'

const UsersListPage = () => {

    let [users, setUsers] = useState([])
     const [isDialogOpen, setIsDialogOpen] = useState(true);
    useEffect(() => {
            getUsers()
        },
        [])
         const handleAddClose = () => {
        setIsDialogOpen(false);
    };
    const handleAdd = () => {
      getUsers().then(r => setIsDialogOpen(false));

    };

    const handleEditUser = (editedUser) => {

    const index = users.findIndex(user => user.id === editedUser.id);
    if (index !== -1) {
      setUsers(prevUsers => [
        ...prevUsers.slice(0, index),
        editedUser,
        ...prevUsers.slice(index + 1)
      ]);
    }
  };
      const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };
    let getUsers = async () => {
        let response = await fetch(BASE_URL+'/users/')
        let data = await response.json()
        setUsers(data)
    }
    return (
        <div className="user">

            <div className="notes-header">
<h2 className="title"> User</h2>
                <AddDialog
                    globalField="users"
                    onClose={handleAddClose}
                    onAddSuccess={handleAdd}
                />

            </div>
            <div className="list-item-container">
                {users.map((user,index)=>(
                    <UserListItem key={index}
                                  field={user}
                                  onEditUser={handleEditUser}
                                  onDeleteUser={handleDeleteUser}/>
                ))}
            </div>

        </div>
    )
}
export default UsersListPage