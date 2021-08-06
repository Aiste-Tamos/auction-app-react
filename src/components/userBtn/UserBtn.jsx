import React, { useState } from "react";

import "./userBtn.scss";

export const UserBtn = ({ isActive, userName, onClick }) => {

  const mainClassName = "user-btn";

    return (
        <button className={isActive ? `${mainClassName}--active` : mainClassName} onClick={onClick}>{userName}</button>
      );
}