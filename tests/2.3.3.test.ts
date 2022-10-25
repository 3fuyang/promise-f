import { describe, test, expect, beforeEach } from 'vitest'
import { PromiseF } from '../src'

const dummy = { dummy: 'dummy' }

describe('2.3.3: Otherwise, if `x` is an object or function, ', () => {
  let numberOfTimesThenWasRetrieved: number

  beforeEach(() => {
    numberOfTimesThenWasRetrieved = 0
  })

  test('`x` is an object with null prototype', () => {
    function xFactory() {
      return Object.create(null, {
        then: {
          get: () => {
            return (onFulfilled: any) => {
              ++numberOfTimesThenWasRetrieved
              onFulfilled()
            }
          }
        }
      })
    }

    const promise = (PromiseF.resolve(dummy) as PromiseF<typeof dummy>).then(() => {
      return xFactory()
    })

    promise.then(() => {
      expect(numberOfTimesThenWasRetrieved).equal(1)
    })
  })
})