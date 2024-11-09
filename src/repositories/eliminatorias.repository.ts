import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Eliminatorias, EliminatoriasRelations, FasesTorneo, Equipos} from '../models';
import {FasesTorneoRepository} from './fases-torneo.repository';
import {EquiposRepository} from './equipos.repository';

export class EliminatoriasRepository extends DefaultCrudRepository<
  Eliminatorias,
  typeof Eliminatorias.prototype.id,
  EliminatoriasRelations
> {

  public readonly fasesTorneo: BelongsToAccessor<FasesTorneo, typeof Eliminatorias.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof Eliminatorias.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FasesTorneoRepository') protected fasesTorneoRepositoryGetter: Getter<FasesTorneoRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(Eliminatorias, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.fasesTorneo = this.createBelongsToAccessorFor('fasesTorneo', fasesTorneoRepositoryGetter,);
    this.registerInclusionResolver('fasesTorneo', this.fasesTorneo.inclusionResolver);
  }
}
