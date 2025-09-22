import { Controller, Get, Post, Body, UseGuards, Query, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags , ApiQuery, ApiParam } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import RoleGuard from 'src/auth/guard/role.guard';
import { Role, UserDocument } from 'src/user/schemas/user.schema';
import { PayoutsDto, processPayoutDto } from './dto/payout.dto';
import { PayoutsService } from './payouts.service';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { PayoutsSchemaDto } from './dto/payout.schema.dto';
import { ApiOkPaginatedResponse } from 'src/shared/response.service/apiOkPaginatedResponse';
import { Status } from './schema/payouts.schema';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

@UseGuards(JwtGuard)
@ApiTags('Payouts')
@Controller('payouts')
@ApiBearerAuth()
export class PayoutsController {
    constructor(private readonly payoutsService: PayoutsService) {}

    @Post('create')
    @ApiGenericOkResponse(PayoutsSchemaDto)
    async createPayout(
        @Body() payoutDto: PayoutsDto,
        @GetUser() user: UserDocument,
    ) {
        try {
            return {
                success: true,
                data: await this.payoutsService.requestPayout(user, payoutDto),
            };
        } catch (err) {
            throw err;
        }
    }

    @ApiParam({
        name: 'payoutId',
        example: new ObjectId,
        description: "should be the mongo Id of a payout in the db"
    })
    @ApiQuery({
        enum: Status,
        type: String,
        name: "status",
        required: true
    })
    @UseGuards(RoleGuard([Role.ADMIN, Role.SUBADMIN]))
    @ApiGenericOkResponse(PayoutsSchemaDto)
    @Put('process/:payoutId')
    async processPayout(
        @Param("payoutId") payoutId: string,
        @Query("status") status: string
    ) {
        try {
            return {
                success: true,
                data: await this.payoutsService.processPayouts({payoutId, status}),
                msg: "payout processed successfully"
            };
        } catch (err) {
            throw err;
        }
    }

    @UseGuards(RoleGuard([Role.SUBADMIN,Role.ADMIN]))
    @Get('pending')
    @ApiOkPaginatedResponse(PayoutsSchemaDto)
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
    async getPendingPayouts(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ) {
        try {
            return {
                success: true,
                data: await this.payoutsService.getPendingPayouts(
                    page,
                    pageSize,
                ),
            };
        } catch (err) {
            throw err;
        }
    }

    @Get('history')
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
    @ApiOkPaginatedResponse(PayoutsSchemaDto)
    async getUserPayouts(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @GetUser() user: UserDocument,
    ) {
        return {
            success: true,
            data: await this.payoutsService.getUserPayouts(
                user.id,
                page,
                pageSize,
            ),
        };
    }
}
