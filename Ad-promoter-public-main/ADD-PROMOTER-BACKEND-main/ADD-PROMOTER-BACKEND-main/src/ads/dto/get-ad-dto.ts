export class GetAdDto {
    public id: string;
    public productName: string;
    public description: string;
    public tags: string[];
    public images: string[];
    public promotions: any[];
    public promotedLink: string;
    public paymentRef: string;
    public type: string;
    public creator: any;
    public dateCreated: Date;
    public cta: string;
    public target: number;
    public budget: number;
    public reports: any;
    public feedback: any;
    public adStatus: string;
    public isPaid: boolean;
    public isSaved: boolean;
    public isPromoted: boolean;
    public conversions: number;
    public achieved: number;
    public clicks: number;
    public approvedVisualAd: number;
}
