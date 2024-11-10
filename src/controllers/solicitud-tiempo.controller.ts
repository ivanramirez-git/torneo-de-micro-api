import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {SolicitudTiempo} from '../models';
import {SolicitudTiempoRepository} from '../repositories';

export class SolicitudTiempoController {
  constructor(
    @repository(SolicitudTiempoRepository)
    public solicitudTiempoRepository: SolicitudTiempoRepository,
  ) { }

  @authenticate('jwt')
  @post('/solicitudes-tiempo')
  @response(200, {
    description: 'SolicitudTiempo model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudTiempo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {
            title: 'NewSolicitudTiempo',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudTiempo: Omit<SolicitudTiempo, 'id'>,
  ): Promise<SolicitudTiempo> {
    return this.solicitudTiempoRepository.create(solicitudTiempo);
  }

  @get('/solicitudes-tiempo/count')
  @response(200, {
    description: 'SolicitudTiempo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudTiempo) where?: Where<SolicitudTiempo>,
  ): Promise<Count> {
    return this.solicitudTiempoRepository.count(where);
  }

  @get('/solicitudes-tiempo')
  @response(200, {
    description: 'Array of SolicitudTiempo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudTiempo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudTiempo) filter?: Filter<SolicitudTiempo>,
  ): Promise<SolicitudTiempo[]> {
    return this.solicitudTiempoRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/solicitudes-tiempo')
  @response(200, {
    description: 'SolicitudTiempo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {partial: true}),
        },
      },
    })
    solicitudTiempo: SolicitudTiempo,
    @param.where(SolicitudTiempo) where?: Where<SolicitudTiempo>,
  ): Promise<Count> {
    return this.solicitudTiempoRepository.updateAll(solicitudTiempo, where);
  }

  @get('/solicitudes-tiempo/{id}')
  @response(200, {
    description: 'SolicitudTiempo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudTiempo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudTiempo, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudTiempo>
  ): Promise<SolicitudTiempo> {
    return this.solicitudTiempoRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/solicitudes-tiempo/{id}')
  @response(204, {
    description: 'SolicitudTiempo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudTiempo, {partial: true}),
        },
      },
    })
    solicitudTiempo: SolicitudTiempo,
  ): Promise<void> {
    await this.solicitudTiempoRepository.updateById(id, solicitudTiempo);
  }

  @authenticate('jwt')
  @put('/solicitudes-tiempo/{id}')
  @response(204, {
    description: 'SolicitudTiempo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudTiempo: SolicitudTiempo,
  ): Promise<void> {
    await this.solicitudTiempoRepository.replaceById(id, solicitudTiempo);
  }

  @authenticate('jwt')
  @del('/solicitudes-tiempo/{id}')
  @response(204, {
    description: 'SolicitudTiempo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudTiempoRepository.deleteById(id);
  }
}
