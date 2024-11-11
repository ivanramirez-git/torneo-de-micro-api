import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Equipo, EquipoRelations, Jugador, Partido, Grupo, EquipoGrupo, SolicitudTiempo} from '../models';
import {JugadorRepository} from './jugador.repository';
import {PartidoRepository} from './partido.repository';
import {EquipoGrupoRepository} from './equipo-grupo.repository';
import {GrupoRepository} from './grupo.repository';
import {SolicitudTiempoRepository} from './solicitud-tiempo.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly jugadores: HasManyRepositoryFactory<Jugador, typeof Equipo.prototype.id>;

  public readonly partidosEquipoLocal: HasManyRepositoryFactory<Partido, typeof Equipo.prototype.id>;

  public readonly partidosEquipoVisitante: HasManyRepositoryFactory<Partido, typeof Equipo.prototype.id>;

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          EquipoGrupo,
          typeof Equipo.prototype.id
        >;

  public readonly solicitudesTiempo: HasManyRepositoryFactory<SolicitudTiempo, typeof Equipo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('EquipoGrupoRepository') protected equipoGrupoRepositoryGetter: Getter<EquipoGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('SolicitudTiempoRepository') protected solicitudTiempoRepositoryGetter: Getter<SolicitudTiempoRepository>,
  ) {
    super(Equipo, dataSource);
    this.solicitudesTiempo = this.createHasManyRepositoryFactoryFor('solicitudesTiempo', solicitudTiempoRepositoryGetter,);
    this.registerInclusionResolver('solicitudesTiempo', this.solicitudesTiempo.inclusionResolver);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, equipoGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.partidosEquipoVisitante = this.createHasManyRepositoryFactoryFor('partidosEquipoVisitante', partidoRepositoryGetter,);
    this.registerInclusionResolver('partidosEquipoVisitante', this.partidosEquipoVisitante.inclusionResolver);
    this.partidosEquipoLocal = this.createHasManyRepositoryFactoryFor('partidosEquipoLocal', partidoRepositoryGetter,);
    this.registerInclusionResolver('partidosEquipoLocal', this.partidosEquipoLocal.inclusionResolver);
    this.jugadores = this.createHasManyRepositoryFactoryFor('jugadores', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugadores', this.jugadores.inclusionResolver);
  }
}
