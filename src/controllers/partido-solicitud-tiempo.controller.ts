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
  Partido,
  SolicitudTiempo,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoSolicitudTiempoController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Array of Partido has many SolicitudTiempo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudTiempo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudTiempo>,
  ): Promise<SolicitudTiempo[]> {
    return this.partidoRepository.solicitudesTiempo(id).find(filter);
  }

  @post('/partidos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudTiempo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Partido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {
            title: 'NewSolicitudTiempoInPartido',
            exclude: ['id'],
            optional: ['partidoId']
          }),
        },
      },
    }) solicitudTiempo: Omit<SolicitudTiempo, 'id'>,
  ): Promise<SolicitudTiempo> {
    return this.partidoRepository.solicitudesTiempo(id).create(solicitudTiempo);
  }

  @patch('/partidos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Partido.SolicitudTiempo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {partial: true}),
        },
      },
    })
    solicitudTiempo: Partial<SolicitudTiempo>,
    @param.query.object('where', getWhereSchemaFor(SolicitudTiempo)) where?: Where<SolicitudTiempo>,
  ): Promise<Count> {
    return this.partidoRepository.solicitudesTiempo(id).patch(solicitudTiempo, where);
  }

  @del('/partidos/{id}/solicitud-tiempos', {
    responses: {
      '200': {
        description: 'Partido.SolicitudTiempo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudTiempo)) where?: Where<SolicitudTiempo>,
  ): Promise<Count> {
    return this.partidoRepository.solicitudesTiempo(id).delete(where);
  }
}
