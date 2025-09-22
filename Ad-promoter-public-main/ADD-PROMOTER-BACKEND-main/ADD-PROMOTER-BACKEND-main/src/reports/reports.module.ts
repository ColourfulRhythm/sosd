import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Reports, ReportsSchema} from "./schema/reports.schema";
import {AdsModule} from "../ads/ads.module";
import {ReportsController} from "./reports.controller";
import {ReportsService} from "./reports.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Reports.name,
                schema: ReportsSchema
            }
        ]),
        AdsModule
    ],
    controllers: [ReportsController],
    providers: [ReportsService],
    exports: [ReportsService]
})
export class ReportsModule {}