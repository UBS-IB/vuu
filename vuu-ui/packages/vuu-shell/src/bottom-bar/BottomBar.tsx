import React from "react";
import ConnectionStatusIcon from "../connection/ConnectionStatusIcon";
import './BottomBar.css';

export const BottomBar = () => {
    return (
        <div className="bottom-bar">
        <ConnectionStatusIcon data-icon />
        </div>
    )
};