import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {FaseTorneo, FaseTorneoRelations, Grupo, Torneo} from '../models';
import {GrupoRepository} from './grupo.repository';
import {TorneoRepository} from './torneo.repository';

export class FaseTorneoRepository extends DefaultCrudRepository<
  FaseTorneo,
  typeof FaseTorneo.prototype.id,
  FaseTorneoRelations
> {

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof FaseTorneo.prototype.id>;

  public readonly torneo: BelongsToAccessor<Torneo, typeof FaseTorneo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>,
  ) {
    super(FaseTorneo, dataSource);
    this.torneo = this.createBelongsToAccessorFor('torneo', torneoRepositoryGetter,);
    this.registerInclusionResolver('torneo', this.torneo.inclusionResolver);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
