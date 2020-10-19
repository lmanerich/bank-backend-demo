import { EventType } from '@src/models/event-type.model';

export interface Event {
    type: EventType;
    amount: number;
    origin?: string;
    destination?: string;
}
