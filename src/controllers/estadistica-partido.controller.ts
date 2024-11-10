import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EstadisticaPartido} from '../models';
import {EstadisticaPartidoRepository} from '../repositories';

export class EstadisticaPartidoController {
  constructor(
    @repository(EstadisticaPartidoRepository)
    public estadisticaPartidoRepository : EstadisticaPartidoRepository,
  ) {}

  @post('/estadisticas-partido')
  @response(200, {
    description: 'EstadisticaPartido model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadisticaPartido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticaPartido, {
            title: 'NewEstadisticaPartido',
            exclude: ['id'],
          }),
        },
      },
    })
    estadisticaPartido: Omit<EstadisticaPartido, 'id'>,
  ): Promise<EstadisticaPartido> {
    return this.estadisticaPartidoRepository.create(estadisticaPartido);
  }

  @get('/estadisticas-partido/count')
  @response(200, {
    description: 'EstadisticaPartido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadisticaPartido) where?: Where<EstadisticaPartido>,
  ): Promise<Count> {
    return this.estadisticaPartidoRepository.count(where);
  }

  @get('/estadisticas-partido')
  @response(200, {
    description: 'Array of EstadisticaPartido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadisticaPartido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadisticaPartido) filter?: Filter<EstadisticaPartido>,
  ): Promise<EstadisticaPartido[]> {
    return this.estadisticaPartidoRepository.find(filter);
  }

  @patch('/estadisticas-partido')
  @response(200, {
    description: 'EstadisticaPartido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticaPartido, {partial: true}),
        },
      },
    })
    estadisticaPartido: EstadisticaPartido,
    @param.where(EstadisticaPartido) where?: Where<EstadisticaPartido>,
  ): Promise<Count> {
    return this.estadisticaPartidoRepository.updateAll(estadisticaPartido, where);
  }

  @get('/estadisticas-partido/{id}')
  @response(200, {
    description: 'EstadisticaPartido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadisticaPartido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadisticaPartido, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadisticaPartido>
  ): Promise<EstadisticaPartido> {
    return this.estadisticaPartidoRepository.findById(id, filter);
  }

  @patch('/estadisticas-partido/{id}')
  @response(204, {
    description: 'EstadisticaPartido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadisticaPartido, {partial: true}),
        },
      },
    })
    estadisticaPartido: EstadisticaPartido,
  ): Promise<void> {
    await this.estadisticaPartidoRepository.updateById(id, estadisticaPartido);
  }

  @put('/estadisticas-partido/{id}')
  @response(204, {
    description: 'EstadisticaPartido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadisticaPartido: EstadisticaPartido,
  ): Promise<void> {
    await this.estadisticaPartidoRepository.replaceById(id, estadisticaPartido);
  }

  @del('/estadisticas-partido/{id}')
  @response(204, {
    description: 'EstadisticaPartido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadisticaPartidoRepository.deleteById(id);
  }
}
