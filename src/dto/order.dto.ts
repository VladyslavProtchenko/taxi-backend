import { IsEmail } from "class-validator";

export class orderDto {

    readonly name: string;
    readonly name2: string;
    readonly name3: string;

    readonly title: string;
    readonly title2: string;
    readonly title3: string;

    @IsEmail()
    readonly email: string;
    @IsEmail()
    readonly email2: string;
    @IsEmail()
    readonly email3: string;

    readonly phone: string;
    readonly phone2: string;
    readonly phone3: string;

    readonly date: string;
    readonly time: string;

    readonly dateNow: boolean;
    readonly from: string;
    readonly to: string;

    readonly stops: { [key: string]: string };

    readonly flight: {
        title: string;
        prefix: string;
        number: string;
    };
    readonly flight2: {
        title: string;
        prefix: string;
        number: string;
    };


    readonly departure: string;
    readonly departure2: string;

    readonly tripType: string;

    readonly paymentMethod: string;
    readonly additionalText: string;

    readonly isReturnTrip: boolean;

    readonly carType: string;
    readonly adults: number;
    readonly kids: number[];
    readonly babies: number;

    readonly baggage: [{
        title: string,
        quantity: number,
    }]
    readonly sport: [{
        title: string,
        quantity: number,
    }]
    readonly pets: [{
        isOther?:boolean,
        title: string,
        cage:boolean,
        quantity: number,
    }]
    readonly carSeats: [{
        title: string,
        quantity: number,
    }]
}

