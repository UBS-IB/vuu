import ConnectionStatusIcon from "@finos/vuu-shell/src/connection/ConnectionStatusIcon";
import React from "react";

export const ReconnectedStatus = () => {
  let connectionStatus = 'reconnected';
  return <ConnectionStatusIcon connectionStatus={connectionStatus} data-icon />
}