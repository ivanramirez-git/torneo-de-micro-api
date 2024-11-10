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
import {Partido} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  @authenticate('jwt')
  @post('/partidos')
  @response(200, {
    description: 'Partido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Partido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartido',
            exclude: ['id'],
          }),
        },
      },
    })
    partido: Omit<Partido, 'id'>,
  ): Promise<Partido> {
    return this.partidoRepository.create(partido);
  }

  @get('/partidos/count')
  @response(200, {
    description: 'Partido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Partido) where?: Where<Partido>,
  ): Promise<Count> {
    return this.partidoRepository.count(where);
  }

  @get('/partidos')
  @response(200, {
    description: 'Array of Partido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Partido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Partido) filter?: Filter<Partido>,
  ): Promise<Partido[]> {
    return this.partidoRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/partidos')
  @response(200, {
    description: 'Partido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {partial: true}),
        },
      },
    })
    partido: Partido,
    @param.where(Partido) where?: Where<Partido>,
  ): Promise<Count> {
    return this.partidoRepository.updateAll(partido, where);
  }

  @get('/partidos/{id}')
  @response(200, {
    description: 'Partido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Partido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Partido, {exclude: 'where'}) filter?: FilterExcludingWhere<Partido>
  ): Promise<Partido> {
    return this.partidoRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/partidos/{id}')
  @response(204, {
    description: 'Partido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {partial: true}),
        },
      },
    })
    partido: Partido,
  ): Promise<void> {
    await this.partidoRepository.updateById(id, partido);
  }

  @authenticate('jwt')
  @put('/partidos/{id}')
  @response(204, {
    description: 'Partido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partido: Partido,
  ): Promise<void> {
    await this.partidoRepository.replaceById(id, partido);
  }

  @authenticate('jwt')
  @del('/partidos/{id}')
  @response(204, {
    description: 'Partido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partidoRepository.deleteById(id);
  }
}
