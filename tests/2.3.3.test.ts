import { describe, test, expect, beforeEach } from 'vitest'
import { PromiseF } from '../src'

const dummy = { dummy: 'dummy' }

describe('2.3.3: If `x` is an object or function, ', () => {

  test('`x` is an object with null prototype', () => {
    let numberOfTimesThenWasRetrieved: number

    beforeEach(() => {
      numberOfTimesThenWasRetrieved = 0
    })

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

    // testPromiseResolution

    const promise = (PromiseF.resolve(dummy) as PromiseF<typeof dummy>).then(() => {
      return xFactory()
    })

    promise.then(() => {
      expect(numberOfTimesThenWasRetrieved).equal(1)
    })
  })
})