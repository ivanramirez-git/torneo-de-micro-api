import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Jugador, JugadorRelations} from '../models';

export class JugadorRepository extends DefaultCrudRepository<
  Jugador,
  typeof Jugador.prototype.id,
  JugadorRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Jugador, dataSource);
  }
}
