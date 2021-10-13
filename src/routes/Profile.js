import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";

export default () => {
    const hisory = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        hisory.push("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
