import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
  ParseBoolPipe,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AdType } from './schemas/ad.schema';

import { ObjectId } from 'mongodb';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { GetUser, IpAddress } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Role, UserDocument } from 'src/user/schemas/user.schema';
import { AdsService } from './ads.service';
import { CreateAdDto, VerifyAdPaymentDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { ClickManagementService } from 'src/clicks-management/clicks-management.producer.service';
import RoleGuard from 'src/auth/guard/role.guard';
import { AdStatus } from './schemas/ad.schema';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { CreateAdResponse } from './dto/createAdResponse';
import { ApiOkPaginatedResponse } from 'src/shared/response.service/apiOkPaginatedResponse';
import { AdSchemaDto } from './dto/ads.schema.dto';

@Controller('ads')
@ApiTags('Ads')
export class AdsController {
  constructor(
    private readonly adsService: AdsService,
    private clicksService: ClickManagementService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('create')
  @ApiGenericOkResponse(CreateAdResponse)
  @ApiBearerAuth()
  create(@Body() createAdDto: CreateAdDto, @GetUser() user: UserDocument) {
    try {
      return this.adsService.create(createAdDto, user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
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
  @ApiQuery({
    type: Date,
    name: 'startDate',
    required: false,
    example: new Date(Date.now() - 36000000),
    description: 'Start date for the query',
  })
  @ApiQuery({
    type: String,
    name: 'name',
    example: 'bake',
    required: false,
    description: 'query to search by name',
  })
  @ApiQuery({
    type: Date,
    name: 'endDate',
    example: new Date(Date.now()),
    required: false,
    description: 'End date for the query',
  })
  @ApiQuery({
    name: 'adType',
    enum: AdType,
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'popular',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'recent',
    required: false,
    type: Boolean,
  })
  @Get('recommended')
  @ApiOkPaginatedResponse(AdSchemaDto)
  public async recommendedAds(
    @GetUser() user: UserDocument,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @Query('startDate') startDate: Date = new Date(-8640000000000000),
    @Query('endDate') endDate: Date = new Date(8640000000000000),
    @Query('adType') adType: string = '',
    @Query('recent') recent: boolean = false,
    @Query('popular') popular: boolean = false,
  ) {
    try {
      return this.adsService.recommendedAds(
        user,
        page,
        pageSize,
        name,
        startDate,
        endDate,
        adType,
        recent,
        popular,
      );
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard)
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
  @ApiQuery({
    type: String,
    name: 'tag',
    example: 'music',
  })
  @ApiBearerAuth()
  @Get('searchTag')
  @ApiOkPaginatedResponse(AdSchemaDto)
  public async searchAds(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('tag') tag: string,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.searchAdsByTags(page, pageSize, tag, user);
    } catch (err) {
      throw err;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('top-creators')
  public async topCreators(@Query('pageSize') pageSize: number) {
    try {
      return {
        success: true,
        data: await this.adsService.getTopCreators(pageSize),
      };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard)
  @ApiOkPaginatedResponse(AdSchemaDto)
  @ApiBearerAuth()
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
  @ApiQuery({
    type: String,
    name: 'productName',
    example: "Barbie's Fragrance",
    description: 'name of product',
  })
  @Get('searchProductName')
  public async searchAdsByName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('productName') productName: string,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.searchAdsByName(page, pageSize, productName, user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard, RoleGuard(Role.PLACER))
  @ApiBearerAuth()
  @Redirect('https://app.ad-promoter.com/placers/adcreator')
  @Get('verify-payment')
  verifyAdPayment(@Query('reference') reference: string) {
    try {
      const verifyAdPaymentDto = new VerifyAdPaymentDto();
      verifyAdPaymentDto.reference = reference;
      return this.adsService.verifyAdvertPayment(verifyAdPaymentDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('verify-payment-hook')
  @Redirect('https://app.ad-promoter.com/placers/adcreator')
  verifyAdPaymentHook(@Query('reference') reference: string) {
    try {
      const verifyAdPaymentDto = new VerifyAdPaymentDto();
      verifyAdPaymentDto.reference = reference;
      return this.adsService.verifyPaymentHook(verifyAdPaymentDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('query-date/:startDate/:endDate')
  queryDate(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.queryAdsByDate(startDate, endDate, user);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
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
  @ApiQuery({
    type: Date,
    name: 'startDate',
    required: false,
    example: new Date(Date.now() - 36000000),
    description: 'Start date for the query',
  })
  @ApiQuery({
    type: String,
    name: 'name',
    example: 'bake',
    description: 'query to search by name',
  })
  @ApiQuery({
    type: Date,
    name: 'endDate',
    example: new Date(Date.now()),
    description: 'End date for the query',
  })
  @ApiOkPaginatedResponse(AdSchemaDto)
  @Get('search-by-date/:startDate/:endDate')
  searchByDate(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.getAdsByDate(
        startDate,
        endDate,
        user,
        page,
        pageSize,
      );
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkPaginatedResponse(AdSchemaDto)
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
  @ApiQuery({
    type: String,
    name: 'name',
    example: 'barb',
    description: 'query to seaarch for ad with name',
  })
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.findAll(page, pageSize, name, user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'adType',
    required: false,
    enum: AdType,
    type: String,
  })
  @ApiQuery({
    name: 'popular',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'recent',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
  })
  @Get('personal')
  @ApiOkPaginatedResponse(AdSchemaDto)
  async findPersonal(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string = '',
    @Query('startDate') startDate: Date = new Date(-8640000000000000),
    @Query('endDate') endDate: Date = new Date(8640000000000000),
    @Query('adType') adType: string = '',
    @Query('recent') recent: boolean = false,
    @Query('popular') popular: boolean = false,
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.GetPersonalAds(
        page,
        pageSize,
        user,
        query,
        startDate,
        endDate,
        adType,
        popular,
        recent,
      );
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('recent-ads')
  @ApiOkPaginatedResponse(AdSchemaDto)
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
  @ApiQuery({
    type: Date,
    name: 'startDate',
    example: new Date(Date.now() - 36000000),
    required: false,
    description: 'Start date for the query',
  })
  @ApiQuery({
    type: Date,
    name: 'endDate',
    example: new Date(Date.now()),
    required: false,
    description: 'End date for the query',
  })
  async GetRecentAds(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('startDate') startDate: Date = new Date(-8640000000000000),
    @Query('endDate') endDate: Date = new Date(8640000000000000),
    @GetUser() user: UserDocument,
  ) {
    try {
      return this.adsService.GetRecentAds(
        page,
        pageSize,
        '',
        user,
        startDate,
        endDate,
      );
    } catch (err) {
      throw err;
    }
  }

  @Put('/update-status')
  @ApiGenericOkResponse(AdSchemaDto)
  @ApiQuery({
    example: new ObjectId(),
    name: 'id',
    description: 'must be the mongo id of an ad in the db',
  })
  @ApiQuery({
    type: String,
    enum: AdStatus,
    name: 'status',
  })
  async updateAdStatus(
    @Query('id') id: string,
    @Query('status') status: AdStatus,
  ) {
    try {
      return this.adsService.updateAdStatus(status, id);
    } catch (err) {
      throw err;
    }
  }

  @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  @ApiQuery({
    type: Types.ObjectId,
    example: new ObjectId(),
    name: 'id',
    description: 'must be the mongo id of a user in the db',
  })
  @ApiQuery({
    type: String,
    enum: AdStatus,
    name: 'status',
  })
  @Get('user-ads/:id/:status')
  @ApiGenericOkResponse(Array<AdSchemaDto>)
  async findUserAds(
    @Param('id') id: string,
    @Param('status') status: AdStatus,
  ) {
    try {
      return this.adsService.fetchUserAds(id, status);
    } catch (err) {
      throw err;
    }
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'active',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
  })
  // @UseGuards(JwtGua    rd)
  @Get('all/user-ads/:id')
  @ApiGenericOkResponse(Array<AdSchemaDto>)
  async findAllUserAds(
    @Param('id') id: string,
    @Query('active') active: boolean,
    @Query('startDate') startDate: Date = new Date(-8640000000000000),
    @Query('endDate') endDate: Date = new Date(8640000000000000),
  ) {
    try {
      return this.adsService.fetchAllUserAds(id, active, startDate, endDate);
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  @ApiGenericOkResponse(AdSchemaDto)
  async findOne(
    @Req() req: Request,
    @Query('ref') ref: string,
    @Param('id') id: string,
  ) {
    try {
      const userAgent = req.headers['user-agent'];
      const ip = req.headers['x-forwarded-for'];
      const ad = await this.adsService.findOne(id);

      if (ref) {
        await this.clicksService.processClick(ref, userAgent, ip);
      }
      if (ref && ad.completed === true) {
        throw new NotFoundException({
          msg: 'Advert has been completed or does not exist',
          redirectUrl: 'https://app.ad-promoter.com/signup',
        });
      }
      return {
        success: true,
        data: await this.adsService.mapSingleAdObject(ad),
      };
    } catch (err) {
      throw err;
    }
  }

  @Get('conversion/:ref')
  async conversion(@Req() req: Request, @Param('ref') ref: string) {
    try {
      const userAgent = req.headers['user-agent'];
      const ip = req.headers['x-forwarded-for'];
      await this.clicksService.processConversion(ref, userAgent, ip);
      console.log('called');
      return {
        success: true,
      };
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard, RoleGuard(Role.PLACER))
  @ApiBearerAuth()
  @ApiGenericOkResponse(AdSchemaDto)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser() user: UserDocument,
    @Body() updateAdDto: UpdateAdDto,
  ) {
    try {
      return this.adsService.update(id, user, updateAdDto);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiGenericOkResponse(AdSchemaDto)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserDocument) {
    try {
      return this.adsService.remove(id, user.id);
    } catch (err) {
      throw err;
    }
  }
}
