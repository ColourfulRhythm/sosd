import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiTags , ApiQuery } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { Role, User, UserDocument } from 'src/user/schemas/user.schema';
import { JwtGuard } from 'src/auth/guard';
import RoleGuard from 'src/auth/guard/role.guard';
import { TransactionService } from './transaction.service';
import { RecipientData } from 'src/payment/dto/create-payment.dto';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { WalletSchemaDto } from './dto/wallet.schema.dto';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletService: WalletService,
        private readonly transactionService: TransactionService,
    ) {}

    @UseGuards(RoleGuard(Role.PROMOTER))
    @Get('fetch-recipient')
    async getRecipient(@GetUser() user: UserDocument) {
        try {
            return {
                success: true,
                data: await this.walletService.getUserRecipientDetails(user),
            };
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(RoleGuard(Role.PROMOTER))
    @Post('create-recipient')
    async createRecipient(
        @Body() dto: RecipientData,
        @GetUser() user: UserDocument,
    ) {
        try {
            return {
                success: true,
                data: await this.walletService.createRecipient(user, dto),
            };
        } catch (err) {
            throw err;
        }
    }

    @UseGuards(RoleGuard(Role.PROMOTER))
    @ApiGenericOkResponse(WalletSchemaDto)
    @Get('retrieve')
    async findOne(@GetUser() user: User) {
        try {
            return {
                success: true,
                data: await this.walletService.findOne(user),
            };
        } catch (err) {
            throw err;
        }
    }

    @Get('wallet-summary')
    async getWalletSummary(@GetUser() user: UserDocument) {
        try {
            return {
                success: true,
                data: await this.walletService.getWalletSummary(user),
            };
        } catch (err) {
            throw err;
        }
    }

    @Get('transactions')
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
    async getTransactions(
        @GetUser() user: UserDocument,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ) {
        return {
            success: true,
            data: await this.transactionService.fetchUserTransactions(
                user.id,
                page,
                pageSize,
            ),
        };
    }

    @UseGuards(RoleGuard(Role.ADMIN))
    @Get('all/transactions')
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
    async getAllTransactions(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ) {
        return {
            success: true,
            data: await this.transactionService.fetchAllTransactions(
                page,
                pageSize,
            ),
        };
    }
}
