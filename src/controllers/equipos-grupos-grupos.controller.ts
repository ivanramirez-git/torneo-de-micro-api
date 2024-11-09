import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EquiposGrupos,
  Grupos,
} from '../models';
import {EquiposGruposRepository} from '../repositories';

export class EquiposGruposGruposController {
  constructor(
    @repository(EquiposGruposRepository)
    public equiposGruposRepository: EquiposGruposRepository,
  ) { }

  @get('/equipos-grupos/{id}/grupos', {
    responses: {
      '200': {
        description: 'Grupos belonging to EquiposGrupos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Grupos),
          },
        },
      },
    },
  })
  async getGrupos(
    @param.path.string('id') id: typeof EquiposGrupos.prototype.id,
  ): Promise<Grupos> {
    return this.equiposGruposRepository.grupos(id);
  }
}
