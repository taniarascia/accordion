import { tone } from './data.js'

export const one = [
  { id: '1-1', name: 'G♭', frequency: tone.Gb[3] },
  { id: '1-2', name: 'A', frequency: tone.A[3] },
  { id: '1-3', name: 'C', frequency: tone.C[4] },
  { id: '1-4', name: 'E♭', frequency: tone.Eb[4] },
  { id: '1-5', name: 'G♭', frequency: tone.Gb[4] },
  { id: '1-6', name: 'A', frequency: tone.A[4] },
  { id: '1-7', name: 'C', frequency: tone.C[5] },
  { id: '1-8', name: 'E♭', frequency: tone.Eb[5] },
  { id: '1-9', name: 'G♭', frequency: tone.Gb[5] },
  { id: '1-10', name: 'A', frequency: tone.A[6] },
]

export const two = [
  { id: '2-1', name: 'E', frequency: tone.E[3] },
  { id: '2-2', name: 'G', frequency: tone.G[3] },
  { id: '2-3', name: 'B♭', frequency: tone.Bb[3] },
  { id: '2-4', name: 'D♭', frequency: tone.Db[4] },
  { id: '2-5', name: 'E', frequency: tone.E[4] },
  { id: '2-6', name: 'G', frequency: tone.G[4] },
  { id: '2-7', name: 'B♭', frequency: tone.Bb[4] },
  { id: '2-8', name: 'D♭', frequency: tone.Db[5] },
  { id: '2-9', name: 'E', frequency: tone.E[5] },
  { id: '2-10', name: 'G', frequency: tone.G[5] },
  { id: '2-11', name: 'B♭', frequency: tone.Bb[6] },
]

export const three = [
  { id: '3-1', name: 'F', frequency: tone.F[3] },
  { id: '3-2', name: 'A♭', frequency: tone.Ab[3] },
  { id: '3-3', name: 'B', frequency: tone.B[3] },
  { id: '3-4', name: 'D', frequency: tone.D[4] },
  { id: '3-5', name: 'F', frequency: tone.F[4] },
  { id: '3-6', name: 'A♭', frequency: tone.Ab[4] },
  { id: '3-7', name: 'B', frequency: tone.B[4] },
  { id: '3-8', name: 'D', frequency: tone.D[5] },
  { id: '3-9', name: 'F', frequency: tone.F[5] },
  { id: '3-10', name: 'A♭', frequency: tone.Ab[5] },
]

export const four = [
  { id: '4-1', name: 'G♭', frequency: tone.Gb[3] },
  { id: '4-2', name: 'A', frequency: tone.A[3] },
  { id: '4-3', name: 'C', frequency: tone.C[4] },
  { id: '4-4', name: 'E♭', frequency: tone.Eb[4] },
  { id: '4-5', name: 'G♭', frequency: tone.Gb[4] },
  { id: '4-6', name: 'A', frequency: tone.A[4] },
  { id: '4-7', name: 'C', frequency: tone.C[5] },
  { id: '4-8', name: 'E♭', frequency: tone.Eb[5] },
  { id: '4-9', name: 'G♭', frequency: tone.Gb[5] },
  { id: '4-10', name: 'A', frequency: tone.A[5] },
]

export const layout = { one, two, three, four }
export const buttonIdMap = [...one, ...two, ...three, ...four].reduce((acc, value) => {
  return { ...acc, [value.id]: value }
}, {})
export const rowMap = { 1: 'one', 2: 'two', 3: 'three', 4: 'four' }
export const rows = Object.values(rowMap)
