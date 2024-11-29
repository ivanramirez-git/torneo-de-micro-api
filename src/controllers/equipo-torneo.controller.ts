import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Equipo,
  Torneo,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoTorneoController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/torneo', {
    responses: {
      '200': {
        description: 'Torneo belonging to Equipo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Torneo),
          },
        },
      },
    },
  })
  async getTorneo(
    @param.path.string('id') id: typeof Equipo.prototype.id,
  ): Promise<Torneo> {
    return this.equipoRepository.torneo(id);
  }
}
