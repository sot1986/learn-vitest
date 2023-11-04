# Deep merge function
1. Create a src/index.ts with empty deepMerge function
2. Create new test file importing it
3. Make simple test to merge two object and let it fails

```ts
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
```
4. Update the deepMerge function to pass the test
```ts
export function deepMerge(a, b) {
  return Object.assign(a, b)
}
```

5. Add one more test case for property overlap
```ts
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
```
6. Move one until test fails. Consider arrays
```ts

test('shallow merge with array', () => {
  const merged = deepMerge(
    ['vue', 'react'],
    ['svelte', 'solid']
  )

  expect(merged).toEqual(
    ['vue', 'react', 'svelte', 'solid']
  )
})
```
7. Update the function to handle array
```ts
export function deepMerge(a, b) {
  if (Array.isArray(a)) {
    return[ ...a, ...b]
  }
  return Object.assign(a, b)
}
```