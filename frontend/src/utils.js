import UserListItem from "./components/UserListItem";
import BankListItem from "./components/BankListItem";
import React from "react";

export default function ListItem(globalField,field,showEdit,deleteNotif,user_id,key) {
    return (
        (globalField==="users") ? <BankListItem key={key}
                                    field={field}
                                    showEdit={false}
                                    user_id={user_id}
                                    globalField={globalField}
                                    deleteNotif={deleteNotif} /> :
                              <UserListItem key={key}
                                    field={field}
                                    showEdit={false}
                                    user_id={user_id}
                                    globalField={globalField}
                                    deleteNotif={deleteNotif} />)
};