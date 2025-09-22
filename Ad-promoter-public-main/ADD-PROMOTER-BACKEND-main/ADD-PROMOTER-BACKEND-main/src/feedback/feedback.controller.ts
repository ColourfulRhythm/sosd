import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../auth/guard";
import {ApiBearerAuth, ApiTags, ApiQuery} from "@nestjs/swagger";
import {FeedbackService} from "./feedback.service";
import {GetUser} from "../auth/decorator";
import {UserDocument} from "../user/schemas/user.schema";
import {FeedbackDto} from "./dto/FeedbackDto";
import { ApiGenericOkResponse } from "src/shared/response.service/apiGenericOkResponse";
import { FeedbackSchemaDto } from "./dto/feedback.schema.dto";
import { ApiOkPaginatedResponse } from "src/shared/response.service/apiOkPaginatedResponse";

@UseGuards(JwtGuard)
@ApiTags('Feedback')
@Controller('feedback')
@ApiBearerAuth()
export class FeedbackController{
    constructor(
        private readonly feedbackService: FeedbackService
    ) {}

    @Post('create')
    @ApiGenericOkResponse(FeedbackSchemaDto)
    public async reportAd(
        @Body() feedbackDto: FeedbackDto,
        @GetUser() user: UserDocument,
    ){
        try{
            return this.feedbackService.submitFeedback(feedbackDto, user)
        }catch (e){
            throw e;
        }
    }

    @Get()
    @ApiOkPaginatedResponse(FeedbackSchemaDto)
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
            return this.feedbackService.getAllFeedback(page, pageSize)
        }catch (e){
            throw e;
        }
    }
}