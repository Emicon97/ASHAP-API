import { Module } from '@nestjs/common';
import { DataMigrationServiceService } from './data-migration-service.service';
import { DataMigrationServiceController } from './data-migration-service.controller';
import { UserMongooseModule } from 'src/user/schemas/user.schema';

@Module({
  imports: [UserMongooseModule],
  controllers: [DataMigrationServiceController],
  providers: [DataMigrationServiceService],
})
export class DataMigrationServiceModule {}
