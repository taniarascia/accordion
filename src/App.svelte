<script>
  // State
  let direction = 'pull'
  const rowMap = { 1: 'one', 2: 'two', 3: 'three' }
  const rows = Object.values(rowMap)
  const keyMap = {
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
    a: { row: 2, column: 1 },
    s: { row: 2, column: 2 },
    d: { row: 2, column: 3 },
    f: { row: 2, column: 4 },
    g: { row: 2, column: 5 },
    h: { row: 2, column: 6 },
    j: { row: 2, column: 7 },
    k: { row: 2, column: 8 },
    l: { row: 2, column: 9 },
    ';': { row: 2, column: 10 },
    w: { row: 3, column: 1 },
    e: { row: 3, column: 2 },
    r: { row: 3, column: 3 },
    t: { row: 3, column: 4 },
    y: { row: 3, column: 5 },
    u: { row: 3, column: 6 },
    i: { row: 3, column: 7 },
    o: { row: 3, column: 8 },
    p: { row: 3, column: 9 },
    '[': { row: 3, column: 10 },
  }
  const audio = new AudioContext()
  const gainNode = audio.createGain()
  gainNode.gain.value = 0.3
  gainNode.connect(audio.destination)

  // F - B♭ - E♭
  const tone = {
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
  const one = [
    // Pull
    { id: '1-1-pull', name: 'D♭', frequency: tone.Db[4] },
    { id: '1-2-pull', name: 'G', frequency: tone.G[3] },
    { id: '1-3-pull', name: 'B♭', frequency: tone.Bb[3] },
    { id: '1-4-pull', name: 'D', frequency: tone.D[4] },
    { id: '1-5-pull', name: 'E', frequency: tone.E[4] },
    { id: '1-6-pull', name: 'G', frequency: tone.G[4] },
    { id: '1-7-pull', name: 'B♭', frequency: tone.Bb[4] },
    { id: '1-8-pull', name: 'D', frequency: tone.D[5] },
    { id: '1-9-pull', name: 'E', frequency: tone.E[5] },
    { id: '1-10-pull', name: 'G', frequency: tone.G[5] },
    // Push
    { id: '1-1-push', name: 'B', frequency: tone.B[3] },
    { id: '1-2-push', name: 'F', frequency: tone.F[3] },
    { id: '1-3-push', name: 'A', frequency: tone.A[3] },
    { id: '1-4-push', name: 'C', frequency: tone.C[4] },
    { id: '1-5-push', name: 'F', frequency: tone.F[4] },
    { id: '1-6-push', name: 'A', frequency: tone.A[4] },
    { id: '1-7-push', name: 'C', frequency: tone.C[5] },
    { id: '1-8-push', name: 'F', frequency: tone.F[5] },
    { id: '1-9-push', name: 'A', frequency: tone.A[5] },
    { id: '1-10-push', name: 'C', frequency: tone.C[6] },
  ]
  const two = [
    // Pull
    { id: '2-1-pull', name: 'G♭', frequency: tone.Gb[4] },
    { id: '2-2-pull', name: 'A', frequency: tone.A[3] },
    { id: '2-3-pull', name: 'C', frequency: tone.C[4] },
    { id: '2-4-pull', name: 'E♭', frequency: tone.Eb[4] },
    { id: '2-5-pull', name: 'G', frequency: tone.G[4] },
    { id: '2-6-pull', name: 'A', frequency: tone.A[4] },
    { id: '2-7-pull', name: 'C', frequency: tone.C[5] },
    { id: '2-8-pull', name: 'E♭', frequency: tone.Eb[5] },
    { id: '2-9-pull', name: 'G', frequency: tone.G[5] },
    { id: '2-10-pull', name: 'A', frequency: tone.A[5] },
    { id: '2-11-pull', name: 'C', frequency: tone.C[6] },
    // Push
    { id: '2-1-push', name: 'E', frequency: tone.E[4] },
    { id: '2-2-push', name: 'F', frequency: tone.F[3] },
    { id: '2-3-push', name: 'B♭', frequency: tone.Bb[3] },
    { id: '2-4-push', name: 'D', frequency: tone.D[4] },
    { id: '2-5-push', name: 'F', frequency: tone.F[4] },
    { id: '2-6-push', name: 'B♭', frequency: tone.Bb[4] },
    { id: '2-7-push', name: 'D', frequency: tone.D[5] },
    { id: '2-8-push', name: 'F', frequency: tone.F[5] },
    { id: '2-9-push', name: 'B♭', frequency: tone.Bb[5] },
    { id: '2-10-push', name: 'D', frequency: tone.D[6] },
    { id: '2-11-push', name: 'F', frequency: tone.F[6] },
  ]
  const three = [
    // Pull
    { id: '3-1-pull', name: 'B', frequency: tone.B[4] },
    { id: '3-2-pull', name: 'D', frequency: tone.D[4] },
    { id: '3-3-pull', name: 'F', frequency: tone.F[4] },
    { id: '3-4-pull', name: 'A♭', frequency: tone.Ab[4] },
    { id: '3-5-pull', name: 'C', frequency: tone.C[5] },
    { id: '3-6-pull', name: 'D', frequency: tone.D[5] },
    { id: '3-7-pull', name: 'F', frequency: tone.F[5] },
    { id: '3-8-pull', name: 'A♭', frequency: tone.Ab[5] },
    { id: '3-9-pull', name: 'C', frequency: tone.C[6] },
    { id: '3-10-pull', name: 'D', frequency: tone.D[6] },
    // Push
    { id: '3-1-push', name: 'D♭', frequency: tone.Db[4] },
    { id: '3-2-push', name: 'B♭', frequency: tone.Bb[3] },
    { id: '3-3-push', name: 'E♭', frequency: tone.Eb[4] },
    { id: '3-4-push', name: 'G', frequency: tone.G[4] },
    { id: '3-5-push', name: 'B♭', frequency: tone.Bb[4] },
    { id: '3-6-push', name: 'E♭', frequency: tone.Eb[5] },
    { id: '3-7-push', name: 'G', frequency: tone.G[5] },
    { id: '3-8-push', name: 'B♭', frequency: tone.Bb[5] },
    { id: '3-9-push', name: 'E♭', frequency: tone.Eb[6] },
    { id: '3-10-push', name: 'G', frequency: tone.G[6] },
  ]
  const layout = { one, two, three }
  const buttonIdMap = [...one, ...two, ...three].reduce((acc, value) => {
    return { ...acc, [value.id]: value }
  }, {})
  let activeButtonIdMap = {}

  function playTone(id) {
    const { frequency } = buttonIdMap[id]
    const oscillator = audio.createOscillator()
    oscillator.type = 'square'
    oscillator.connect(gainNode)
    oscillator.frequency.value = frequency
    oscillator.start()

    return { oscillator }
  }

  function stopTone(id) {
    const { oscillator } = activeButtonIdMap[id]
    oscillator.stop()
  }

  // function handlePressNote(id) {
  //   return () => {
  //     const audioData = playTone(id)

  //     activeButtonIdMap[id] = { id, audioData }
  //   }
  // }

  // function handleReleaseNote(id) {
  //   return () => {
  //     stopTone(id)
  //     delete activeButtonIdMap[id]
  //   }
  // }

  function handleKeyPressNote(e) {
    if (e.key === '`') {
      return (direction = 'push')
    }

    const buttonMapData = keyMap[e.key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}-${direction}`

      if (!activeButtonIdMap[id]) {
        const { oscillator } = playTone(id)

        activeButtonIdMap[id] = { oscillator }
      }
    }
  }

  function handleKeyUpNote(e) {
    if (e.key === '`') {
      return (direction = 'pull')
    }

    const buttonMapData = keyMap[e.key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}-${direction}`
      stopTone(id)
      delete activeButtonIdMap[id]
    }
  }

  function handleChangeDirection(event) {
    direction = event.target.value
  }
</script>

<svelte:body on:keypress={handleKeyPressNote} on:keyup={handleKeyUpNote} />

<main>
  <div class="flex layout">
    <div>
      <h1>Diatonic Keyboard</h1>
      <h2>Play the diatonic button accordion with your computer keyboard!</h2>
      <div class="flex">
        <div>
          <h3>Direction</h3>
          <select bind:value={direction} on:change={handleChangeDirection}>
            <option value="pull" selected={direction === 'pull'}>Pull</option>
            <option value="push" selected={direction === 'push'}>Push</option>
          </select>
        </div>

        <div>
          <h3>Tuning</h3>
          <select>
            <option value="fbe" selected><h2>F - B♭ - E♭</h2></option>
            <option value="nope" disabled><h2>No more yet!</h2></option>
          </select>
        </div>
      </div>

      <div>
        <h2>How to play</h2>
        <ul>
          <li>Row 1 starts with <kbd>z</kbd> and ends with <kbd>,</kbd></li>
          <li>Row 2 starts with <kbd>a</kbd> and ends with <kbd>;</kbd></li>
          <li>Row 3 starts with <kbd>w</kbd> and ends with <kbd>[</kbd></li>
          <li>Press <kbd>`</kbd> to toggle between pushing and pulling the bellows</li>
        </ul>
      </div>
    </div>

    <div class="accordion-layout">
      {#each rows as row}
        <div class="row {row}">
          <h4>{row}</h4>
          {#each layout[row].filter(({ id }) => id.includes(direction)) as button}
            <div class="circle" id={button.id}>
              {button.name}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 700px;
  }

  h1 {
    font-size: 2.3rem;
    font-weight: 600;
  }

  h3 {
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    border-bottom: 1px solid #c0c0c0;
    padding-bottom: 0.5rem;
  }

  h4 {
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  .flex {
    display: flex;
    gap: 1rem;
  }

  .layout {
    justify-content: space-between;
    gap: 2rem;
  }

  .accordion-layout {
    display: flex;
    justify-content: center;
    text-align: center;
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
    background: linear-gradient(to top, #f7f7f7, #e7e7e7);
    box-shadow: 0px 3px 7px #aaa, inset 0px 2px 3px #fff;
    color: #444;
    font-weight: 600;
  }

  .circle:hover {
    background: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
    box-shadow: 0px 3px 3px #999, inset 0px 2px 3px #fff;
    cursor: pointer;
  }

  .circle:active,
  .circle.active {
    background: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
    box-shadow: 0px 1px 1px #666, inset 0px 2px 3px #fff;
    cursor: pointer;
    border-bottom: 2px solid #33ff66;
    text-shadow: 2px 2px #33ff66;
  }
</style>
