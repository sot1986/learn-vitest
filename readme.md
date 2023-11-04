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
8. Make it working for deep merge
```ts
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
```
Test fails. Because Object.assign not support more than 1 level merged

9. update the function and ensure with skipping last test that everything works as well.
```ts
export function deepMerge(a, b) {
  if (Array.isArray(a)) {
    return[ ...a, ...b]
  }

  const merged = { ...a }

  for (const key of Object.keys(b)) {
    merged[key] = b[key]
  }

  return merged
}

test.skip('deep merge with overlaps', () => {
// ...
}
```
It works.
Then remove the skip and see it is failing as expected.

10. Update the deep merge to handle deep merge
```ts
export function deepMerge(a, b) {
  if (Array.isArray(a)) {
    return[ ...a, ...b]
  }

  const merged = { ...a }

  for (const key of Object.keys(b)) {
    if (typeof a[key] === 'object' || Array.isArray(a[key]))
      merged[key] = deepMerge(a[key], b[key])
    else
      merged[key] = b[key]
  }

  return merged
}
```