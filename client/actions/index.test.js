import nock from 'nock'
import * as actions from '../../client/actions'

import {
  navigate,
  showError,
  requestObjects,
  receiveObjects,
  requestObject,
  receiveObject,
  includeObject,
  adjustObject,
  removeObject
} from '../../client/actions'

test('NAVIGATE  action returns the correct action', () => {
  const action = navigate('edit')
  expect(action.type).toBe('NAVIGATE')
  expect(action.target).toBe('edit')
})

test('SHOW_ERROR action returns the correct action', () => {
  const action = showError('Houston, we have a problem')
  expect(action.type).toBe('SHOW_ERROR')
  expect(action.errorMessage).toBe('Houston, we have a problem')
})

test('REQUEST_OBJECTS action returns the correct action', () => {
  const action = requestObjects()
  expect(action.type).toBe('REQUEST_OBJECTS')
})

test('RECEIVE_OBJECTS action returns the correct action', () => {
  const objects = [{ id: 1, name: 'object 01', description: 'description for object 01' },
    { id: 2, name: 'object 02', description: 'description for object 02' }]
  const action = receiveObjects(objects)
  expect(action.type).toBe('RECEIVE_OBJECTS')
  expect(action.objects).toHaveLength(2)
})

test('REQUEST_OBJECT action returns the correct action', () => {
  const action = requestObject(1)
  expect(action.type).toBe('REQUEST_OBJECT')
  expect(action.id).toBe(1)
})

test('RECEIVE_OBJECT action returns the correct action', () => {
  const object = { id: 1, name: 'object 01', description: 'description for object 01' }
  const action = receiveObject(object)
  expect(action.type).toBe('RECEIVE_OBJECT')
  expect(action.object).toMatchObject(object)
})

test('ADD_OBJECT action returns the correct action', () => {
  const object = { id: 1, name: 'object 01', description: 'description for object 01' }
  const action = includeObject(object)
  expect(action.type).toBe('ADD_OBJECT')
  expect(action.object).toMatchObject(object)
})

test('UPDATE_OBJECT action returns the correct action', () => {
  const object = { id: 1, name: 'object 01 updated', description: 'description for object 01 updated' }
  const action = adjustObject(object)
  expect(action.type).toBe('UPDATE_OBJECT')
  expect(action.object).toMatchObject(object)
})

test('DEL_OBJECT action returns the correct action', () => {
  const action = removeObject(1)
  expect(action.type).toBe('DEL_OBJECT')
  expect(action.id).toBe(1)
})

test('fetchObjects', () => {
  const scope = nock('http://localhost:3000')
    .get('/api/v1/objects')
    .reply(200, [{ data: { id: 1, name: 'this', description: 'that' } }])

  const dispatch = jest.fn()

  return actions.fetchObjects()(dispatch)
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('REQUEST_OBJECTS')
      expect(dispatch.mock.calls[1][0].type).toBe('RECEIVE_OBJECTS')
      scope.done()
      return null
    })
})

test('fetchObject', () => {
  const scope = nock('http://localhost:3000')
    .get('/api/v1/objects/1')
    .reply(200, [{ data: { id: 1, name: 'this', description: 'that' } }])

  const dispatch = jest.fn()

  return actions.fetchObject(1)(dispatch)
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('REQUEST_OBJECT')
      expect(dispatch.mock.calls[1][0].type).toBe('RECEIVE_OBJECT')
      scope.done()
      return null
    })
})

test('addNewObject', () => {
  const scope = nock('http://localhost:3000')
    .post('/api/v1/objects/1')
    .reply(200, [{ data: { id: 1, name: 'this', description: 'that' } }])

  const dispatch = jest.fn()
  const newObject = { id: 1, name: 'this', description: 'that' }

  return actions.addNewObject(newObject)(dispatch)
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('ADD_OBJECT')
      expect(dispatch.mock.calls[1][0].type).toBe('REQUEST_OBJECT')
      expect(dispatch.mock.calls[2][0].type).toBe('RECEIVE_OBJECT')
      expect(dispatch.mock.calls[3][0].type).toBe('NAVIGATE')
      scope.done()
      return null
    })
})

test('changeObject', () => {
  const scope = nock('http://localhost:3000')
    .patch('/api/v1/objects/1')
    .reply(200, [{ data: { id: 1, name: 'this', description: 'that' } }])

  const dispatch = jest.fn()
  const changedObject = { id: 1, name: 'this', description: 'that' }

  return actions.changeObject(changedObject)(dispatch)
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('UPDATE_OBJECT')
      expect(dispatch.mock.calls[1][0].type).toBe('NAVIGATE')
      scope.done()
      return null
    })
})

test('expungeObject', () => {
  const scope = nock('http://localhost:3000')
    .delete('/api/v1/objects/1')
    .reply(200, [{ data: { id: 1, name: 'this', description: 'that' } }])

  const dispatch = jest.fn()

  return actions.expungeObject(1)(dispatch)
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('DEL_OBJECT')
      scope.done()
      return null
    })
})
