import { Module, forwardRef } from '@nestjs/common';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
  imports: [forwardRef(() => DashboardModule)],
  // ...
})
export class RecordsModule {}