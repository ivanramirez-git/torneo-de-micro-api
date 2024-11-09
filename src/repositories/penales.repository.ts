import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Penales, PenalesRelations, Partidos, Equipos} from '../models';
import {PartidosRepository} from './partidos.repository';
import {EquiposRepository} from './equipos.repository';

export class PenalesRepository extends DefaultCrudRepository<
  Penales,
  typeof Penales.prototype.id,
  PenalesRelations
> {

  public readonly partidos: BelongsToAccessor<Partidos, typeof Penales.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof Penales.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PartidosRepository') protected partidosRepositoryGetter: Getter<PartidosRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(Penales, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.partidos = this.createBelongsToAccessorFor('partidos', partidosRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
  }
}
