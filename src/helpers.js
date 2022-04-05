export function playTone(id, row) {
  const audioContext = new AudioContext({
    latencyHint: 'interactive',
    sampleRate: 48000,
  })

  const gainNode = audioContext.createGain()
  gainNode.gain.value = 0.6
  gainNode.connect(audioContext.destination)

  const oscillator = audioContext.createOscillator()
  oscillator.type = 'sine'
  oscillator.connect(gainNode)
  const { frequency } = layout[row].find((data) => data.id === id)

  oscillator.frequency.value = frequency
  oscillator.start()

  return { oscillator, audioContext, gainNode }
}
