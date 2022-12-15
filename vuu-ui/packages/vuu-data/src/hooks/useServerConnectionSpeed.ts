import { useCallback, useEffect, useState } from 'react';
import { ConnectionManager } from '../connection-manager';

export const useServerConnectionSpeed = () => {
    const [messagesPerSecond, setMessagesPerSecond] = useState<number>(0);

    const handleConnectivityMessage = useCallback((evt, { messages }) => {
        setMessagesPerSecond(messages.messagesLength);
    }, []);

    useEffect(() => {
        ConnectionManager.on('connection-metrics', handleConnectivityMessage);
        return () => {
            ConnectionManager.removeListener('connection-metrics', handleConnectivityMessage);
        }
    }, [handleConnectivityMessage]);

    return messagesPerSecond;
}