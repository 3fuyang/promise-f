import { expect, test, describe } from 'vitest'
import { PromiseF } from '../src'

describe('PromiseF <constructor>', () => {
  test('resolves like a promise', async () => {
    return new PromiseF<number>((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 500)
    }).then((val) => {
      expect(val).toBe(1)
    })
  })

  test('resolves with the expected value', async () => {
    return new PromiseF<number>((resolve) => {
      resolve(30)
    }).then((val) => {
      expect(val).toBe(30)
    })
  })

  test('catches errors (reject)', async () => {
    const error = new Error('Surprise!')

    return new PromiseF((resolve, reject) => {
      return reject(error)
    }).catch((err: Error) => {
      expect(err).toBe(error)
    })
  })

  test('catches errors (throw)', async () => {
    const error = new Error('Last Surprise!')

    return new PromiseF(() => {
      throw error
    }).catch((err) => {
      expect(err).toBe(error)
    })
  })

  test.todo('is not mutable - then returns a new promise', async () => {
    const start = new PromiseF<number>((resolve) => resolve(20))

    /* return PromiseF.all([
      start
        .then((val) => {
          expect(val).toBe(20)
          return 30
        })
        .then((val) => {
          expect(val).toBe(30)
        }),
      start
        .then((val) => expect(val).toBe(20))
    ]) */
  })
})