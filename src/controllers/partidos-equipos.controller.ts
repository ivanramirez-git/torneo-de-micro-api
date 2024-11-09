import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Equipos,
  Partidos,
} from '../models';
import {PartidosRepository} from '../repositories';

export class PartidosEquiposController {
  constructor(
    @repository(PartidosRepository)
    public partidosRepository: PartidosRepository,
  ) { }

  @get('/partidos/{id}/equipo-local', {
    responses: {
      '200': {
        description: 'Equipos belonging to Partidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipoLocal(
    @param.path.string('id') id: typeof Partidos.prototype.id,
  ): Promise<Equipos> {
    return this.partidosRepository.equipoLocal(id);
  }


  @get('/partidos/{id}/equipo-visitante', {
    responses: {
      '200': {
        description: 'Equipos belonging to Partidos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipos),
          },
        },
      },
    },
  })
  async getEquipoVisitante(
    @param.path.string('id') id: typeof Partidos.prototype.id,
  ): Promise<Equipos> {
    return this.partidosRepository.equipoVisitante(id);
  }
}
