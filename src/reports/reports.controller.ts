import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dtos/create-report.dto";
import { AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { ReportDto } from "./dtos/report.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
import { AdminGuard } from "../guards/admin.guard";
@Controller('reports')

export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  createEstimate(@Query() query: GetEstimateDto){
    return this.reportsService.createEstimate(query);
    
  }
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@CurrentUser() user:User,@Body() body: CreateReportDto ){
    return this.reportsService.create(user,body);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id:string, @Body() body: ApproveReportDto){
    return this.reportsService.changeApproval(id,body.approved);
  }

}
