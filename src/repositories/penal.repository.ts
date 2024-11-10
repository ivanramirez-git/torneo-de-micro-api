import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Penal, PenalRelations} from '../models';

export class PenalRepository extends DefaultCrudRepository<
  Penal,
  typeof Penal.prototype.id,
  PenalRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Penal, dataSource);
  }
}
