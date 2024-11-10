import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {SolicitudTiempo, SolicitudTiempoRelations} from '../models';

export class SolicitudTiempoRepository extends DefaultCrudRepository<
  SolicitudTiempo,
  typeof SolicitudTiempo.prototype.id,
  SolicitudTiempoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(SolicitudTiempo, dataSource);
  }
}
