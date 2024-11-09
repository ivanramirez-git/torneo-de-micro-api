import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Equipos, Jugadores, Partidos, PartidosRelations} from '../models';
import {EquiposRepository} from './equipos.repository';
import {JugadoresRepository} from './jugadores.repository';

export class PartidosRepository extends DefaultCrudRepository<
  Partidos,
  typeof Partidos.prototype.id,
  PartidosRelations
> {

  public readonly equipoLocal: BelongsToAccessor<Equipos, typeof Partidos.prototype.id>;
  public readonly equipoVisitante: BelongsToAccessor<Equipos, typeof Partidos.prototype.id>;
  public readonly capitanLocal: BelongsToAccessor<Jugadores, typeof Partidos.prototype.id>;
  public readonly capitanVisitante: BelongsToAccessor<Jugadores, typeof Partidos.prototype.id>;
  public readonly mvp: BelongsToAccessor<Jugadores, typeof Partidos.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
    @repository.getter('JugadoresRepository') protected jugadoresRepositoryGetter: Getter<JugadoresRepository>,
  ) {
    super(Partidos, dataSource);
    this.equipoLocal = this.createBelongsToAccessorFor('equipoLocal', equiposRepositoryGetter);
    this.registerInclusionResolver('equipoLocal', this.equipoLocal.inclusionResolver);
    this.equipoVisitante = this.createBelongsToAccessorFor('equipoVisitante', equiposRepositoryGetter);
    this.registerInclusionResolver('equipoVisitante', this.equipoVisitante.inclusionResolver);
    this.capitanLocal = this.createBelongsToAccessorFor('capitanLocal', jugadoresRepositoryGetter);
    this.registerInclusionResolver('capitanLocal', this.capitanLocal.inclusionResolver);
    this.capitanVisitante = this.createBelongsToAccessorFor('capitanVisitante', jugadoresRepositoryGetter);
    this.registerInclusionResolver('capitanVisitante', this.capitanVisitante.inclusionResolver);
    this.mvp = this.createBelongsToAccessorFor('mvp', jugadoresRepositoryGetter);
    this.registerInclusionResolver('mvp', this.mvp.inclusionResolver);
  }
}
