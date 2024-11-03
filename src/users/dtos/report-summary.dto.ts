import { Expose } from 'class-transformer';

export class ReportSummaryDto {
  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;
}
