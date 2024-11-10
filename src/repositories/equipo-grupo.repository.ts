import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EquipoGrupo, EquipoGrupoRelations} from '../models';

export class EquipoGrupoRepository extends DefaultCrudRepository<
  EquipoGrupo,
  typeof EquipoGrupo.prototype.id,
  EquipoGrupoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(EquipoGrupo, dataSource);
  }
}
