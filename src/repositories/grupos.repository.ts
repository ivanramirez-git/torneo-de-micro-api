import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Grupos, GruposRelations, FasesTorneo} from '../models';
import {FasesTorneoRepository} from './fases-torneo.repository';

export class GruposRepository extends DefaultCrudRepository<
  Grupos,
  typeof Grupos.prototype.id,
  GruposRelations
> {

  public readonly fasesTorneo: BelongsToAccessor<FasesTorneo, typeof Grupos.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FasesTorneoRepository') protected fasesTorneoRepositoryGetter: Getter<FasesTorneoRepository>,
  ) {
    super(Grupos, dataSource);
    this.fasesTorneo = this.createBelongsToAccessorFor('fasesTorneo', fasesTorneoRepositoryGetter,);
    this.registerInclusionResolver('fasesTorneo', this.fasesTorneo.inclusionResolver);
  }
}
