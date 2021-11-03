import React, { useEffect, useState  } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import { updateProfile } from "firebase/auth";

export default ({ userObj }) => {
    const hisory = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        hisory.push("/");
    };
    const onChange = (event) => {
        const {
            target:{ value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== "newDisplayName") {
            await updateProfile(userObj, {
                displayName: newDisplayName,
            })
        }
    }
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
