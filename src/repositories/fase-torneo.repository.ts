import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {FaseTorneo, FaseTorneoRelations} from '../models';

export class FaseTorneoRepository extends DefaultCrudRepository<
  FaseTorneo,
  typeof FaseTorneo.prototype.id,
  FaseTorneoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(FaseTorneo, dataSource);
  }
}
