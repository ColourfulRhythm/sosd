import { Process, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { PromotionDocument } from 'src/promotion/schemas/promotion.schema';
import { AdDocument, AdType } from 'src/ads/schemas/ad.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
import { WalletDocument } from 'src/wallet/schemas/wallet.schema';

@Processor('click-queue')
export class ClickConsumer {
  constructor(
    @InjectModel('Promotion')
    private promotionModel: Model<PromotionDocument>,
    @InjectModel('Ad') private adModel: Model<AdDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Wallet') private walletModel: Model<WalletDocument>,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {
    const client = cacheManager.store.getClient();

    client.on('error', (error) => {
      console.error(error.message);
    });
  }

  @Process('update-clicks')
  async verificationClickJob(job: Job<any>) {
    console.log(job.data);
    const { refLink, userAgent, ip } = job.data;
    const userAgents: string = await this.cacheManager.get(`${refLink}`);

    const promotion = await this.promotionModel.findOne({
      uniqueCode: refLink,
    });
    const ad = await this.adModel.findOne({ _id: promotion.ad });
    if (!promotion) {
      return;
    }

    if (ad.completed) {
      return;
    }
    if (ad.clicks == ad.target) {
      ad.completed = true;
      ad.save();
      return;
    }

    if (userAgents) {
      const isVisited = JSON.parse(userAgents).filter(
        (agent) => agent != job.data,
      );
      if (isVisited[0]) {
        return;
      }

      await this.adModel.findByIdAndUpdate(ad._id, {
        $inc: { clicks: 1 },
      });
      await this.promotionModel.findByIdAndUpdate(promotion._id, {
        $inc: { clicks: 1 },
      });

      if (ad.type == 'visual' || ad.type == 'detail') {
        ad.save();
        return;
      }

      await this.promotionModel.findByIdAndUpdate(promotion._id, {
        $inc: { amountEarned: 0.8 * ad.rate },
      });
      const user = await this.userModel.findById({
        _id: promotion.promoter,
      });
      const wallet = await this.walletModel.findByIdAndUpdate(user.wallet, {
        $inc: { walletBalance: 0.8 * ad.rate },
      });
      ad.save();
      wallet.save();
      promotion.save();
      return;
    } else {
      await this.adModel.findByIdAndUpdate(ad._id, {
        $inc: { clicks: 1 },
      });
      await this.promotionModel.findByIdAndUpdate(promotion._id, {
        $inc: { clicks: 1 },
      });

      if (ad.type == 'visual' || ad.type == 'detail') {
        return;
      }
      const user = await this.userModel.findById({
        _id: promotion.promoter,
      });
      await this.walletModel.findByIdAndUpdate(
        {
          _id: user.wallet,
        },
        {
          $inc: { walletBalance: 0.8 * ad.rate },
        },
      );

      ad.save();
      promotion.save();
      const newAgents = JSON.stringify([{ refLink, userAgent, ip }]);
      await this.cacheManager.set(`${refLink}`, newAgents);
      return;
    }
  }

  @Process('update-conversions')
  async conversionVerificationJob(job: Job<any>) {
    const { refLink, userAgent, ip } = job.data;
    console.log(refLink);
    const userAgents: string = await this.cacheManager.get(`${userAgent}`);
    console.log(userAgents);
    const promotion = await this.promotionModel.findOne({
      uniqueCode: refLink,
    });
    console.log(promotion);
    if (!promotion) {
      console.log('done');
      return;
    }
    const ad = await this.adModel.findOne({ _id: promotion.ad });
    console.log(promotion, ad);
    if (userAgents) {
      const isVisited = JSON.parse(userAgents).filter(
        (agent) => agent != job.data,
      );
      if (isVisited[0]) {
        console.log('done');
        return;
      }
      if (ad.type !== AdType.DETAIL) {
        console.log('done');

        return;
      }
      if (ad.conversions == ad.target) {
        ad.completed = true;
        ad.save();
        console.log('done');

        return;
      }
      ad.conversions = ad.conversions + 1;
      promotion.conversions = promotion.conversions + 1;
      promotion.amountEarned = promotion.amountEarned + 0.8 * ad.rate;

      const user = await this.userModel.findById({
        _id: promotion.promoter,
      });
      const wallet = await this.walletModel.findById({
        _id: user.wallet,
      });

      wallet.walletBalance += 0.8 * ad.rate;
      wallet.save();
      ad.save();
      promotion.save();
      const newAgents = JSON.stringify([
        ...userAgents,
        { refLink, userAgent, ip },
      ]);
      await this.cacheManager.set('user-agent', newAgents);

      console.log('done');

      return;
    } else {
      if (ad.type !== 'detail' || ad.completed) {
        console.log('done');

        return;
      }
      if (ad.conversions == ad.target) {
        ad.completed = true;
        ad.save();
        console.log('done');

        return;
      }

      ad.conversions = ad.conversions + 1;
      promotion.conversions = promotion.conversions + 1;
      promotion.amountEarned = promotion.amountEarned + 0.8 * ad.rate;
      const user = await this.userModel.findById({
        _id: promotion.promoter,
      });
      const wallet = await this.walletModel.findById({
        _id: user.wallet,
      });

      wallet.walletBalance += 0.8 * ad.rate;
      wallet.save();
      ad.save();
      promotion.save();
      const newAgents = JSON.stringify([{ refLink, userAgent, ip }]);
      await this.cacheManager.set('user-agent', newAgents, 30000);
      console.log('done');

      return;
    }
  }
}
