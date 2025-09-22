import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Feedback, FeedbackSchema} from "./schema/feedback.schema";
import {AdsModule} from "../ads/ads.module";
import {FeedbackController} from "./feedback.controller";
import {FeedbackService} from "./feedback.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Feedback.name,
                schema: FeedbackSchema
            }
        ]),
        AdsModule
    ],
    controllers: [FeedbackController],
    providers: [FeedbackService]
})
export class FeedbackModule {}