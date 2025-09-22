import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AdsService} from "../ads/ads.service";
import {UserDocument} from "../user/schemas/user.schema";
import {FeedbackDto} from "./dto/FeedbackDto";
import {FeedbackDocument} from "./schema/feedback.schema";

@Injectable()
export class FeedbackService{
    constructor(
        @InjectModel('Feedback')
        private readonly feedbackModel: Model<FeedbackDocument>,
        private readonly adService: AdsService,
    ){}

    public async submitFeedback(feedbackDto: FeedbackDto, user: UserDocument ){
        const feedback = new this.feedbackModel({
            feedback: feedbackDto.report,
            user: user,
        })

        feedback.save();
        return {
            success: true,
            data: feedback,
            msg: "Feedback sent successfully"
        }
    }

    public async getAllFeedback(page: number, pageSize: number){
        const feedback = await this.feedbackModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        return {
            success: true,
            data: feedback,
            msg: "Feedback query successfully"
        }
    }
}