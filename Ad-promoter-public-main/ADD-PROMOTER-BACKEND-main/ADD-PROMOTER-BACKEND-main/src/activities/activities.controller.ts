import {
    Controller,
    Get,
    Put,
    Param,
    Query,
    UseGuards,
    Delete, Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags , ApiQuery, ApiParam } from '@nestjs/swagger';
import { Types } from "mongoose"
import { ObjectId } from "mongodb"
import { JwtGuard } from 'src/auth/guard';
import { ParseObjectIdPipe } from 'src/utils/transformers/parseObjectId.pipe';
import { ActivitiesService } from './activities.service';
import RoleGuard from 'src/auth/guard/role.guard';
import { Role } from 'src/user/schemas/user.schema';
import {DeleteTagsDto} from "./dto/create-activity.dto";
import { ApiOkPaginatedResponse } from 'src/shared/response.service/apiOkPaginatedResponse';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { ActivitySchemaDto } from './dto/activity.schema.dto';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Get('all')
    @ApiOkPaginatedResponse(ActivitySchemaDto)
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
    @ApiQuery({
        type: Date,
        name: "startDate",
        example: new Date(Date.now() - 36000000),
        required: false,
        description: "Start date for the query"
    })
    @ApiQuery({
        type: Date,
        name: "endDate",
        example: new Date(Date.now()),
        required: false,
        description: "End date for the query"
    })
    @UseGuards(RoleGuard([Role.ADMIN, Role.SUBADMIN]))
    async findAll(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('startDate') startDate: Date = new Date(-8640000000000000),
        @Query('endDate') endDate: Date = new Date(8640000000000000)
    ) {
        return {
            success: true,
            data: await this.activitiesService.getAllActivities(page, pageSize, startDate, endDate),
        };
    }

    @Get('all/:userId')
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
    @ApiQuery({
        type: Date,
        name: "startDate",
        example: new Date(Date.now() - 36000000),
        description: "Start date for the query"
    })
    @ApiQuery({
        type: Date,
        name: "endDate",
        example: new Date(Date.now()),
        description: "End date for the query"
    })
    @ApiParam({
        name: 'userId',
        description: "should be the mongo Id of a user in the db"
    })
    @ApiOkPaginatedResponse(ActivitySchemaDto)
    async findUserActivities(
        @Param('userId', ParseObjectIdPipe) userId: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('startDate') startDate: Date = new Date(-8640000000000000),
        @Query('endDate') endDate: Date = new Date(8640000000000000)
    ) {
        return {
            success: true,
            data: await this.activitiesService.getActivities(
                userId,
                page,
                pageSize,
                startDate,
                endDate
            ),
        };
    }

    @Get('unread/:id')
    @ApiParam({
        type: Types.ObjectId,
        name: 'id',
        example: new ObjectId,
        description: "should be the mongo Id of a user in the db"
    })
    @ApiOkPaginatedResponse(ActivitySchemaDto)
    async getUnread(@Param('id', ParseObjectIdPipe) id: string) {
        const response = await this.activitiesService.getUnreadActivities(id);
        return { success: true, data: response };
    }

    @ApiParam({
        name: 'id',
        example: new ObjectId,
        description: "should be the mongo Id of a user in the db"
    })
    @ApiParam({
        name: 'activityId',
        example: new ObjectId,
        description: "should be the mongo Id of an activity in the db"
    })
    @Put('markAsRead/:id/:activityId')
    public async markAsread(
        @Param('id', ParseObjectIdPipe) id: string,
        @Param('activityId', ParseObjectIdPipe) activityId: string,
    ) {
        const response = this.activitiesService.markAsRead(id, activityId);
        return { success: true, data: response };
    }

    @Delete()
    async deleteActivity(
        @Body() dto: DeleteTagsDto,
    ) {
        return {
            success: true,
            data: await this.activitiesService.deleteActivity(dto.activities),
        };
    }
}
