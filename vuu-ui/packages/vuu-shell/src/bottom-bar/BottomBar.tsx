import { useServerConnectionStatus } from "@finos/vuu-data";
import React from "react";
import ConnectionStatusIcon from "../connection/ConnectionStatusIcon";
import './BottomBar.css';

export const BottomBar = () => {
    let connectionStatus = useServerConnectionStatus();
    return (
        <div className="bottom-bar">
        <ConnectionStatusIcon connectionStatus={connectionStatus} data-icon />
        </div>
    )
};