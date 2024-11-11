import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Penal, PenalRelations, Partido, Equipo} from '../models';
import {PartidoRepository} from './partido.repository';
import {EquipoRepository} from './equipo.repository';

export class PenalRepository extends DefaultCrudRepository<
  Penal,
  typeof Penal.prototype.id,
  PenalRelations
> {

  public readonly partido: BelongsToAccessor<Partido, typeof Penal.prototype.id>;

  public readonly equipo: BelongsToAccessor<Equipo, typeof Penal.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Penal, dataSource);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
    this.partido = this.createBelongsToAccessorFor('partido', partidoRepositoryGetter,);
    this.registerInclusionResolver('partido', this.partido.inclusionResolver);
  }
}
