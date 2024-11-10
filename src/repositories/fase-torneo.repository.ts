import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {FaseTorneo, FaseTorneoRelations, Grupo} from '../models';
import {GrupoRepository} from './grupo.repository';

export class FaseTorneoRepository extends DefaultCrudRepository<
  FaseTorneo,
  typeof FaseTorneo.prototype.id,
  FaseTorneoRelations
> {

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof FaseTorneo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(FaseTorneo, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
