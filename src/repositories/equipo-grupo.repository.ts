import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EquipoGrupo, EquipoGrupoRelations, Grupo, Equipo} from '../models';
import {GrupoRepository} from './grupo.repository';
import {EquipoRepository} from './equipo.repository';

export class EquipoGrupoRepository extends DefaultCrudRepository<
  EquipoGrupo,
  typeof EquipoGrupo.prototype.id,
  EquipoGrupoRelations
> {

  public readonly grupo: BelongsToAccessor<Grupo, typeof EquipoGrupo.prototype.id>;

  public readonly equipo: BelongsToAccessor<Equipo, typeof EquipoGrupo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(EquipoGrupo, dataSource);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.grupo = this.createBelongsToAccessorFor('grupo', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupo', this.grupo.inclusionResolver);
  }
}
