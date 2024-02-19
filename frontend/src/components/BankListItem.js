
import React, {useState} from "react";
import DeleteDialog from "./DeleteDialog";
import BankEditDialog from "./BankEditDialog";
import {Button} from "@mui/material";
import AllFieldDialog from "./AllFieldDialog";

const BankListItem = ({field, onEdit, onDelete,showEdit=true,deleteNotif}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const handleEditDeleteClose = () => {
        setIsDialogOpen(false);
    };
    const handleEdit = (editedBank) => {
        editedBank["id"] = field.id
        onEdit(editedBank);
    };



    const handleDeleteSuccess = () => {
        onDelete(field.id)
        setIsDialogOpen(false);

    };

    return (
        <div>
            <div className="list-item">


                <h3>{field.bank_name}</h3>
                <p>
                    <span>routing number: {field.routing_number}</span>
                    swift bic :{field.swift_bic}
                </p>

            </div>
            <div className="button-class">

                {showEdit && <BankEditDialog
                    bankId={field.id}
                    onClose={handleEditDeleteClose}
                    onEditSuccess={handleEdit}
                />}


                { (showEdit===true) ? <DeleteDialog
                        globalField="banks"
                        id={field.id}
                        onClose={handleEditDeleteClose}
                        onDeleteSuccess={handleDeleteSuccess}

                    /> :  <Button onClick={deleteNotif} color="primary">
                delete

              </Button>}
{showEdit && <AllFieldDialog
    id={field.id}
    globalField="banks"
    onClose={handleEditDeleteClose}
/>}
            </div>
        </div>
    )
}

export default BankListItem