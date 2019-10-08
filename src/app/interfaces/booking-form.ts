import { Time } from '@angular/common';

export interface bookingForm {
    username: string,
    museumid : string,
    date: Date,
    time: Time,
    numpeople:number
}
