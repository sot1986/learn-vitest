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

test('deep merge with overlaps', () => {
  const merged = deepMerge({
    name: 'Matteo',
    accounts: {
      github: 'unknown'
    }    
  }, {
    accounts: {
      twitter: 'none'
    }    
  })

  expect(merged).toEqual({
    name: 'Matteo',
    accounts: {
      github: 'unknown',
      twitter: 'none'
    }    
  })
})

test('throw errors on merging two different types', () => {
  expect(() => deepMerge(
    ['foo', 'bar'],
    { foo: 'bar' }
  )).toThrowError('Error: Can not merge two different types')
})