import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Torneo, TorneoRelations, FaseTorneo} from '../models';
import {FaseTorneoRepository} from './fase-torneo.repository';

export class TorneoRepository extends DefaultCrudRepository<
  Torneo,
  typeof Torneo.prototype.id,
  TorneoRelations
> {

  public readonly fasesTorneo: HasManyRepositoryFactory<FaseTorneo, typeof Torneo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FaseTorneoRepository') protected faseTorneoRepositoryGetter: Getter<FaseTorneoRepository>,
  ) {
    super(Torneo, dataSource);
    this.fasesTorneo = this.createHasManyRepositoryFactoryFor('fasesTorneo', faseTorneoRepositoryGetter,);
    this.registerInclusionResolver('fasesTorneo', this.fasesTorneo.inclusionResolver);
  }
}
