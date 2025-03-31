import { Context } from 'effect';
import { EventService } from './types';

export class EventServiceContext extends Context.Tag("EventService")<EventServiceContext, EventService>() {}