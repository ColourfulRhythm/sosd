import {Controller, Get, Param, Put, Query, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../auth/guard";
import {ApiBearerAuth, ApiTags, ApiQuery} from "@nestjs/swagger";
import {NotificationsService} from "./notifications.service";
import {GetUser} from "../auth/decorator";
import {UserDocument} from "../user/schemas/user.schema";
import { NotificationSchemaDto } from "./dtos/notifications.schema.dto";
import { ApiOkPaginatedResponse } from "src/shared/response.service/apiOkPaginatedResponse";
import { ApiGenericOkResponse } from "src/shared/response.service/apiGenericOkResponse";

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @Get()
    @ApiQuery({
        type: Number,
        name: "page",
        example: 1,
        required: false,
        description: "should be a non zero positive integer"
    })
    @ApiQuery({
        type: Number,
        name: "pageSize",
        example: 10,
        required: false,
        description: "should be a non zero positive integer"
    })
    @ApiOkPaginatedResponse(NotificationSchemaDto)
    public async allNotifications(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @GetUser() user: UserDocument,
    ){
        try{
            return this.notificationsService.getAllNotifications(page, pageSize, user);
        }catch (e) {
            throw e;
        }
    }

    @Get('status/:status')
    @ApiOkPaginatedResponse(NotificationSchemaDto)
    @ApiQuery({
        type: Number,
        name: "page",
        example: 1,
        required: false,
        description: "should be a non zero positive integer"
    })
    @ApiQuery({
        type: Number,
        name: "pageSize",
        example: 10,
        required: false,
        description: "should be a non zero positive integer"
    })
    @ApiQuery({
        type: Boolean,
        name: "status"
    })
    public async allNotificationsByStatus(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Param('status') status: boolean = false,
        @GetUser() user: UserDocument,
    ){
        try{
            return this.notificationsService.getUnreadNotifications(status, page, pageSize, user);
        }catch (e) {
            throw e;
        }
    }

    @Put('markAsRead/:notificationId')
    @ApiGenericOkResponse(NotificationSchemaDto)
    public async markAsRead(
        @Param('notificationId') notificationId: string,
        @GetUser() user: UserDocument,
    ){
        try{
            return this.notificationsService.MarkNotificationAsRead(notificationId, user);
        }catch (e) {
            throw e;
        }
    }
}