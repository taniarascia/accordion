<script>
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth
  // F - B♭ - E♭

  const map = {
    C: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
    Db: [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
    D: [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
    Eb: [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
    E: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
    F: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
    Gb: [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
    G: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
    Ab: [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
    A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
    Bb: [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
    B: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07],
  }

  const one = {
    pull: [
      { id: '1-1', name: 'D♭', frequency: 0 },
      { id: '1-2', name: 'G', frequency: 0 },
      { id: '1-3', name: 'Bb', frequency: 0 },
      { id: '1-4', name: 'D', frequency: 0 },
      { id: '1-5', name: 'E', frequency: 0 },
      { id: '1-6', name: 'G', frequency: 0 },
      { id: '1-7', name: 'B♭', frequency: 0 },
      { id: '1-8', name: 'D', frequency: 0 },
      { id: '1-9', name: 'E', frequency: 0 },
      { id: '1-10', name: 'G', frequency: 0 },
    ],
    push: [],
  }
  const two = {
    pull: [
      { id: '2-1', name: 'F♯', frequency: map.Gb[4] },
      { id: '2-2', name: 'A', frequency: 0, frequency: map.A[3] },
      { id: '2-3', name: 'C', frequency: map.C[4] },
      { id: '2-4', name: 'E♭', frequency: map.Eb[4] },
      { id: '2-5', name: 'G', frequency: map.G[4] },
      { id: '2-6', name: 'A', frequency: map.A[4] },
      { id: '2-7', name: 'C', frequency: map.C[5] },
      { id: '2-8', name: 'E♭', frequency: map.Eb[5] },
      { id: '2-9', name: 'G', frequency: map.G[5] },
      { id: '2-10', name: 'A', frequency: map.A[5] },
      { id: '2-11', name: 'C', frequency: map.C[6] },
    ],
    push: [],
  }
  const three = {
    pull: [
      { id: '3-1', name: 'B', frequency: 0 },
      { id: '3-2', name: 'D', frequency: 0 },
      { id: '3-3', name: 'F', frequency: 0 },
      { id: '3-4', name: 'A♭', frequency: 0 },
      { id: '3-5', name: 'C', frequency: 0 },
      { id: '3-6', name: 'D', frequency: 0 },
      { id: '3-7', name: 'F', frequency: 0 },
      { id: '3-8', name: 'A♭', frequency: 0 },
      { id: '3-9', name: 'C', frequency: 0 },
      { id: '3-10', name: 'D', frequency: 0 },
    ],
    push: [],
  }
  const layout = { one, two, three }
  const rows = ['one', 'two', 'three']
  let currentlyPlaying = []

  function playTone(id) {
    const audioContext = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000,
    })

    const gainNode = audioContext.createGain()
    gainNode.gain.value = 0.3
    gainNode.connect(audioContext.destination)

    const oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.connect(gainNode)
    const { frequency } = two.pull.find((data) => data.id === id)

    oscillator.frequency.value = frequency
    oscillator.start()

    return { oscillator, audioContext, gainNode }
  }

  function stopTone(id) {
    const { audioData } = currentlyPlaying.find((button) => button.id === id)
    audioData.gainNode.gain.setValueAtTime(
      audioData.gainNode.gain.value,
      audioData.audioContext.currentTime
    )
    audioData.gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioData.audioContext.currentTime + 0.05
    )
    setTimeout(() => {
      audioData.oscillator.stop()
    }, 500)
  }

  function handlePressNote(id, row, direction) {
    return () => {
      const audioData = playTone(id, row, direction)
      currentlyPlaying.push({ id, audioData })
    }
  }

  function handleReleaseNote(id) {
    return () => {
      stopTone(id)
      currentlyPlaying = currentlyPlaying.filter((button) => button.id !== id)
    }
  }
</script>

<main>
  <h1>Diatonic Accordion App</h1>
  <h2>F - B♭ - E♭</h2>

  <div class="accordion-layout">
    {#each rows as row}
      <div class="row {row}">
        <h3>{row}</h3>
        {#each layout[row].pull as button}
          <div
            class="circle"
            on:mousedown={handlePressNote(button.id, row, 'pull')}
            on:mouseup={handleReleaseNote(button.id, row, 'pull')}
          >
            {button.name}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
  }

  h3 {
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .accordion-layout {
    display: flex;
  }

  .row.one,
  .row.three {
    margin-top: 35px;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    margin-bottom: 10px;
    background-image: linear-gradient(to top, #f7f7f7, #e7e7e7);
    box-shadow: 0px 3px 7px #aaa, inset 0px 2px 3px #fff;
    color: #444;
    font-weight: 600;
  }

  .circle:hover {
    background-image: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
    box-shadow: 0px 3px 3px #999, inset 0px 2px 3px #fff;
    cursor: pointer;
  }

  .circle:active {
    background-image: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
    box-shadow: 0px 1px 1px #666, inset 0px 2px 3px #fff;
    cursor: pointer;
  }
</style>
