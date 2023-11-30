import { CreateTaxiDTO } from "./taxi.dto";

export class CreateOrderDTO {
    type: string;
    cars:CreateTaxiDTO[]
}