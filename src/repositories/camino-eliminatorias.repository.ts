import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {CaminoEliminatorias, CaminoEliminatoriasRelations, Eliminatorias, Equipos} from '../models';
import {EliminatoriasRepository} from './eliminatorias.repository';
import {EquiposRepository} from './equipos.repository';

export class CaminoEliminatoriasRepository extends DefaultCrudRepository<
  CaminoEliminatorias,
  typeof CaminoEliminatorias.prototype.id,
  CaminoEliminatoriasRelations
> {

  public readonly eliminatorias: BelongsToAccessor<Eliminatorias, typeof CaminoEliminatorias.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof CaminoEliminatorias.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EliminatoriasRepository') protected eliminatoriasRepositoryGetter: Getter<EliminatoriasRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(CaminoEliminatorias, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.eliminatorias = this.createBelongsToAccessorFor('eliminatorias', eliminatoriasRepositoryGetter,);
    this.registerInclusionResolver('eliminatorias', this.eliminatorias.inclusionResolver);
  }
}
