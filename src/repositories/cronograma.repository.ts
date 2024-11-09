import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cronograma, CronogramaRelations, Partidos} from '../models';
import {PartidosRepository} from './partidos.repository';

export class CronogramaRepository extends DefaultCrudRepository<
  Cronograma,
  typeof Cronograma.prototype.id,
  CronogramaRelations
> {

  public readonly partidos: BelongsToAccessor<Partidos, typeof Cronograma.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PartidosRepository') protected partidosRepositoryGetter: Getter<PartidosRepository>,
  ) {
    super(Cronograma, dataSource);
    this.partidos = this.createBelongsToAccessorFor('partidos', partidosRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
  }
}
