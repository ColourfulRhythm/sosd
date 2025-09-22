import { Module } from '@nestjs/common';
import { BullBoardController } from './bull-board.controller';
import { BullBoardQueue } from './bull-board.queue';

@Module({
    imports: [],
    controllers: [BullBoardController],
    providers: [BullBoardController, BullBoardQueue],
    exports: [BullBoardController],
})
export class BullBoardModule {}
