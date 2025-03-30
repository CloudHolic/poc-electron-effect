import { Context } from 'effect';
import { EventService } from '@/services/events/types';

export class EventServiceContext extends Context.Tag("EventService")<EventServiceContext, EventService>() {}