import { Counter } from '../components/counter';
import { Logger } from '../components/logger';

export const EventPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Counter/>
      <Logger/>
    </div>
  )
};
