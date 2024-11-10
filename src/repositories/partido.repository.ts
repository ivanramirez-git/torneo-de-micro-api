import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Partido, PartidoRelations, Lugar, EstadisticaPartido, SolicitudTiempo, Penal} from '../models';
import {LugarRepository} from './lugar.repository';
import {EstadisticaPartidoRepository} from './estadistica-partido.repository';
import {SolicitudTiempoRepository} from './solicitud-tiempo.repository';
import {PenalRepository} from './penal.repository';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.id,
  PartidoRelations
> {

  public readonly lugar: BelongsToAccessor<Lugar, typeof Partido.prototype.id>;

  public readonly estadisticasPartido: HasManyRepositoryFactory<EstadisticaPartido, typeof Partido.prototype.id>;

  public readonly solicitudesTiempo: HasManyRepositoryFactory<SolicitudTiempo, typeof Partido.prototype.id>;

  public readonly penales: HasManyRepositoryFactory<Penal, typeof Partido.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('LugarRepository') protected lugarRepositoryGetter: Getter<LugarRepository>, @repository.getter('EstadisticaPartidoRepository') protected estadisticaPartidoRepositoryGetter: Getter<EstadisticaPartidoRepository>, @repository.getter('SolicitudTiempoRepository') protected solicitudTiempoRepositoryGetter: Getter<SolicitudTiempoRepository>, @repository.getter('PenalRepository') protected penalRepositoryGetter: Getter<PenalRepository>,
  ) {
    super(Partido, dataSource);
    this.penales = this.createHasManyRepositoryFactoryFor('penales', penalRepositoryGetter,);
    this.registerInclusionResolver('penales', this.penales.inclusionResolver);
    this.solicitudesTiempo = this.createHasManyRepositoryFactoryFor('solicitudesTiempo', solicitudTiempoRepositoryGetter,);
    this.registerInclusionResolver('solicitudesTiempo', this.solicitudesTiempo.inclusionResolver);
    this.estadisticasPartido = this.createHasManyRepositoryFactoryFor('estadisticasPartido', estadisticaPartidoRepositoryGetter,);
    this.registerInclusionResolver('estadisticasPartido', this.estadisticasPartido.inclusionResolver);
    this.lugar = this.createBelongsToAccessorFor('lugar', lugarRepositoryGetter,);
    this.registerInclusionResolver('lugar', this.lugar.inclusionResolver);
  }
}
