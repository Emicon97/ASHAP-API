import { Controller } from '@nestjs/common';
import { DataMigrationServiceService } from './data-migration-service.service';

@Controller('data-migration-service')
export class DataMigrationServiceController {
  constructor(private readonly dataMigrationServiceService: DataMigrationServiceService) {}
}
