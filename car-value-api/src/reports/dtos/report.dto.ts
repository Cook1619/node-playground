import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  long: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  // Looks at the report entity, look at its user property and take the id and assign to this value
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
