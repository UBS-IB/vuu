import { ConnectionStatusIcon } from "@finos/vuu-shell/src/connection/ConnectionStatusIcon";
import React from "react";

export const DisconnectedStatus = () => {
  let connectionStatus = 'disconnected';
  return <ConnectionStatusIcon connectionStatus={connectionStatus} data-icon />
}