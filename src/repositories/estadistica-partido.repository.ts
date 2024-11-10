import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadisticaPartido, EstadisticaPartidoRelations} from '../models';

export class EstadisticaPartidoRepository extends DefaultCrudRepository<
  EstadisticaPartido,
  typeof EstadisticaPartido.prototype.id,
  EstadisticaPartidoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(EstadisticaPartido, dataSource);
  }
}
