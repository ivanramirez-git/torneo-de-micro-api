import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {SolicitudesTiempo, SolicitudesTiempoRelations, Partidos, Equipos} from '../models';
import {PartidosRepository} from './partidos.repository';
import {EquiposRepository} from './equipos.repository';

export class SolicitudesTiempoRepository extends DefaultCrudRepository<
  SolicitudesTiempo,
  typeof SolicitudesTiempo.prototype.id,
  SolicitudesTiempoRelations
> {

  public readonly partidos: BelongsToAccessor<Partidos, typeof SolicitudesTiempo.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof SolicitudesTiempo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PartidosRepository') protected partidosRepositoryGetter: Getter<PartidosRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(SolicitudesTiempo, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.partidos = this.createBelongsToAccessorFor('partidos', partidosRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
  }
}
