import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';


@Injectable()
export class RecordsService {
    create(userId: string, createRecordDto: CreateRecordDto) {
        return 'This action adds a new record';
    }

    findAll(userId: string, role: string, filters: any) {
        return `This action returns all records`;
    }

    update(userId: string, role: string, id: number, updateRecordDto: UpdateRecordDto) {
        return `This action updates a #\${id} record`;
    }

    remove(userId: string, role: string, id: number) {
        return `This action removes a #\${id} record`;
    }
}