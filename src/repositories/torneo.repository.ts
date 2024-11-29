import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Torneo, TorneoRelations, FaseTorneo, Equipo} from '../models';
import {FaseTorneoRepository} from './fase-torneo.repository';
import {EquipoRepository} from './equipo.repository';

export class TorneoRepository extends DefaultCrudRepository<
  Torneo,
  typeof Torneo.prototype.id,
  TorneoRelations
> {

  public readonly fasesTorneo: HasManyRepositoryFactory<FaseTorneo, typeof Torneo.prototype.id>;

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Torneo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FaseTorneoRepository') protected faseTorneoRepositoryGetter: Getter<FaseTorneoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Torneo, dataSource);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.fasesTorneo = this.createHasManyRepositoryFactoryFor('fasesTorneo', faseTorneoRepositoryGetter,);
    this.registerInclusionResolver('fasesTorneo', this.fasesTorneo.inclusionResolver);
  }
}
