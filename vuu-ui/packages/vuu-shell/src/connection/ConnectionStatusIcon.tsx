import React, { ComponentClass, FunctionComponent, HTMLAttributes } from "react";
import cx from 'classnames';
import './ConnectionStatusIcon.css';

interface ConnectionStatusIconProps extends HTMLAttributes<HTMLElement> {
  connectionStatus: string;
  className?: string;
  element?: 'span';
}

const classBase = 'vuuIcon vuuStatus';

export const ConnectionStatusIcon = ({ connectionStatus, className, element='span', ...props}: ConnectionStatusIconProps) => {
  let statusIcon = React.createElement (
    element,
    {
      ...props,
      className: cx({
        ['vuuActiveStatus']: connectionStatus === 'connected' || connectionStatus === 'reconnected',
        ['vuuConnectingStatus']: connectionStatus === 'connecting',
        ['vuuDisconnectedStatus']: connectionStatus === 'disconnected'
      })
    },
  )

  return (
    <div className={`${classBase} vuuStatus-container`}>
      {statusIcon}
      <div className="vuuStatus-text">Status: {connectionStatus.toUpperCase()}</div>
    </div>
)};