import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Grupo, GrupoRelations, EquipoGrupo, Partido, FaseTorneo} from '../models';
import {EquipoGrupoRepository} from './equipo-grupo.repository';
import {PartidoRepository} from './partido.repository';
import {FaseTorneoRepository} from './fase-torneo.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly equipoGrupos: HasManyRepositoryFactory<EquipoGrupo, typeof Grupo.prototype.id>;

  public readonly partidos: HasManyRepositoryFactory<Partido, typeof Grupo.prototype.id>;

  public readonly faseTorneo: BelongsToAccessor<FaseTorneo, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EquipoGrupoRepository') protected equipoGrupoRepositoryGetter: Getter<EquipoGrupoRepository>, @repository.getter('PartidoRepository') protected partidoRepositoryGetter: Getter<PartidoRepository>, @repository.getter('FaseTorneoRepository') protected faseTorneoRepositoryGetter: Getter<FaseTorneoRepository>,
  ) {
    super(Grupo, dataSource);
    this.faseTorneo = this.createBelongsToAccessorFor('faseTorneo', faseTorneoRepositoryGetter,);
    this.registerInclusionResolver('faseTorneo', this.faseTorneo.inclusionResolver);
    this.partidos = this.createHasManyRepositoryFactoryFor('partidos', partidoRepositoryGetter,);
    this.registerInclusionResolver('partidos', this.partidos.inclusionResolver);
    this.equipoGrupos = this.createHasManyRepositoryFactoryFor('equipoGrupos', equipoGrupoRepositoryGetter,);
    this.registerInclusionResolver('equipoGrupos', this.equipoGrupos.inclusionResolver);
  }
}
