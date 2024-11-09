import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Jugadores, JugadoresRelations, Equipos} from '../models';
import {EquiposRepository} from './equipos.repository';

export class JugadoresRepository extends DefaultCrudRepository<
  Jugadores,
  typeof Jugadores.prototype.id,
  JugadoresRelations
> {

  public readonly equipos: BelongsToAccessor<Equipos, typeof Jugadores.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(Jugadores, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
