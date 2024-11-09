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
import {Eliminatorias} from '../models';
import {EliminatoriasRepository} from '../repositories';

export class EliminatoriasController {
  constructor(
    @repository(EliminatoriasRepository)
    public eliminatoriasRepository : EliminatoriasRepository,
  ) {}

  @post('/eliminatorias')
  @response(200, {
    description: 'Eliminatorias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Eliminatorias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eliminatorias, {
            title: 'NewEliminatorias',
            exclude: ['id'],
          }),
        },
      },
    })
    eliminatorias: Omit<Eliminatorias, 'id'>,
  ): Promise<Eliminatorias> {
    return this.eliminatoriasRepository.create(eliminatorias);
  }

  @get('/eliminatorias/count')
  @response(200, {
    description: 'Eliminatorias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Eliminatorias) where?: Where<Eliminatorias>,
  ): Promise<Count> {
    return this.eliminatoriasRepository.count(where);
  }

  @get('/eliminatorias')
  @response(200, {
    description: 'Array of Eliminatorias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Eliminatorias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Eliminatorias) filter?: Filter<Eliminatorias>,
  ): Promise<Eliminatorias[]> {
    return this.eliminatoriasRepository.find(filter);
  }

  @patch('/eliminatorias')
  @response(200, {
    description: 'Eliminatorias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eliminatorias, {partial: true}),
        },
      },
    })
    eliminatorias: Eliminatorias,
    @param.where(Eliminatorias) where?: Where<Eliminatorias>,
  ): Promise<Count> {
    return this.eliminatoriasRepository.updateAll(eliminatorias, where);
  }

  @get('/eliminatorias/{id}')
  @response(200, {
    description: 'Eliminatorias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Eliminatorias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Eliminatorias, {exclude: 'where'}) filter?: FilterExcludingWhere<Eliminatorias>
  ): Promise<Eliminatorias> {
    return this.eliminatoriasRepository.findById(id, filter);
  }

  @patch('/eliminatorias/{id}')
  @response(204, {
    description: 'Eliminatorias PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eliminatorias, {partial: true}),
        },
      },
    })
    eliminatorias: Eliminatorias,
  ): Promise<void> {
    await this.eliminatoriasRepository.updateById(id, eliminatorias);
  }

  @put('/eliminatorias/{id}')
  @response(204, {
    description: 'Eliminatorias PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() eliminatorias: Eliminatorias,
  ): Promise<void> {
    await this.eliminatoriasRepository.replaceById(id, eliminatorias);
  }

  @del('/eliminatorias/{id}')
  @response(204, {
    description: 'Eliminatorias DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eliminatoriasRepository.deleteById(id);
  }
}
