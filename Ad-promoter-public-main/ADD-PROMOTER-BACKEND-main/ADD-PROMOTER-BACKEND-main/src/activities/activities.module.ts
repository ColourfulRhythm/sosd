import { Module, forwardRef } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schema/activity.schema';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Activity.name,
                schema: ActivitySchema,
            },
        ]),
        forwardRef(() => UserModule),
    ],
    controllers: [ActivitiesController],
    providers: [ActivitiesService],
    exports: [ActivitiesService],
})
export class ActivitiesModule {}
