import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Equipo,
  Jugador,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorEquipoController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadores/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to Jugador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.string('id') id: typeof Jugador.prototype.id,
  ): Promise<Equipo> {
    return this.jugadorRepository.equipo(id);
  }
}
