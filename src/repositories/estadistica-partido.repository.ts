import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadisticaPartido, EstadisticaPartidoRelations, Partido, Equipo, Jugador} from '../models';
import {PartidoRepository} from './partido.repository';
import {EquipoRepository} from './equipo.repository';
import {JugadorRepository} from './jugador.repository';

export class EstadisticaPartidoRepository extends DefaultCrudRepository<
  EstadisticaPartido,
  typeof EstadisticaPartido.prototype.id,
  EstadisticaPartidoRelations
> {

  public readonly partido: BelongsToAccessor<Partido, typeof EstadisticaPartido.prototype.id>;

  public readonly equipo: BelongsToAccessor<Equipo, typeof EstadisticaPartido.prototype.id>;

  public readonly jugador: BelongsToAccessor<Jugador, typeof EstadisticaPartido.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(EstadisticaPartido, dataSource);
    this.jugador = this.createBelongsToAccessorFor('jugador', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugador', this.jugador.inclusionResolver);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
