// src/controllers/equipo-partido-visitante.controller.ts
import {authenticate} from '@loopback/authentication';
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
import {Equipo, Partido} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoPartidoVisitanteController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/partidos-visitante', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Partido as equipoVisitante',
        content: {'application/json': {schema: {type: 'array', items: getModelSchemaRef(Partido)}}},
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Partido>,
  ): Promise<Partido[]> {
    return this.equipoRepository.partidosEquipoVisitante(id).find(filter);
  }

  @authenticate('jwt')
  @post('/equipos/{id}/partidos-visitante', {
    responses: {
      '200': {
        description: 'Equipo model instance as equipoVisitante',
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
            title: 'NewPartidoInEquipoVisitante',
            exclude: ['id'],
            optional: ['equipoVisitanteId'],
          }),
        },
      },
    })
    partido: Omit<Partido, 'id'>,
  ): Promise<Partido> {
    return this.equipoRepository.partidosEquipoVisitante(id).create(partido);
  }

  @authenticate('jwt')
  @patch('/equipos/{id}/partidos-visitante', {
    responses: {
      '200': {
        description: 'Equipo.Partido PATCH success count as equipoVisitante',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {schema: getModelSchemaRef(Partido, {partial: true})},
      },
    })
    partido: Partial<Partido>,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.equipoRepository.partidosEquipoVisitante(id).patch(partido, where);
  }

  @authenticate('jwt')
  @del('/equipos/{id}/partidos-visitante', {
    responses: {
      '200': {
        description: 'Equipo.Partido DELETE success count as equipoVisitante',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.equipoRepository.partidosEquipoVisitante(id).delete(where);
  }
}
