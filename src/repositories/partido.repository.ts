import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Partido, PartidoRelations} from '../models';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.id,
  PartidoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Partido, dataSource);
  }
}
