/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference path="./a-plus-test.d.ts" />
import promisesAplusTests, { type Adapter } from 'promises-aplus-tests'
import { PromiseF } from '../src'
import { writeFileSync } from 'fs'

const adapter: Adapter = {
  resolved: PromiseF.resolve,
  // @ts-ignore
  rejected: PromiseF.reject,
  // @ts-ignore
  deferred: () => {
    const p = new PromiseF(() => null)
    const { resolve, reject } = p as any
    return {
      promise: p,
      resolve,
      reject
    }
  }
}

promisesAplusTests(adapter, (err: any) => {
  console.log('\n', err)
})