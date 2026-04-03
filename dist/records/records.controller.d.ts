import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    create(req: any, createRecordDto: CreateRecordDto): any;
    findAll(req: any, filters: any): any;
    update(req: any, id: string, updateRecordDto: UpdateRecordDto): any;
    remove(req: any, id: string): any;
}
