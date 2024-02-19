import React, {useEffect, useState} from "react";
import BankListItem from "../components/BankListItem";
import AddDialog from "../components/AddDialog";


const BankListPage = () => {

    let [banks, setBanks] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    useEffect(() => {
            getBanks()
        },
        [])

     const handleAddClose = () => {
        setIsDialogOpen(false);
    };
    const handleAdd = () => {
      getBanks();
       setIsDialogOpen(false);
    };

    const handleEdit = (editedBank) => {

        const index = banks.findIndex(bank => bank.id === editedBank.id);
        if (index !== -1) {
            setBanks(prevBanks => [
                ...prevBanks.slice(0, index),
                editedBank,
                ...prevBanks.slice(index + 1)
            ]);
        }
    };
    const handleDelete = (id) => {
        const updatedBanks = banks.filter(bank => bank.id !== id);
        setBanks(updatedBanks);
    };
    let getBanks = async () => {
        let response = await fetch('/api/banks/')
        let data = await response.json()
        setBanks(data)
    }


    return (
        <div className="bank">

            <div className="header">
                <h2 className="title">Bank</h2>
                <AddDialog
                    globalField="banks"
                    onClose={handleAddClose}
                    onAddSuccess={handleAdd}
                />
            </div>
            <div className="list-item-container">
                {banks.map((bank, index) => (
                    <BankListItem key={index}
                                  field={bank}
                                  onEdit={handleEdit}
                                  onDelete={handleDelete}/>
                ))}
            </div>

        </div>
    )
}
export default BankListPage