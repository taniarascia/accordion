

<script>
  import { tone } from '../data.js'
  import { layouts, rows, bassRows, keyMapGarmon } from '../garmon-data.js'

  // Audio
  const audio = new (window.AudioContext || window.webkitAudioContext)()
  const gainNode = audio.createGain()
  gainNode.gain.value = 0.1
  gainNode.connect(audio.destination)

  // State
  let system = 'Garmon'
  let activeButtonIdMap = {}

  let layout = layouts[system].layout
  let map = layouts[system].buttonIdMap

  let key = 0

  let oscillatorType = 'sawtooth'

  // Handlers
  function playTone(id) {
    let { frequency } = map[id]
    let oscillator

    if (!Array.isArray(frequency)) {
      frequency = [frequency, frequency*2]
    }

    oscillator = frequency.map((hz) => {
      const oscillator = audio.createOscillator()
      oscillator.type = oscillatorType
      oscillator.connect(gainNode)
      oscillator.frequency.value = hz * (2**(key/12))
      oscillator.start()

      return oscillator
    })

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
    if (e.key === '/' || e.key === "'") {
      event.preventDefault();
    }
    const key = `${e.key}`.toLowerCase() || e.key
    const buttonMapData = keyMapGarmon[key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}`

      return updateActiveButtonMap(id)
    }
  }

  function handleKeyUpNote(e) {
    const key = `${e.key}`.toLowerCase() || e.key
    const buttonMapData = keyMapGarmon[key]

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
    layout = layouts[system].layout
    map = layouts[system].buttonIdMap
  }

  const handleChangeSound = (event) => {
    oscillatorType = event.target.value
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

  const transposeUp = () => {
    key += 1
  }
  const transposeDown = () => {
    key -= 1
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
      <div class="desktop-only accordion-layout garmon-layout {system}-garmon">
        {#each rows as row}
          <div class="row {row}">
            {#each layout[row] as button}
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
          </div>
        {/each}
      </div>
    </div>

    <div class="information-side">
      <div class="information">
        <header class="header">
          <h1 class="title">Garmon</h1>
          <div class="subtitle">
            Play the garmon with your computer keyboard
          </div>
        </header>

        <div>
          <h3>How to use</h3>
          <ul>
            <li>Each key on the keyboard corresponds to a button on the accordion.</li>
            <li>
              The treble side buttons begin with <kbd>z</kbd>, and <kbd>s</kbd>
            </li>
            <li>The 16 bass buttons begin with <kbd>3</kbd>, and <kbd>e</kbd></li>
            <li>Use the key buttons to change the key (the note names will not change)</li>
          </ul>
        </div>

        <div class="flex">
          <div>
            <h3>System</h3>
            <select value={system} on:change={handleChangeSystem}>
              {#each Object.keys(layouts) as item}
                <option value="{item}">{layouts[item].name}</option>
              {/each}
            </select>
          </div>
          <div>
            <h3>Key</h3>
            <div class="scale">
              <h4>{key >= 0 ? '+' : ''}{key} ({Object.keys(tone)[((key%12) + 12) % 12]})</h4> <!-- regular modulo doesn't work with negative?? -->
              <div>
                <button on:click={transposeDown}>-</button>
                <button on:click={transposeUp}>+</button>
              </div>
            </div>
          </div>
          <div>
            <h3>Sound</h3>
            <select value={oscillatorType} on:change={handleChangeSound}>
              <option value="square">Square</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="triangle">Triangle</option>
              <option value="sine">Sine</option>
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

    <div class="bass-side">
      <div class="desktop-only accordion-layout">
        {#each bassRows as row}
          <div class="row {row}">
            {#each layout[row] as button}
              <div
                class={`circle ${activeButtonIdMap[button.id] ? 'active' : ''}`}
                id={button.id}
                on:mousedown={handleClickNote(button.id)}
              >
                {button.name}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>
