import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EstadisticasPartido, EstadisticasPartidoRelations, Partidos, Equipos, Jugadores} from '../models';
import {PartidosRepository} from './partidos.repository';
import {EquiposRepository} from './equipos.repository';
import {JugadoresRepository} from './jugadores.repository';

export class EstadisticasPartidoRepository extends DefaultCrudRepository<
  EstadisticasPartido,
  typeof EstadisticasPartido.prototype.id,
  EstadisticasPartidoRelations
> {

  public readonly partidos: BelongsToAccessor<Partidos, typeof EstadisticasPartido.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof EstadisticasPartido.prototype.id>;

  public readonly jugadores: BelongsToAccessor<Jugadores, typeof EstadisticasPartido.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PartidosRepository') protected partidosRepositoryGetter: Getter<PartidosRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>, @repository.getter('JugadoresRepository') protected jugadoresRepositoryGetter: Getter<JugadoresRepository>,
  ) {
    super(EstadisticasPartido, dataSource);
    this.jugadores = this.createBelongsToAccessorFor('jugadores', jugadoresRepositoryGetter,);
    this.registerInclusionResolver('jugadores', this.jugadores.inclusionResolver);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.partidos = this.createBelongsToAccessorFor('partidos', partidosRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
  }
}
