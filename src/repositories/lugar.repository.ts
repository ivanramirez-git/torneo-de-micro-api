import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Lugar, LugarRelations} from '../models';

export class LugarRepository extends DefaultCrudRepository<
  Lugar,
  typeof Lugar.prototype.id,
  LugarRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Lugar, dataSource);
  }
}
