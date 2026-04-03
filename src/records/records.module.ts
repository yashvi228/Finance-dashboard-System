import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, PrismaService],
})
export class RecordsModule { }