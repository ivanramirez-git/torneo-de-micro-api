import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {FasesTorneo, FasesTorneoRelations} from '../models';

export class FasesTorneoRepository extends DefaultCrudRepository<
  FasesTorneo,
  typeof FasesTorneo.prototype.id,
  FasesTorneoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(FasesTorneo, dataSource);
  }
}
