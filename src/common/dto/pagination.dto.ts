import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

// Este Dto transforma la data de la forma que se asigna en este DTO 
// gracias a la configuracion en main.ts  transformOptions: { enableImplicitConversion: true}
export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?: number

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number
}