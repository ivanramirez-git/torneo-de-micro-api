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
import {EquipoGrupo} from '../models';
import {EquipoGrupoRepository} from '../repositories';

export class EquipoGrupoController {
  constructor(
    @repository(EquipoGrupoRepository)
    public equipoGrupoRepository: EquipoGrupoRepository,
  ) { }

  @authenticate('jwt')
  @post('/equipos-grupo')
  @response(200, {
    description: 'EquipoGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(EquipoGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipoGrupo, {
            title: 'NewEquipoGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    equipoGrupo: Omit<EquipoGrupo, 'id'>,
  ): Promise<EquipoGrupo> {
    return this.equipoGrupoRepository.create(equipoGrupo);
  }

  @get('/equipos-grupo/count')
  @response(200, {
    description: 'EquipoGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EquipoGrupo) where?: Where<EquipoGrupo>,
  ): Promise<Count> {
    return this.equipoGrupoRepository.count(where);
  }

  @get('/equipos-grupo')
  @response(200, {
    description: 'Array of EquipoGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EquipoGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EquipoGrupo) filter?: Filter<EquipoGrupo>,
  ): Promise<EquipoGrupo[]> {
    return this.equipoGrupoRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/equipos-grupo')
  @response(200, {
    description: 'EquipoGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipoGrupo, {partial: true}),
        },
      },
    })
    equipoGrupo: EquipoGrupo,
    @param.where(EquipoGrupo) where?: Where<EquipoGrupo>,
  ): Promise<Count> {
    return this.equipoGrupoRepository.updateAll(equipoGrupo, where);
  }

  @get('/equipos-grupo/{id}')
  @response(200, {
    description: 'EquipoGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EquipoGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EquipoGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<EquipoGrupo>
  ): Promise<EquipoGrupo> {
    return this.equipoGrupoRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/equipos-grupo/{id}')
  @response(204, {
    description: 'EquipoGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipoGrupo, {partial: true}),
        },
      },
    })
    equipoGrupo: EquipoGrupo,
  ): Promise<void> {
    await this.equipoGrupoRepository.updateById(id, equipoGrupo);
  }

  @authenticate('jwt')
  @put('/equipos-grupo/{id}')
  @response(204, {
    description: 'EquipoGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() equipoGrupo: EquipoGrupo,
  ): Promise<void> {
    await this.equipoGrupoRepository.replaceById(id, equipoGrupo);
  }

  @authenticate('jwt')
  @del('/equipos-grupo/{id}')
  @response(204, {
    description: 'EquipoGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.equipoGrupoRepository.deleteById(id);
  }
}
