import { Module, forwardRef } from '@nestjs/common';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [forwardRef(() => RecordsModule)],
  // ...
})
export class DashboardModule {}