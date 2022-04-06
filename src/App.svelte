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

    const buttonMapData = keyMap[e.key]

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

    const buttonMapData = keyMap[e.key]

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

  function handleChangeDirection(event) {
    direction = event.target.value
  }

  const handleClickNote = (id) => {
    updateActiveButtonMap(id)
  }

  const handleClearAllNotes = (id) => {
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
    <div>
      <div class="accordion-layout">
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
      <div>
        <h4 style="text-align: right">Bellows <code>→</code></h4>
      </div>
    </div>

    <div class="information">
      <h1>Diatonic Keyboard App</h1>
      <h2>Play the diatonic button accordion with your computer keyboard!</h2>
      <p>
        Made with 🪗 and 💾 by <a href="https://tania.dev" target="_blank">Tania</a>.<br />
        <a href="https://github.com/taniarascia/accordion" target="_blank">Open source</a>.
      </p>
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
            <option value="fbe" selected><h2>FB♭E♭ (Fa)</h2></option>
            <option value="gcf" disabled><h2>GCF (Sol) Not yet</h2></option>
            <option value="gcf" disabled><h2>EAD (Mi) Not yet</h2></option>
          </select>
        </div>

        <div>
          <h3>Something broke?</h3>
          <button on:click={handleClearAllNotes}>Reset</button>
        </div>
      </div>

      <div>
        <h2>How to play</h2>
        <ul>
          <li>Press <kbd>`</kbd> to toggle pushing the bellows</li>
          <li>Row 1 starts with <kbd>z</kbd> and ends with <kbd>,</kbd> (comma)</li>
          <li>Row 2 starts with <kbd>a</kbd> and ends with <kbd>'</kbd> (apostrophe)</li>
          <li>Row 3 starts with <kbd>w</kbd> and ends with <kbd>[</kbd> (left bracket)</li>
          <li>
            Make sure you're not pressing any other buttons (<kbd>shift</kbd>, <kbd>caps lock</kbd>)
          </li>
        </ul>
      </div>

      <div>
        <h2>Notes</h2>
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
</main>
