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
// const {className: classNameProp, connectionStatus, ...props} = props;

export const ConnectionStatusIcon = ({ connectionStatus, className, element = 'span', ...props}: ConnectionStatusIconProps) => {

  // const [classBase, setClassBase] = useState<string>('vuuConnectingStatus');
  // useEffect(() => {
  //   switch (connectionStatus) {
  //     case 'connected':
  //     case 'reconnected':
  //       setClassBase('vuuActiveStatus');
  //       break;
  //     case 'connecting':
  //       setClassBase('vuuConnectingStatus');
  //       break;
  //     case 'disconnected':
  //       setClassBase('vuuDisconnectedStatus');
  //       break;
  //     default:
  //       break;
  //   }
  // }, [connectionStatus]);


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