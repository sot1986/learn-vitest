import { test, expect } from 'vitest'
import { deepMerge } from '../src'

test('shallow merge', () => {
  const merged = deepMerge({
    name: 'Matteo'
  }, {
    github: 'sot1986'
  })

  expect(merged).toEqual({
    name: 'Matteo',
    github: 'sot1986'
  })
})

test('shallow merge with property overlaps', () => {
  const merged = deepMerge({
    name: 'Matteo',
    github: 'unknown'
  }, {
    github: 'sot1986',
    twitter: 'none'
  })

  expect(merged).toEqual({
    name: 'Matteo',
    github: 'sot1986',
    twitter: 'none'
  })
})

test('shallow merge with array', () => {
  const merged = deepMerge(
    ['vue', 'react'],
    ['svelte', 'solid']
  )

  expect(merged).toEqual(
    ['vue', 'react', 'svelte', 'solid']
  )
})