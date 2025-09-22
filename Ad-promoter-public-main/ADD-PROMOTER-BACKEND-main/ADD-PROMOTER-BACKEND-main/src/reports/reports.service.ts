import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ReportsDocument} from "./schema/reports.schema";
import {CreateReportDto} from "./dto/create-report.dto";
import {AdsService} from "../ads/ads.service";
import {UserDocument} from "../user/schemas/user.schema";

@Injectable()
export class ReportsService{
    constructor(
        @InjectModel('Reports')
        private readonly reportsModel: Model<ReportsDocument>,
        private readonly adService: AdsService,
    ){}

    public async submitReport(createReportDto: CreateReportDto, user: UserDocument ){
        const ad = await this.adService.findOne(createReportDto.adsId)

        const report = new this.reportsModel({
            ad: createReportDto.adsId,
            reportReason: createReportDto.report,
            user: user,
        })

        report.save();
        ad.reports.push(report)
        ad.save();
        return {
            success: true,
            data: report,
            msg: "Ad reported successfully"
        }
    }

    public async reportedAds(page: number, pageSize: number,){
        return await this.adService.GetReportedAds(page, pageSize);
    }

    public async getAdsReports(ads: string){
        const adReports = await this.adService.getAdsReports(ads);
        return {
            success: true,
            data: {
                adReports: adReports,
                reportedTimes: await this.reportedTime(ads)
            },
            msg: "Ad reported successfully"
        }
    }

    public async reportedTime(adId: string){
        return this.reportsModel.count({ad: adId}).exec();
    }
}