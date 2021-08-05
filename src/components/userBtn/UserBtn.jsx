import React from "react";

import "./userBtn.scss";

export const UserBtn = ({ className, userName, onClick }) => {

    return (
        <button className={className} onClick={onClick}>{userName}</button>
      );
}