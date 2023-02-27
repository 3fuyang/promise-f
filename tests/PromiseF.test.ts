import { expect, test, describe } from 'vitest'
import { PromiseF } from '../src'

describe('Promise/A+ compliances testing', () => {
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

  test('unwrap thenables', async () => {
    const getThenbaleWithDepthN = (n: number) => {
      if (n <= 0) {
        return PromiseF.resolve(1)
      }

      return new PromiseF((resolve) => {
        resolve(getThenbaleWithDepthN(--n))
      })
    }

    const n = Math.ceil(Math.random() * 20) + 1

    const p = getThenbaleWithDepthN(n)

    console.log(`Unwrap a thenable with a depth of ${n}`)
    return (p as PromiseF<number>).then((val) => {
      expect(val).toBe(1)
    })
  })
})
