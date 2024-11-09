import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EquiposGrupos, EquiposGruposRelations, Grupos, Equipos} from '../models';
import {GruposRepository} from './grupos.repository';
import {EquiposRepository} from './equipos.repository';

export class EquiposGruposRepository extends DefaultCrudRepository<
  EquiposGrupos,
  typeof EquiposGrupos.prototype.id,
  EquiposGruposRelations
> {

  public readonly grupos: BelongsToAccessor<Grupos, typeof EquiposGrupos.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof EquiposGrupos.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GruposRepository') protected gruposRepositoryGetter: Getter<GruposRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(EquiposGrupos, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.grupos = this.createBelongsToAccessorFor('grupos', gruposRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
