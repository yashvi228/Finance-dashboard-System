import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @Roles('analyst', 'admin')
  create(@Request() req, @Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(req.user.userId, createRecordDto);
  }

  @Get()
  @Roles('viewer', 'analyst', 'admin')
  findAll(@Request() req, @Query() filters) {
    return this.recordsService.findAll(req.user.userId, req.user.role, filters);
  }

  @Patch(':id')
  @Roles('analyst', 'admin')
  update(@Request() req, @Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(req.user.userId, req.user.role, +id, updateRecordDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Request() req, @Param('id') id: string) {
    return this.recordsService.remove(req.user.userId, req.user.role, +id);
  }
}