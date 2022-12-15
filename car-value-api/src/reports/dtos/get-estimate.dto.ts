import { Transform } from 'class-transformer';
import {
  Min,
  Max,
  IsNumber,
  IsString,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => Number(value))
  @IsLatitude()
  long: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
