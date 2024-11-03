import { Expose, Type } from "class-transformer";
import { ReportSummaryDto } from "./report-summary.dto";
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string

  @Expose()
  @Type(() => ReportSummaryDto) // Transform reports to include only selected fields
  reports: ReportSummaryDto[];
}