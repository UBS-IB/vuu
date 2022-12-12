import React, { HTMLAttributes, useEffect, useState } from "react";
import cx from 'classnames';
import './Connection.css';

interface ConnectionStatusIconProps extends HTMLAttributes<HTMLDivElement> {
  connectionStatus: string;
  className?: string;
  props?: any;
  element?: string;
}

const classBase = 'vuuIcon vuuStatus';

export const ConnectionStatusIcon = ({ connectionStatus, className, element = 'span', ...props}: ConnectionStatusIconProps) => {
  let statusIcon = React.createElement (
    element,
    {
      ...props,
      className: cx(classBase, {
        ['vuuActiveStatus']: connectionStatus === 'connected' || connectionStatus === 'reconnected',
        ['vuuConnectingStatus']: connectionStatus === 'connecting',
        ['vuuDisconnectedStatus']: connectionStatus === 'disconnected'
      })
    },
  )

  return (
    <>
    <div className="vuuStatus-container">
      {statusIcon}
      <div className="vuuStatus-text">Status: {connectionStatus.toUpperCase()}</div>
    </div>
    </>
)};