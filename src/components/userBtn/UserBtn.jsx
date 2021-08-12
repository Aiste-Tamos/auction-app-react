import React from "react";
import classNames from "classnames";

import "./userBtn.scss";

export const UserBtn = ({ isActive, userName, onClick }) => {
  const mainClassName = "user-btn";
  const activeBtnClass = classNames(mainClassName, `${mainClassName}--active`);

  return (
    <button
      className={isActive ? activeBtnClass : mainClassName}
      onClick={onClick}
    >
      {userName}
    </button>
  );
};
