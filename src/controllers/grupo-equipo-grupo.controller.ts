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
  Grupo,
  EquipoGrupo,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoEquipoGrupoController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/equipo-grupos', {
    responses: {
      '200': {
        description: 'Array of Grupo has many EquipoGrupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EquipoGrupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EquipoGrupo>,
  ): Promise<EquipoGrupo[]> {
    return this.grupoRepository.equipoGrupos(id).find(filter);
  }

  @post('/grupos/{id}/equipo-grupos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(EquipoGrupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipoGrupo, {
            title: 'NewEquipoGrupoInGrupo',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) equipoGrupo: Omit<EquipoGrupo, 'id'>,
  ): Promise<EquipoGrupo> {
    return this.grupoRepository.equipoGrupos(id).create(equipoGrupo);
  }

  @patch('/grupos/{id}/equipo-grupos', {
    responses: {
      '200': {
        description: 'Grupo.EquipoGrupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquipoGrupo, {partial: true}),
        },
      },
    })
    equipoGrupo: Partial<EquipoGrupo>,
    @param.query.object('where', getWhereSchemaFor(EquipoGrupo)) where?: Where<EquipoGrupo>,
  ): Promise<Count> {
    return this.grupoRepository.equipoGrupos(id).patch(equipoGrupo, where);
  }

  @del('/grupos/{id}/equipo-grupos', {
    responses: {
      '200': {
        description: 'Grupo.EquipoGrupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EquipoGrupo)) where?: Where<EquipoGrupo>,
  ): Promise<Count> {
    return this.grupoRepository.equipoGrupos(id).delete(where);
  }
}
