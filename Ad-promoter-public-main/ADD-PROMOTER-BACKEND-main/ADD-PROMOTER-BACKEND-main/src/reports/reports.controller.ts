import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../auth/guard";
import {ApiBearerAuth, ApiTags, ApiQuery} from "@nestjs/swagger";
import {ReportsService} from "./reports.service";
import {GetUser} from "../auth/decorator";
import {UserDocument} from "../user/schemas/user.schema";
import {CreateReportDto} from "./dto/create-report.dto";
import { ApiGenericOkResponse } from "src/shared/response.service/apiGenericOkResponse";
import { ReportsSchemaDto } from "./dto/reports.schema.dto";
import { ApiOkPaginatedResponse } from "src/shared/response.service/apiOkPaginatedResponse";

@UseGuards(JwtGuard)
@ApiTags('Reports')
@Controller('reports')
@ApiBearerAuth()
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService
    ) {
    }

    @Post('create')
    @ApiGenericOkResponse(ReportsSchemaDto)
    public async reportAd(
        @Body() createReportDto: CreateReportDto,
        @GetUser() user: UserDocument,
    ){
        try{
            return this.reportsService.submitReport(createReportDto, user)
        }catch (e) {
            throw e;
        }
    }

    @Get('reportedAds')
    @ApiOkPaginatedResponse(ReportsSchemaDto)
    @ApiQuery({
        type: Number,
        name: "page",
        example: 1,
        description: "should be a non zero positive integer"
    })
    @ApiQuery({
        type: Number,
        name: "pageSize",
        example: 10,
        description: "should be a non zero positive integer"
    })
    public async reportedAds(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ){
        try{
            return this.reportsService.reportedAds(page, pageSize)
        }catch (e) {
            throw e;
        }
    }

    @Get('adReports/:adId')
    public async adReports(
        @Param('adId') adId: string,
    ){
        try{
            return this.reportsService.getAdsReports(adId)
        }catch (e) {
            throw e;
        }
    }
}