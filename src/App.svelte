<script>
  import { keyMap, layout, buttonIdMap, rows, toggleBellows } from './data.js'

  // Audio
  const audio = new (window.AudioContext || window.webkitAudioContext)()
  const gainNode = audio.createGain()
  gainNode.gain.value = 0.1
  gainNode.connect(audio.destination)

  // State
  let direction = 'pull'
  let activeButtonIdMap = {}

  // Handlers
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

  function handleToggleBellows(newDirection) {
    if (direction !== newDirection) {
      direction = newDirection

      const newActiveButtonIdMap = { ...activeButtonIdMap }

      // When switching the bellows
      for (const [keyId, keyValues] of Object.entries(activeButtonIdMap)) {
        // Remove existing value
        keyValues.oscillator.stop()
        // Must be reassigned in Svelte

        delete newActiveButtonIdMap[keyId]

        // Add the reverse value
        const reverseKeyId = `${keyId.split('-')[0]}-${keyId.split('-')[1]}-${newDirection}`
        const { oscillator } = playTone(reverseKeyId)

        newActiveButtonIdMap[reverseKeyId] = { oscillator, ...buttonIdMap[reverseKeyId] }
      }
      activeButtonIdMap = newActiveButtonIdMap
    }
  }

  function updateActiveButtonMap(id) {
    if (!activeButtonIdMap[id]) {
      const { oscillator } = playTone(id)

      activeButtonIdMap[id] = { oscillator, ...buttonIdMap[id] }
    }
  }

  function handleKeyPressNote(e) {
    if (e.key === toggleBellows) {
      handleToggleBellows('push')
      return
    }

    const key = `${e.key}`.toLowerCase() || e.key
    const buttonMapData = keyMap[key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}-${direction}`

      updateActiveButtonMap(id)
    }
  }

  function handleKeyUpNote(e) {
    if (e.key === toggleBellows) {
      handleToggleBellows('pull')
      return
    }

    const key = `${e.key}`.toLowerCase() || e.key
    const buttonMapData = keyMap[key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}-${direction}`

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

  const handleClearAllNotes = () => {
    for (const [keyId, keyValues] of Object.entries(activeButtonIdMap)) {
      // Remove existing value
      keyValues.oscillator.stop()
    }
    activeButtonIdMap = {}
  }
</script>

<svelte:body
  on:keypress={handleKeyPressNote}
  on:keyup={handleKeyUpNote}
  on:mouseup={handleClearAllNotes} />

<main>
  <div class="layout">
    <div class="information-side">
      <h1>Keyboard Accordion</h1>
      <h2>Play the diatonic button accordion with your computer keyboard!</h2>
      <div class="information">
        <div class="flex">
          <div>
            <h3>Tuning</h3>
            <select>
              <option value="fbe" selected><h2>FB♭E♭ (Fa)</h2></option>
              <option value="gcf" disabled><h2>GCF (Sol) Not yet</h2></option>
              <option value="gcf" disabled><h2>EAD (Mi) Not yet</h2></option>
            </select>
          </div>
        </div>

        <div>
          <h3>How to play</h3>
          <ul>
            <li>Hold down <kbd>1</kbd> to push the bellows. Default is pull.</li>
            <li>Row 1 starts with <kbd>z</kbd> and ends with <kbd>,</kbd> (comma)</li>
            <li>Row 2 starts with <kbd>a</kbd> and ends with <kbd>'</kbd> (apostrophe)</li>
            <li>Row 3 starts with <kbd>w</kbd> and ends with <kbd>[</kbd> (left bracket)</li>
          </ul>
        </div>

        <div>
          <h3>Credits</h3>
          <p>
            Made with 💾 by <a href="https://tania.dev" target="_blank">Tania</a>.<br />
            <a href="https://github.com/taniarascia/accordion" target="_blank">Open source</a>.
          </p>
        </div>
      </div>

      <div class="information">
        <div>
          <h3>Notes being played</h3>
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

    <div class="keyboard-side">
      <div class="mobile-only">
        <div class="banner">This app is only available on a desktop!</div>
      </div>
      <div class="desktop-only accordion-layout">
        {#each rows as row}
          <div class="row {row}">
            <h4>{row}</h4>
            {#each layout[row].filter(({ id }) => id.includes(direction)) as button}
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

      <div class="desktop-only" style="justify-content: flex-end">
        <h4>Bellows <code>➔</code></h4>
      </div>
    </div>
  </div>
</main>
