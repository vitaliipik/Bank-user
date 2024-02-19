import UserEditDialog from "./UserEditDialog";
import React, {useState} from "react";
import DeleteDialog from "./DeleteDialog";
import AllFieldDialog from "./AllFieldDialog";
import {Button} from "@mui/material";

const UserListItem = ({field, onEditUser, onDeleteUser,showEdit=true,globalField,deleteNotif}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const handleEditDeleteClose = () => {
        setIsDialogOpen(false);
    };
    const handleEdit = (editedUser) => {
        editedUser["id"] = field.id
        onEditUser(editedUser);
    };


    const handleDeleteSuccess = () => {
        onDeleteUser(field.id)
        setIsDialogOpen(false);

    };

    return (
        <div>
            <div className="list-item">


                <h3>{field.first_name} {field.last_name}</h3>
                <p>
                    <span>{field.username}</span>
                    {field.email}
                </p>

            </div>
            <div className="button-class">

           {showEdit &&      <UserEditDialog
                    userId={field.id}
                    onClose={handleEditDeleteClose}
                    onEditSuccess={handleEdit}
                />}


                   { (showEdit===true) ?  <DeleteDialog
                        globalField="users"
                        id={field.id}
                        onClose={handleEditDeleteClose}
                        onDeleteSuccess={handleDeleteSuccess}

                    />:  <Button onClick={deleteNotif} color="primary">
                delete </Button>}
{showEdit && <AllFieldDialog
    id={field.id}
    globalField="users"
    onClose={handleEditDeleteClose}
/>}
            </div>
        </div>
    )
}

export default UserListItem