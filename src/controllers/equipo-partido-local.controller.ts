// src/controllers/equipo-partido-local.controller.ts
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
  Equipo,
  Partido,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoPartidoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Partido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Partido>,
  ): Promise<Partido[]> {
    return this.equipoRepository.partidosEquipoLocal(id).find(filter);
  }

  @post('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Equipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartidoInEquipo',
            exclude: ['id'],
            optional: ['equipoLocalId']
          }),
        },
      },
    }) partido: Omit<Partido, 'id'>,
  ): Promise<Partido> {
    return this.equipoRepository.partidosEquipoLocal(id).create(partido);
  }

  @patch('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo.Partido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {partial: true}),
        },
      },
    })
    partido: Partial<Partido>,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.equipoRepository.partidosEquipoLocal(id).patch(partido, where);
  }

  @del('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo.Partido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.equipoRepository.partidosEquipoLocal(id).delete(where);
  }
}
