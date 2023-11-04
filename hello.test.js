import { test, expect } from 'vitest'

test('1 + 1', () => {

  expect(sum(1,1)).toEqual(2)
})

test('1 + 2 + 3 = 6', () => {

  expect(sum(1,2,3)).toEqual(6)
})

test('1 + 2 + 3 + 4 ... = 6', () => {

  expect(sum(1,2,3, 4)).toEqual(10)
})

test('0', () => {

  expect(sum()).toEqual(0)
})

function sum(...nums) {
  return nums.reduce((res, value) => res + value, 0)
}