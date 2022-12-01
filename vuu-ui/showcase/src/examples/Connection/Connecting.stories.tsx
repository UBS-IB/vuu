import ConnectionStatusIcon from "@finos/vuu-shell/src/connection/ConnectionStatusIcon";
import React from "react";

export const ConnectingStatus = () => {
  let connectionStatus = 'connecting';
  return <ConnectionStatusIcon connectionStatus={connectionStatus} data-icon />
}