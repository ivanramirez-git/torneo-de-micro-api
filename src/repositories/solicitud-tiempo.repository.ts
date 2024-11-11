import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {SolicitudTiempo, SolicitudTiempoRelations, Equipo, Partido} from '../models';
import {EquipoRepository} from './equipo.repository';
import {PartidoRepository} from './partido.repository';

export class SolicitudTiempoRepository extends DefaultCrudRepository<
  SolicitudTiempo,
  typeof SolicitudTiempo.prototype.id,
  SolicitudTiempoRelations
> {

  public readonly equipo: BelongsToAccessor<Equipo, typeof SolicitudTiempo.prototype.id>;

  public readonly partido: BelongsToAccessor<Partido, typeof SolicitudTiempo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>,
  ) {
    super(SolicitudTiempo, dataSource);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
  }
}
