import { tone } from './data.js'

export const keyMapGarmon = {
  z: { row: 1, column: 1 },
  x: { row: 1, column: 2 },
  c: { row: 1, column: 3 },
  v: { row: 1, column: 4 },
  b: { row: 1, column: 5 },
  n: { row: 1, column: 6 },
  m: { row: 1, column: 7 },
  ',': { row: 1, column: 8 },
  '.': { row: 1, column: 9 },
  '/': { row: 1, column: 10 },
  s: { row: 2, column: 1 },
  d: { row: 2, column: 2 },
  f: { row: 2, column: 3 },
  g: { row: 2, column: 4 },
  h: { row: 2, column: 5 },
  j: { row: 2, column: 6 },
  k: { row: 2, column: 7 },
  l: { row: 2, column: 8 },
  ';': { row: 2, column: 9 },
  // bass
  3: { row: 3, column: 1 },
  4: { row: 3, column: 2 },
  5: { row: 3, column: 3 },
  6: { row: 3, column: 4 },
  7: { row: 3, column: 5 },
  8: { row: 3, column: 6 },
  9: { row: 3, column: 7 },
  0: { row: 3, column: 8 },
  e: { row: 4, column: 1 },
  r: { row: 4, column: 2 },
  t: { row: 4, column: 3 },
  y: { row: 4, column: 4 },
  u: { row: 4, column: 5 },
  i: { row: 4, column: 6 },
  o: { row: 4, column: 7 },
  p: { row: 4, column: 8 },
}

export const one = [
  { id: '1-1', name: 'D♯', frequency: tone.Eb[4] },
  { id: '1-2', name: 'G♯', frequency: tone.Ab[3] },
  { id: '1-3', name: 'C', frequency: tone.C[3] },
  { id: '1-4', name: 'E', frequency: tone.E[3] },
  { id: '1-5', name: 'G', frequency: tone.G[3] },
  { id: '1-6', name: 'B', frequency: tone.B[3] },
  { id: '1-7', name: 'D', frequency: tone.D[4] },
  { id: '1-8', name: 'F', frequency: tone.F[4] },
  { id: '1-9', name: 'A', frequency: tone.A[4] },
  { id: '1-10', name: 'C', frequency: tone.C[5] },
]

export const two = [
  { id: '2-1', name: 'F♯', frequency: tone.Gb[4] },
  { id: '2-2', name: 'D', frequency: tone.D[3] },
  { id: '2-3', name: 'F', frequency: tone.F[3] },
  { id: '2-4', name: 'A', frequency: tone.A[3] },
  { id: '2-5', name: 'C', frequency: tone.C[4] },
  { id: '2-6', name: 'E', frequency: tone.E[4] },
  { id: '2-7', name: 'G', frequency: tone.G[4] },
  { id: '2-8', name: 'B', frequency: tone.B[4] },
  { id: '2-9', name: 'D', frequency: tone.D[5] },
]

export const three = [
  { id: '3-1', name: 'd7', frequency: [tone.D[3], tone.Gb[3], tone.A[3], tone.C[3]] },
  { id: '3-2', name: 'D', frequency: tone.D[2] },
  { id: '3-3', name: 'g7', frequency: [tone.G[3], tone.B[3], tone.D[3], tone.F[3]] },
  { id: '3-4', name: 'G', frequency: tone.G[2] },
  { id: '3-5', name: 'c', frequency: [tone.C[3], tone.E[3], tone.G[3]] },
  { id: '3-6', name: 'C', frequency: tone.C[2] },
  { id: '3-7', name: 'f', frequency: [tone.F[3], tone.A[3], tone.C[3]] },
  { id: '3-8', name: 'F', frequency: tone.F[2] },
]

export const four = [
  { id: '4-1', name: 'b7', frequency: [tone.B[3], tone.Eb[3], tone.Gb[3], tone.A[3]] },
  { id: '4-2', name: 'B', frequency: tone.B[1] },
  { id: '4-3', name: 'e7', frequency: [tone.E[3], tone.Ab[3], tone.B[3], tone.D[3]] },
  { id: '4-4', name: 'E', frequency: tone.E[2] },
  { id: '4-5', name: 'am', frequency: [tone.A[3], tone.C[3], tone.E[3]] },
  { id: '4-6', name: 'A', frequency: tone.A[1] },
  { id: '4-7', name: 'dm', frequency: [tone.D[3], tone.F[3], tone.A[3]] },
  { id: '4-8', name: 'D', frequency: tone.D[2] },
]

export const layout = { one, two, three, four }
export const buttonIdMap = [...one, ...two, ...three, ...four].reduce((acc, value) => {
  return { ...acc, [value.id]: value }
}, {})

export const layouts = {
  'Garmon': {name: "Garmon", layout: layout, buttonIdMap: buttonIdMap},
}

export const rowMap = { 1: 'one', 2: 'two', 3: 'four', 4: 'three' }
export const rows = ['one', 'two']
export const bassRows = ['four', 'three']