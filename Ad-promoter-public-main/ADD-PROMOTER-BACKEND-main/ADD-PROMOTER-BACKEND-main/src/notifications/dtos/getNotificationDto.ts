import { GetAdDto } from "src/ads/dto/get-ad-dto"

export class GetNotificationsDto {
    public id: string
    public _id: string
    public title: string
    public body: string
    public promotionLink: string
    public ad?: GetAdDto
    public sender: any
    public receiver: any
    public isRead: boolean
    public DateCreated: any
}