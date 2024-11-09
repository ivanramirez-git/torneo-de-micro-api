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
import {CaminoEliminatorias} from '../models';
import {CaminoEliminatoriasRepository} from '../repositories';

export class CaminoEliminatoriasController {
  constructor(
    @repository(CaminoEliminatoriasRepository)
    public caminoEliminatoriasRepository : CaminoEliminatoriasRepository,
  ) {}

  @post('/camino-eliminatorias')
  @response(200, {
    description: 'CaminoEliminatorias model instance',
    content: {'application/json': {schema: getModelSchemaRef(CaminoEliminatorias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaminoEliminatorias, {
            title: 'NewCaminoEliminatorias',
            exclude: ['id'],
          }),
        },
      },
    })
    caminoEliminatorias: Omit<CaminoEliminatorias, 'id'>,
  ): Promise<CaminoEliminatorias> {
    return this.caminoEliminatoriasRepository.create(caminoEliminatorias);
  }

  @get('/camino-eliminatorias/count')
  @response(200, {
    description: 'CaminoEliminatorias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CaminoEliminatorias) where?: Where<CaminoEliminatorias>,
  ): Promise<Count> {
    return this.caminoEliminatoriasRepository.count(where);
  }

  @get('/camino-eliminatorias')
  @response(200, {
    description: 'Array of CaminoEliminatorias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CaminoEliminatorias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CaminoEliminatorias) filter?: Filter<CaminoEliminatorias>,
  ): Promise<CaminoEliminatorias[]> {
    return this.caminoEliminatoriasRepository.find(filter);
  }

  @patch('/camino-eliminatorias')
  @response(200, {
    description: 'CaminoEliminatorias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaminoEliminatorias, {partial: true}),
        },
      },
    })
    caminoEliminatorias: CaminoEliminatorias,
    @param.where(CaminoEliminatorias) where?: Where<CaminoEliminatorias>,
  ): Promise<Count> {
    return this.caminoEliminatoriasRepository.updateAll(caminoEliminatorias, where);
  }

  @get('/camino-eliminatorias/{id}')
  @response(200, {
    description: 'CaminoEliminatorias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CaminoEliminatorias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CaminoEliminatorias, {exclude: 'where'}) filter?: FilterExcludingWhere<CaminoEliminatorias>
  ): Promise<CaminoEliminatorias> {
    return this.caminoEliminatoriasRepository.findById(id, filter);
  }

  @patch('/camino-eliminatorias/{id}')
  @response(204, {
    description: 'CaminoEliminatorias PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaminoEliminatorias, {partial: true}),
        },
      },
    })
    caminoEliminatorias: CaminoEliminatorias,
  ): Promise<void> {
    await this.caminoEliminatoriasRepository.updateById(id, caminoEliminatorias);
  }

  @put('/camino-eliminatorias/{id}')
  @response(204, {
    description: 'CaminoEliminatorias PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() caminoEliminatorias: CaminoEliminatorias,
  ): Promise<void> {
    await this.caminoEliminatoriasRepository.replaceById(id, caminoEliminatorias);
  }

  @del('/camino-eliminatorias/{id}')
  @response(204, {
    description: 'CaminoEliminatorias DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.caminoEliminatoriasRepository.deleteById(id);
  }
}
