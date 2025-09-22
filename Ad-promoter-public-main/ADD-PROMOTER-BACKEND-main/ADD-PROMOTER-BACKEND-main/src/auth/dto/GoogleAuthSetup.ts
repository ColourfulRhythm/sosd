import {Role} from "../../user/schemas/user.schema";

export class GoogleAuthSetup{
    public googleId : string
    public role : Role.PROMOTER
    public seeVisual : boolean
    public socialLink : string
}