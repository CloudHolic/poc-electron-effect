import { useState } from 'react';
import { UserAction } from '../types/event-types';
import { useEventOn } from '../hooks/useEvent';
import { EVENT_TYPES } from '../services/events/eventTypes';
import { Label } from './ui/label';

export const Logger = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEventOn<UserAction>(EVENT_TYPES.USER_ACTION, (data) => {
    setLogs((prev) => [
      ...prev,
      `[${data.timestamp.toLocaleTimeString()} Action: ${data.action}]`
    ]);
  });

  return (
    <div>
      <Label>Logs</Label>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};
