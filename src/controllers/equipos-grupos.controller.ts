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
import {EquiposGrupos} from '../models';
import {EquiposGruposRepository} from '../repositories';

export class EquiposGruposController {
  constructor(
    @repository(EquiposGruposRepository)
    public equiposGruposRepository : EquiposGruposRepository,
  ) {}

  @post('/equipos-grupos')
  @response(200, {
    description: 'EquiposGrupos model instance',
    content: {'application/json': {schema: getModelSchemaRef(EquiposGrupos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposGrupos, {
            title: 'NewEquiposGrupos',
            exclude: ['id'],
          }),
        },
      },
    })
    equiposGrupos: Omit<EquiposGrupos, 'id'>,
  ): Promise<EquiposGrupos> {
    return this.equiposGruposRepository.create(equiposGrupos);
  }

  @get('/equipos-grupos/count')
  @response(200, {
    description: 'EquiposGrupos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EquiposGrupos) where?: Where<EquiposGrupos>,
  ): Promise<Count> {
    return this.equiposGruposRepository.count(where);
  }

  @get('/equipos-grupos')
  @response(200, {
    description: 'Array of EquiposGrupos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EquiposGrupos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EquiposGrupos) filter?: Filter<EquiposGrupos>,
  ): Promise<EquiposGrupos[]> {
    return this.equiposGruposRepository.find(filter);
  }

  @patch('/equipos-grupos')
  @response(200, {
    description: 'EquiposGrupos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposGrupos, {partial: true}),
        },
      },
    })
    equiposGrupos: EquiposGrupos,
    @param.where(EquiposGrupos) where?: Where<EquiposGrupos>,
  ): Promise<Count> {
    return this.equiposGruposRepository.updateAll(equiposGrupos, where);
  }

  @get('/equipos-grupos/{id}')
  @response(200, {
    description: 'EquiposGrupos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EquiposGrupos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EquiposGrupos, {exclude: 'where'}) filter?: FilterExcludingWhere<EquiposGrupos>
  ): Promise<EquiposGrupos> {
    return this.equiposGruposRepository.findById(id, filter);
  }

  @patch('/equipos-grupos/{id}')
  @response(204, {
    description: 'EquiposGrupos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposGrupos, {partial: true}),
        },
      },
    })
    equiposGrupos: EquiposGrupos,
  ): Promise<void> {
    await this.equiposGruposRepository.updateById(id, equiposGrupos);
  }

  @put('/equipos-grupos/{id}')
  @response(204, {
    description: 'EquiposGrupos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() equiposGrupos: EquiposGrupos,
  ): Promise<void> {
    await this.equiposGruposRepository.replaceById(id, equiposGrupos);
  }

  @del('/equipos-grupos/{id}')
  @response(204, {
    description: 'EquiposGrupos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.equiposGruposRepository.deleteById(id);
  }
}
