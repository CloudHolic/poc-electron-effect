import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { EventPage } from './EventPage';
import { CachePage } from './CachePage';

export const MainTab = () => {
  return (
    <div className="flex h-full flex-1">
      <Tabs className="flex w-full flex-col items-center">
        <TabsList className="my-1 flex w-full justify-evenly">
          <TabsTrigger value="Cache">Cache</TabsTrigger>
          <TabsTrigger value="Event">Event</TabsTrigger>
        </TabsList>

        <TabsContent value="Cache" className="border-2 h-full w-full flex-1">
          <CachePage/>
        </TabsContent>
        <TabsContent value="Event" className="border-2 h-full w-full flex-1">
          <EventPage/>
        </TabsContent>
      </Tabs>
    </div>
  )
}