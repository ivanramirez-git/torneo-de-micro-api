import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jugadores,
  Equipos,
} from '../models';
import {JugadoresRepository} from '../repositories';

export class JugadoresEquiposController {
  constructor(
    @repository(JugadoresRepository)
    public jugadoresRepository: JugadoresRepository,
  ) { }

  @get('/jugadores/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to Jugadores',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof Jugadores.prototype.id,
  ): Promise<Equipos> {
    return this.jugadoresRepository.equipos(id);
  }
}
