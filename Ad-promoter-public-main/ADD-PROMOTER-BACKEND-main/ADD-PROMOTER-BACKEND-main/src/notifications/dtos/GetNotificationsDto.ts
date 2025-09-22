import { NotificationType } from '../schemas/notificationSchema';

export class NotificationsDto {
  public title: NotificationType;
  public adName?: string;
  public name?: string;
  public socialRequestStatus?: boolean;
  public adType?: string;
  public aim?: string;
  public walletDebit?: string;
  public url?: string;
}
