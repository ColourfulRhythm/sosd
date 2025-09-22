import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Body,
  Post,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { PromotionService } from './promotion.service';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Role, UserDocument } from 'src/user/schemas/user.schema';
import { VisualPromotionDto } from './dto/visual-promotion.dto';
import RoleGuard from 'src/auth/guard/role.guard';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { PromotionSchemaDto } from './dto/promotion.schema.dto';
import { ApiOkPaginatedResponse } from 'src/shared/response.service/apiOkPaginatedResponse';
import { UserSchemaDto } from 'src/user/dto/user.schema.dto';
import { PromotionStatus } from './schemas/promotion.schema';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Promotions')
@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @UseGuards(RoleGuard(Role.PROMOTER))
  @Post('visual')
  @ApiGenericOkResponse(PromotionSchemaDto)
  promoteVisualAd(
    @Body() dto: VisualPromotionDto,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.promotionService.promoteVisualAd(dto, user);
    } catch (error) {
      throw error;
    }
  }

  @Get('user-promotions/:userId')
  @ApiQuery({
    type: Number,
    name: 'page',
    example: 1,
    description: 'should be a non zero positive integer',
  })
  @ApiQuery({
    type: Number,
    name: 'pageSize',
    example: 10,
    description: 'should be a non zero positive integer',
  })
  @ApiOkPaginatedResponse(PromotionSchemaDto)
  getPromotersPromotion(
    @Param() params: { userId: string },
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      console.log(params);
      return this.promotionService.getUserPromotions(
        '651ecd81ad7350c7d4923dcc',
        page,
        pageSize,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOkPaginatedResponse(PromotionSchemaDto)
  @ApiQuery({
    type: Number,
    name: 'page',
    example: 1,
    description: 'should be a non zero positive integer',
  })
  @ApiQuery({
    type: Number,
    name: 'pageSize',
    example: 10,
    description: 'should be a non zero positive integer',
  })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      return {
        success: true,
        data: await this.promotionService.findAll(page, pageSize),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard([Role.SUBADMIN, Role.ADMIN]))
  @Get('total-promotions')
  async getDetailedPromotionCount() {
    try {
      return {
        success: true,
        data: await this.promotionService.getDetailedPromotionCount(),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard([Role.SUBADMIN, Role.ADMIN]))
  @Get('unapproved-visual-promotions')
  @ApiOkPaginatedResponse(PromotionSchemaDto)
  @ApiQuery({
    type: Number,
    name: 'page',
    example: 1,
    description: 'should be a non zero positive integer',
  })
  @ApiQuery({
    type: Number,
    name: 'pageSize',
    example: 10,
    description: 'should be a non zero positive integer',
  })
  async getUnapprovedVisualAds(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      return {
        success: true,
        data: await this.promotionService.getUnapprovedVisualPromotions(
          page,
          pageSize,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard([Role.SUBADMIN, Role.ADMIN]))
  @Get('top-promoters')
  @ApiGenericOkResponse(UserSchemaDto)
  async getTopPromoters(@Query('pageSize', ParseIntPipe) pageSize: number) {
    try {
      return {
        success: true,
        data: await this.promotionService.getTopPromoters(pageSize),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiGenericOkResponse(PromotionSchemaDto)
  async findOne(@Param('id') id: string) {
    try {
      return {
        success: true,
        data: await this.promotionService.findOne(id),
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiGenericOkResponse(PromotionSchemaDto)
  remove(@Param('id') id: string, @GetUser() user: UserDocument) {
    try {
      return this.promotionService.remove(id, user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard(Role.PROMOTER))
  @Get('promote/:adID')
  create(@Param('adID') adID: string, @GetUser() user: UserDocument) {
    return this.promotionService.create(adID, user);
  }

  @ApiParam({
    name: 'promotionId',
    example: new ObjectId(),
    description: 'should be the mongo Id of a promotion in the db',
  })
  @ApiQuery({
    enum: PromotionStatus,
    type: String,
    name: 'status',
    required: true,
  })
  @ApiGenericOkResponse(PromotionSchemaDto)
  @UseGuards(RoleGuard([Role.SUBADMIN, Role.ADMIN]))
  @Put('update-visual/:promotionId')
  approveVisualAd(
    @Param('promotionId') promotionId: string,
    @Query('status') status: PromotionStatus,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.promotionService.updateVisualPromotion(
        promotionId,
        user.id,
        status,
      );
    } catch (error) {
      throw error;
    }
  }
}
