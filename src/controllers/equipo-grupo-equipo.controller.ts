import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EquipoGrupo,
  Equipo,
} from '../models';
import {EquipoGrupoRepository} from '../repositories';

export class EquipoGrupoEquipoController {
  constructor(
    @repository(EquipoGrupoRepository)
    public equipoGrupoRepository: EquipoGrupoRepository,
  ) { }

  @get('/equipo-grupos/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to EquipoGrupo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.string('id') id: typeof EquipoGrupo.prototype.id,
  ): Promise<Equipo> {
    return this.equipoGrupoRepository.equipo(id);
  }
}
