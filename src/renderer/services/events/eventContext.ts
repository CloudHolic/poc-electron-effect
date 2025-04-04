import { Context } from 'effect';
import { EventService } from '../../types/events';

export class EventServiceContext extends Context.Tag("EventService")<EventServiceContext, EventService>() {}