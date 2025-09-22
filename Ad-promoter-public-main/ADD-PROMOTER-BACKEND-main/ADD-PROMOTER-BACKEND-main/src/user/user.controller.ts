import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { Role, UserDocument } from './schemas/user.schema';
import RoleGuard from 'src/auth/guard/role.guard';
import { MongoExceptionFilter } from 'src/filters/mongoose.excepions.filter';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { UpdateTagsDto } from './dto/UpdateTagsDto';
import { RecentAdsDto } from './dto/recentAdsDto';
import { GoogleOnboardingDto } from './dto/googleOnboarding.dto';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { UserSchemaDto } from './dto/user.schema.dto';
import { ApiOkPaginatedResponse } from 'src/shared/response.service/apiOkPaginatedResponse';
import { AdSchemaDto } from 'src/ads/dto/ads.schema.dto';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

@UseGuards(JwtGuard)
@UseFilters(MongoExceptionFilter)
@ApiBearerAuth()
@ApiTags('User Flow')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiGenericOkResponse(UserSchemaDto)
  getCurrentUser(@GetUser() user: UserDocument) {
    user.password = undefined;
    return {
      success: true,
      data: user,
    };
  }

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
  @Get('dashboard')
  async fetchDashboard(
    @GetUser() user: UserDocument,
    @Query('startDate')
    startDate: Date = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
    @Query('endDate') endDate: Date = new Date(Date.now()),
  ) {
    try {
      return {
        success: true,
        data: await this.userService.userDashboard(user, startDate, endDate),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard([Role.SUBADMIN, Role.ADMIN]))
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
  @Get('social-requests')
  @ApiOkPaginatedResponse(UserSchemaDto)
  async getSocialRequests(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      return {
        success: true,
        data: await this.userService.getSocialRequests(page, pageSize),
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiParam({
    name: 'userId',
    example: new ObjectId(),
    description: 'should be the mongo id of a user in the db',
  })
  @ApiQuery({
    type: Boolean,
    description: 'should be true if approved and false if declined',
    name: 'status',
  })
  @UseGuards(RoleGuard([Role.SUBADMIN, Role.ADMIN]))
  @ApiGenericOkResponse(UserSchemaDto)
  @Put('social-requests/update/:userId')
  async approveSocialRequest(
    @Param('userId') userId: string,
    @Query('status') status: boolean,
    @GetUser() user: UserDocument,
  ) {
    return {
      success: true,
      data: await this.userService.editSocialRequest(userId, status, user),
    };
  }

  @UseGuards(RoleGuard(Role.PROMOTER))
  @Get('saved-jobs')
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
    required: false,
    example: new Date(Date.now()),
    description: 'End date for the query',
  })
  async getSavedJobs(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('startDate') startDate: Date = new Date(-8640000000000000),
    @Query('endDate') endDate: Date = new Date(8640000000000000),
    @GetUser() user: UserDocument,
  ) {
    try {
      return {
        success: true,
        data: await this.userService.getSavedJobs(
          page,
          pageSize,
          user,
          startDate,
          endDate,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard(Role.PROMOTER))
  @Put('save-job/:jobId')
  async saveJob(@GetUser() user: UserDocument, @Param('jobId') jobId: string) {
    try {
      return {
        success: true,
        data: await this.userService.saveJob(jobId, user.id),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards()
  @ApiGenericOkResponse(UserSchemaDto)
  @Put('deleted-ads/:adId')
  async UpdateDeletedAds(
    @GetUser() user: UserDocument,
    @Param('adId') adId: string,
  ) {
    try {
      return {
        success: true,
        data: await this.userService.UpdateDeletedAds(adId, user.id),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards()
  @Put('notifications')
  async notifications(
    @GetUser() user: UserDocument,
    @Body() updateNotificationsDto: UpdateNotificationsDto,
  ) {
    try {
      return {
        success: true,
        data: await this.userService.ToggleNotifications(
          updateNotificationsDto,
          user.id,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RoleGuard(Role.PROMOTER))
  @Put('unsave-job/:jobId')
  async unsaveJob(
    @GetUser() user: UserDocument,
    @Param('jobId') jobId: string,
  ) {
    try {
      return {
        success: true,
        data: await this.userService.unsaveJob(jobId, user.id),
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('change-password')
  changePassowrd(
    @Body() dto: ChangePasswordDto,
    @GetUser() user: UserDocument,
  ) {
    return this.userService.changePassword(dto, user);
  }

  @Get(':id')
  @ApiGenericOkResponse(UserSchemaDto)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    user.password = undefined;
    return {
      success: true,
      data: user,
    };
  }

  @Get('email/:email')
  @ApiGenericOkResponse(UserSchemaDto)
  async findOneByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    user.password = undefined;
    return {
      success: true,
      data: user,
    };
  }

  @Patch('')
  @ApiGenericOkResponse(UserSchemaDto)
  async update(
    @GetUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const res = await this.userService.update(user, updateUserDto);
    res.password = undefined;
    return {
      success: true,
      data: res,
    };
  }

  @Put('google/onboarding')
  async googleOnboarding(
    @GetUser() user: UserDocument,
    @Body() dto: GoogleOnboardingDto,
  ) {
    const res = await this.userService.googleOnboarding(user, dto);
    res.password = undefined;
    return {
      success: true,
      data: res,
    };
  }

  @Post('tags')
  public async addUserFrequentTags(
    @GetUser() user: UserDocument,
    @Body() dto: UpdateTagsDto,
  ) {
    return this.userService.addTags(user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
