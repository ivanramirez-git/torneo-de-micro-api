// src/controllers/equipo-partido.controller.ts
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

export class EquipoPartidoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Partido as equipoLocal or equipoVisitante',
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
    const partidosLocal = await this.equipoRepository.partidosEquipoLocal(id).find(filter);
    const partidosVisitante = await this.equipoRepository.partidosEquipoVisitante(id).find(filter);
    return [...partidosLocal, ...partidosVisitante];
  }

  @authenticate('jwt')
  @post('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo model instance as equipoLocal or equipoVisitante',
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
            optional: ['equipoLocalId', 'equipoVisitanteId'],
          }),
        },
      },
    }) partido: Omit<Partido, 'id'>,
  ): Promise<Partido> {
    if (partido.equipoLocalId) {
      return this.equipoRepository.partidosEquipoLocal(id).create(partido);
    } else if (partido.equipoVisitanteId) {
      return this.equipoRepository.partidosEquipoVisitante(id).create(partido);
    } else {
      throw new Error('Debe especificar equipoLocalId o equipoVisitanteId para crear el partido.');
    }
  }

  @authenticate('jwt')
  @patch('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo.Partido PATCH success count as equipoLocal or equipoVisitante',
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
    const countLocal = await this.equipoRepository.partidosEquipoLocal(id).patch(partido, where);
    const countVisitante = await this.equipoRepository.partidosEquipoVisitante(id).patch(partido, where);
    return {count: countLocal.count + countVisitante.count};
  }

  @authenticate('jwt')
  @del('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo.Partido DELETE success count as equipoLocal or equipoVisitante',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    const countLocal = await this.equipoRepository.partidosEquipoLocal(id).delete(where);
    const countVisitante = await this.equipoRepository.partidosEquipoVisitante(id).delete(where);
    return {count: countLocal.count + countVisitante.count};
  }
}
