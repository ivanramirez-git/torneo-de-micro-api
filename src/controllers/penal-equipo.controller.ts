import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Penal,
  Equipo,
} from '../models';
import {PenalRepository} from '../repositories';

export class PenalEquipoController {
  constructor(
    @repository(PenalRepository)
    public penalRepository: PenalRepository,
  ) { }

  @get('/penals/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to Penal',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.string('id') id: typeof Penal.prototype.id,
  ): Promise<Equipo> {
    return this.penalRepository.equipo(id);
  }
}
