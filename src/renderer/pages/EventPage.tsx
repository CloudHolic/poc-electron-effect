import { Counter } from '../components/Counter';
import { Logger } from '../components/Logger';

export const EventPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Counter/>
      <Logger/>
    </div>
  )
};
