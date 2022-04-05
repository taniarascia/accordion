<script>
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth
  // F - B♭ - E♭
  const one = {
    pull: [
      { name: 'D♭', frequency: 0 },
      { name: 'G', frequency: 0 },
      { name: 'Bb', frequency: 0 },
      { name: 'D', frequency: 0 },
      { name: 'E', frequency: 0 },
      { name: 'G', frequency: 0 },
      { name: 'B♭', frequency: 0 },
      { name: 'D', frequency: 0 },
      { name: 'E', frequency: 0 },
      { name: 'G', frequency: 0 },
    ],
    push: [],
  }
  const two = {
    pull: [
      { id: '2-1', name: 'F♯', frequency: 185.0 },
      { name: 'A', frequency: 0 },
      { name: 'C', frequency: 0 },
      { name: 'E♭', frequency: 0 },
      { name: 'G', frequency: 0 },
      { name: 'A', frequency: 0 },
      { name: 'C', frequency: 0 },
      { name: 'E♭', frequency: 0 },
      { name: 'G', frequency: 0 },
      { name: 'A', frequency: 0 },
      { name: 'C', frequency: 0 },
    ],
    push: [],
  }
  const three = {
    pull: [
      { name: 'B', frequency: 0 },
      { name: 'D', frequency: 0 },
      { name: 'F', frequency: 0 },
      { name: 'A♭', frequency: 0 },
      { name: 'C', frequency: 0 },
      { name: 'D', frequency: 0 },
      { name: 'F', frequency: 0 },
      { name: 'A♭', frequency: 0 },
      { name: 'C', frequency: 0 },
      { name: 'D', frequency: 0 },
    ],
    push: [],
  }
  const layout = { one, two, three }
  const rows = ['one', 'two', 'three']
  let currentlyPlaying = []

  function playTone(id) {
    console.log('pressing...')
    console.log(currentlyPlaying)

    const audioContext = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000,
    })

    let gainNode = audioContext.createGain()
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
    console.log('releasing...')

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
