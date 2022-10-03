import { expect, test, describe } from 'vitest'
import { PromiseF } from '../src/main'

describe('PromiseF <constructor>', () => {
  test('resolves like a promise', () => {
    return new PromiseF<number>((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 50)
    }).then((val) => {
      expect(val).toBe(1)
    })
  })

  test('is always asynchronous', () => {
    const p = new PromiseF((resolve) => resolve(5))

    expect(p.value).not.toBe(5)
  })

  test('resolves with the expected value', () => {
    return new PromiseF<number>((resolve) => resolve(30))
      .then((val) => {
        expect(val).toBe(30)
      })
  })

  test('catches errors (reject)', () => {
    const error = new Error('Surprise!')

    return new PromiseF((resolve, reject) => {
      return reject(error)
    }).catch((err: Error) => {
      expect(err).toBe(error)
    })
  })

  test('catches errors (throw)', () => {
    const error = new Error('Last Surprise!')

    return new PromiseF(() => {
      throw error
    }).catch((err) => {
      expect(err).toBe(error)
    })
  })

  test('is not mutable - then returns a new promise', () => {
    const start = new PromiseF<number>((resolve) => resolve(20))

    return PromiseF.all([
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
    ])
  })
})