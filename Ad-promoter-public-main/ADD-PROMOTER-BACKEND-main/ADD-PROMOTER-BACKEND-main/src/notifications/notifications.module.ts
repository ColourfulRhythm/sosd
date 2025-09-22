import {forwardRef, Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Notification, NotificationSchema} from "./schemas/notificationSchema";
import {UserModule} from "../user/user.module";
import {NotificationsController} from "./notifications.controller";
import {NotificationsService} from "./notifications.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notification.name, schema: NotificationSchema }
        ]),
        forwardRef(() => UserModule),
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService],
    exports: [NotificationsService]
})
export class NotificationModule {}
