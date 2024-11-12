import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadisticaPartido, Grupo, Jugador, Lugar, Partido, PartidoRelations, Penal, SolicitudTiempo} from '../models';
import {EstadisticaPartidoRepository} from './estadistica-partido.repository';
import {GrupoRepository} from './grupo.repository';
import {JugadorRepository} from './jugador.repository';
import {LugarRepository} from './lugar.repository';
import {PenalRepository} from './penal.repository';
import {SolicitudTiempoRepository} from './solicitud-tiempo.repository';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.id,
  PartidoRelations
> {

  public readonly lugar: BelongsToAccessor<Lugar, typeof Partido.prototype.id>;

  public readonly estadisticasPartido: HasManyRepositoryFactory<EstadisticaPartido, typeof Partido.prototype.id>;

  public readonly solicitudesTiempo: HasManyRepositoryFactory<SolicitudTiempo, typeof Partido.prototype.id>;

  public readonly penales: HasManyRepositoryFactory<Penal, typeof Partido.prototype.id>;

  public readonly grupo: BelongsToAccessor<Grupo, typeof Partido.prototype.id>;

  public readonly mvpEquipoLocal: BelongsToAccessor<Jugador, typeof Partido.prototype.id>;

  public readonly mvpEquipoVisitante: BelongsToAccessor<Jugador, typeof Partido.prototype.id>;

  public readonly capitanEquipoLocal: BelongsToAccessor<Jugador, typeof Partido.prototype.id>;

  public readonly capitanEquipoVisitante: BelongsToAccessor<Jugador, typeof Partido.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('LugarRepository') protected lugarRepositoryGetter: Getter<LugarRepository>, @repository.getter('EstadisticaPartidoRepository') protected estadisticaPartidoRepositoryGetter: Getter<EstadisticaPartidoRepository>, @repository.getter('SolicitudTiempoRepository') protected solicitudTiempoRepositoryGetter: Getter<SolicitudTiempoRepository>, @repository.getter('PenalRepository') protected penalRepositoryGetter: Getter<PenalRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(Partido, dataSource);
    this.capitanEquipoVisitante = this.createBelongsToAccessorFor('capitanEquipoVisitante', jugadorRepositoryGetter,);
    this.registerInclusionResolver('capitanEquipoVisitante', this.capitanEquipoVisitante.inclusionResolver);
    this.capitanEquipoLocal = this.createBelongsToAccessorFor('capitanEquipoLocal', jugadorRepositoryGetter,);
    this.registerInclusionResolver('capitanEquipoLocal', this.capitanEquipoLocal.inclusionResolver);
    this.mvpEquipoLocal = this.createBelongsToAccessorFor('mvpEquipoLocal', jugadorRepositoryGetter,);
    this.registerInclusionResolver('mvpEquipoLocal', this.mvpEquipoLocal.inclusionResolver);
    this.mvpEquipoVisitante = this.createBelongsToAccessorFor('mvpEquipoVisitante', jugadorRepositoryGetter,);
    this.registerInclusionResolver('mvpEquipoVisitante', this.mvpEquipoVisitante.inclusionResolver);
    this.grupo = this.createBelongsToAccessorFor('grupo', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupo', this.grupo.inclusionResolver);
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
