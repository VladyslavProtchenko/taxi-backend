export class CreateTaxiDTO {

    readonly timeType: number;
    readonly timeTypeR: number;

    readonly name: string;
    readonly name2: string;
    readonly name3: string;

    readonly title: string;
    readonly title2: string;
    readonly title3: string;

    readonly email: string;
    readonly email2: string;
    readonly email3: string;

    readonly phone: string;
    readonly phone2: string;
    readonly phone3: string;

    readonly date: string;
    readonly time: string;

    readonly dateNow: boolean;
    readonly from: string;
    readonly to: string;

    readonly stops: { [key: number]: string };

    readonly icon: number;
    readonly icon2: number;
    readonly flight: string;
    readonly flight2: string;

    readonly airlines: string;
    readonly airlinesBack: string;

    readonly departure: string;
    readonly departure2: string;

    readonly tripType: string;

    readonly paymentMethod: string;
    readonly additionalText: string;

    readonly isReturnTrip: boolean;

    readonly fromR: string;
    readonly toR: string;
    readonly stopsR: { [key: number]: string };

    readonly dateR: string;
    readonly timeR: string;

    readonly iconR: number;
    readonly icon2R: number;
    readonly flightR: string;
    readonly flight2R: string;
    readonly airlinesR: string;
    readonly airlinesBackR: string;
    readonly departureR: string;
    readonly departure2R: string;

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
