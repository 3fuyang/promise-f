import { test, expect } from 'vitest'
import { PromiseF } from '../src'

test('', () => {
  new PromiseF<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
    resolve(PromiseF.resolve(2))
  }).then((res) => {
    return new PromiseF((resolve) => {
      setTimeout(() => {
        resolve(res)
      })
      resolve(3)
    })
  }).then((res) => {
    expect(res).toBe(3)
  })
})
