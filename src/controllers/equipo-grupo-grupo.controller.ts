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
  Grupo,
} from '../models';
import {EquipoGrupoRepository} from '../repositories';

export class EquipoGrupoGrupoController {
  constructor(
    @repository(EquipoGrupoRepository)
    public equipoGrupoRepository: EquipoGrupoRepository,
  ) { }

  @get('/equipo-grupos/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to EquipoGrupo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Grupo),
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.string('id') id: typeof EquipoGrupo.prototype.id,
  ): Promise<Grupo> {
    return this.equipoGrupoRepository.grupo(id);
  }
}
