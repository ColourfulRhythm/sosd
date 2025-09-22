import {ObjectId} from "mongoose";
import {User} from "../../user/schemas/user.schema";

export class CreateNotificationDto{
    public title: string;

    public body: string;

    public ad?: string;
    
    public promotionLink?: string;

    public sender: User;

    public receiver: User;
}