import { useEventEmit, useEventState } from '../hooks/useEvent';
import type { CounterState, UserAction } from '../types/event-types';
import { useCallback } from 'react';
import { EVENT_TYPES } from '../services/events/eventTypes';
import { Button } from './ui/button';
import { Label } from './ui/label';

export const Counter = () => {
  const emitEvent = useEventEmit();

  const counterState = useEventState<CounterState>(EVENT_TYPES.COUNTER_UPDATED, { count: 0 });

  const handleIncrement = useCallback(() => {
    emitEvent<CounterState>(EVENT_TYPES.COUNTER_UPDATED, { count: counterState.count + 1 });

    emitEvent<UserAction>(EVENT_TYPES.USER_ACTION, {
      action: 'increment',
      timestamp: new Date()
    });
  }, [counterState.count, emitEvent]);

  const handleDecrement = useCallback(() => {
    emitEvent<CounterState>(EVENT_TYPES.COUNTER_UPDATED, { count: counterState.count - 1 });

    emitEvent<UserAction>(EVENT_TYPES.USER_ACTION, {
      action: 'decrement',
      timestamp: new Date()
    });
  }, [counterState.count, emitEvent]);

  return (
    <div>
      <Label>Counter: {counterState.count}</Label>
      <Button className="border-2" onClick={handleIncrement}>Increment</Button>
      <Button className="border-2" onClick={handleDecrement}>Decrement</Button>
    </div>
  );
};
