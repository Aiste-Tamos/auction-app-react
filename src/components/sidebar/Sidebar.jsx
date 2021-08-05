import React from "react";
import classNames from "classnames";

import "./sidebar.scss";

export const Sidebar = ({ className, ...other }) => {
    const mainClassName = "sidebar";
    const mainClass = classNames(mainClassName, className);
    
    return (
        <aside className={mainClass} {...other}>This will be active auctions sidebar</aside>
    );
}