import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ClickManagementService {
    constructor(
        @InjectQueue('click-queue')
        private clickQueue: Queue,
    ) {}

    async processClick(ref: string, userAgent: string, ip) {
        await this.clickQueue.add('update-clicks', {
            refLink: ref,
            userAgent: userAgent,
            ip: ip,
        });
    }
    async processConversion(ref: string, userAgent: string, ip) {
        await this.clickQueue.add('update-conversions', {
            refLink: ref,
            userAgent: userAgent,
            ip: ip,
        });
    }
}
