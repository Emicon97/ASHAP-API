import { Controller } from '@nestjs/common';
import { UrlCollectionService } from './url-collection.service';

@Controller('url-collection')
export class UrlCollectionController {
  constructor(private readonly urlCollectionService: UrlCollectionService) {}
}
