import { ConnectionStatusIcon } from "@finos/vuu-shell/src/connection/ConnectionStatusIcon";
import React from "react";

export const ActiveStatus = () => {
  let connectionStatus = 'connected';
  return <ConnectionStatusIcon connectionStatus={connectionStatus} data-icon />
}