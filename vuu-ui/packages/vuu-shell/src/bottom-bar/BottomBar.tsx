import { useServerConnectionStatus } from "@finos/vuu-data";
import { ConnectionStatusIcon } from "../connection";
import './BottomBar.css';

export const BottomBar = () => {
    let connectionStatus = useServerConnectionStatus();
    return (
        <div className="vuuBottomBar">
        <ConnectionStatusIcon connectionStatus={connectionStatus} data-icon />
        </div>
    )
};