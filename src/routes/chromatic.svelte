<script>
  import { keyMapChromatic } from '../data.js'
  import { layout, layoutB, buttonIdMap, buttonIdMapB, rows } from '../chromatic-data.js'

  // Audio
  const audio = new (window.AudioContext || window.webkitAudioContext)()
  const gainNode = audio.createGain()
  gainNode.gain.value = 0.1
  gainNode.connect(audio.destination)

  // State
  let system = 'C'
  let activeButtonIdMap = {}

  let map = buttonIdMap

  // Handlers
  function playTone(id) {
    const { frequency } = map[id]
    let oscillator

    if (Array.isArray(frequency)) {
      oscillator = frequency.map((hz) => {
        const oscillator = audio.createOscillator()
        oscillator.type = 'sawtooth'
        oscillator.connect(gainNode)
        oscillator.frequency.value = hz
        oscillator.start()

        return oscillator
      })
    } else {
      oscillator = audio.createOscillator()
      oscillator.type = 'sawtooth'
      oscillator.connect(gainNode)
      oscillator.frequency.value = frequency
      oscillator.start()
    }

    return { oscillator }
  }

  function stopTone(id) {
    const { oscillator } = activeButtonIdMap[id]

    if (Array.isArray(oscillator)) {
      oscillator.forEach((osc) => osc?.stop())
    } else {
      oscillator?.stop()
    }
  }

  function updateActiveButtonMap(id) {
    if (!activeButtonIdMap[id]) {
      const { oscillator } = playTone(id)

      activeButtonIdMap[id] = { oscillator, ...map[id] }
    }
  }

  function handleKeyPressNote(e) {
    const key = `${e.key}`.toLowerCase() || e.key
    const buttonMapData = keyMapChromatic[key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}`

      return updateActiveButtonMap(id)
    }
  }

  function handleKeyUpNote(e) {
    const key = `${e.key}`.toLowerCase() || e.key
    const buttonMapData = keyMapChromatic[key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}`

      if (activeButtonIdMap[id]) {
        stopTone(id)
        // Must be reassigned in Svelte
        const newActiveButtonIdMap = { ...activeButtonIdMap }
        delete newActiveButtonIdMap[id]
        activeButtonIdMap = newActiveButtonIdMap
      }
    }
  }

  const handleClickNote = (id) => {
    updateActiveButtonMap(id)
  }

  const handleChangeSystem = (event) => {
    system = event.target.value
    if (event.target.value === 'C') {
      map = buttonIdMap
    } else {
      map = buttonIdMapB
    }
  }

  const handleClearAllNotes = () => {
    for (const [keyId, keyValues] of Object.entries(activeButtonIdMap)) {
      // Remove existing value
      if (Array.isArray(keyValues.oscillator)) {
        keyValues.oscillator.forEach((hz) => hz?.stop())
      } else {
        keyValues.oscillator?.stop()
      }
    }
    activeButtonIdMap = {}
  }
</script>

<svelte:body
  on:keypress={handleKeyPressNote}
  on:keyup={handleKeyUpNote}
  on:mouseup={handleClearAllNotes} />

<main>
  <div class="mobile-only">
    <div class="banner">This app is only available on a desktop!</div>
  </div>

  <div class="layout">
    <div class="keyboard-side">
      <div class="desktop-only accordion-layout">
        {#each rows as row}
          <div class="row {row}">
            {#each system === 'C' ? layout[row] : layoutB[row] as button}
              <div
                class={`circle ${activeButtonIdMap[button.id] ? 'active' : ''} ${
                  button.name.includes('♭') ? 'accidental' : ''
                }`}
                id={button.id}
                on:mousedown={() => handleClickNote(button.id)}
              >
                {button.name}
              </div>
            {/each}
            <h4>{row}</h4>
          </div>
        {/each}
      </div>
    </div>

    <div class="information-side">
      <div class="information">
        <header class="header">
          <h1 class="title">Chromatic Accordion</h1>
          <div class="subtitle">
            Play the chromatic button accordion with your computer keyboard
          </div>
        </header>

        <div>
          <h3>How to use</h3>
          <ul>
            <li>Each key on the keyboard corresponds to a button on the accordion.</li>
            <li>
              The buttons begin with <kbd>z</kbd>, <kbd>a</kbd>, <kbd>w</kbd> and <kbd>3</kbd>
            </li>
          </ul>
        </div>

        <div class="flex">
          <div>
            <h3>System</h3>
            <select value={system} on:change={handleChangeSystem}>
              <option value="C">C-Griff</option>
              <option value="B">B-Griff</option>
            </select>
          </div>
        </div>

        <div class="desktop-only">
          <div class="currently-playing">
            {#each Object.entries(activeButtonIdMap) as [id, value]}
              <div class="flex col">
                <div class="circle note">{value.name}</div>
                <div><small>Row: {id.split('-')[0]}<br /> Col: {id.split('-')[1]}</small></div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
