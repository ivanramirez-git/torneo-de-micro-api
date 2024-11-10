import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  EstadisticaPartido,
  Partido,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoEstadisticaPartidoController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/estadistica-partidos', {
    responses: {
      '200': {
        description: 'Array of Partido has many EstadisticaPartido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadisticaPartido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EstadisticaPartido>,
  ): Promise<EstadisticaPartido[]> {
    return this.partidoRepository.estadisticasPartido(id).find(filter);
  }

  @authenticate('jwt')
  @post('/partidos/{id}/estadistica-partidos', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadisticaPartido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Partido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticaPartido, {
            title: 'NewEstadisticaPartidoInPartido',
            exclude: ['id'],
            optional: ['partidoId']
          }),
        },
      },
    }) estadisticaPartido: Omit<EstadisticaPartido, 'id'>,
  ): Promise<EstadisticaPartido> {
    return this.partidoRepository.estadisticasPartido(id).create(estadisticaPartido);
  }

  @authenticate('jwt')
  @patch('/partidos/{id}/estadistica-partidos', {
    responses: {
      '200': {
        description: 'Partido.EstadisticaPartido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticaPartido, {partial: true}),
        },
      },
    })
    estadisticaPartido: Partial<EstadisticaPartido>,
    @param.query.object('where', getWhereSchemaFor(EstadisticaPartido)) where?: Where<EstadisticaPartido>,
  ): Promise<Count> {
    return this.partidoRepository.estadisticasPartido(id).patch(estadisticaPartido, where);
  }

  @authenticate('jwt')
  @del('/partidos/{id}/estadistica-partidos', {
    responses: {
      '200': {
        description: 'Partido.EstadisticaPartido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EstadisticaPartido)) where?: Where<EstadisticaPartido>,
  ): Promise<Count> {
    return this.partidoRepository.estadisticasPartido(id).delete(where);
  }
}
