import React, { useEffect, useState } from "react";
import cx from 'classnames';
import './Connection.css';

export interface IconProps {
  connectionStatus: string;
  className?: string;
  props?: any;
  element?: string;
}

const ConnectionStatusIcon = ({ connectionStatus, className, element = 'span', ...props}: IconProps) => {
  const [classBase, setClassBase] = useState<string>('vuuConnectingStatus');
  useEffect(() => {
    switch (connectionStatus) {
      case 'connected':
      case 'reconnected':
        setClassBase('vuuActiveStatus');
        break;
      case 'connecting':
        setClassBase('vuuConnectingStatus');
        break;
      case 'disconnected':
        setClassBase('vuuDisconnectedStatus');
        break;
      default:
        break;
    }
  }, [connectionStatus])
  let statusIcon = React.createElement (
    element,
    {
      ...props,
      className: cx('vuuStatus vuuIcon', classBase, className)
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

export default ConnectionStatusIcon;