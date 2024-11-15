import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Visita, VisitaRelations} from '../models';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Visita, dataSource);
  }
}
