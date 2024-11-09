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
  Equipos,
} from '../models';
import {EquiposGruposRepository} from '../repositories';

export class EquiposGruposEquiposController {
  constructor(
    @repository(EquiposGruposRepository)
    public equiposGruposRepository: EquiposGruposRepository,
  ) { }

  @get('/equipos-grupos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to EquiposGrupos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof EquiposGrupos.prototype.id,
  ): Promise<Equipos> {
    return this.equiposGruposRepository.equipos(id);
  }
}
