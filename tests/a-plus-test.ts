import promisesAplusTests, { type Adapter } from 'promises-aplus-tests'
import { PromiseF } from '../src'

const adapter: Adapter = {
  resolved: PromiseF.resolve as any,
  rejected: PromiseF.reject as any,
  deferred: () => {
    const { promise, resolve, reject } = PromiseF.withResolvers()

    return {
      promise,
      resolve,
      reject,
    }
  },
}

promisesAplusTests(adapter, (err) => {
  console.log('\n', err)
})
