<script>
  import { keyMap, layout, buttonIdMap, rows, toggleBellows } from './data.js'

  // Audio
  const audio = new AudioContext()
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

  function handleKeyPressNote(e) {
    if (e.key === toggleBellows) {
      handleToggleBellows('push')
      return
    }

    const buttonMapData = keyMap[e.key]

    if (buttonMapData) {
      const { row, column } = buttonMapData
      const id = `${row}-${column}-${direction}`

      if (!activeButtonIdMap[id]) {
        const { oscillator } = playTone(id)

        activeButtonIdMap[id] = { oscillator, ...buttonIdMap[id] }
      }
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
</script>

<svelte:body on:keypress={handleKeyPressNote} on:keyup={handleKeyUpNote} />

<main>
  <div class="layout">
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
            <option value="fbe" selected><h2>F - B♭ - E♭ (Fa)</h2></option>
            <option value="gcf" disabled><h2>G - C - F (Sol) Not yet</h2></option>
          </select>
        </div>
      </div>

      <div>
        <h2>How to play</h2>
        <ul>
          <li>Press <kbd>`</kbd> to toggle pushing the bellows</li>
          <li>Row 1 starts with <kbd>z</kbd> and ends with <kbd>,</kbd></li>
          <li>Row 2 starts with <kbd>a</kbd> and ends with <kbd>;</kbd></li>
          <li>Row 3 starts with <kbd>w</kbd> and ends with <kbd>[</kbd></li>
          <li>Make sure you're not pressing any other buttons (shift, caps lock)</li>
        </ul>
      </div>
      <div>
        <h2>Currently playing</h2>
        <div class="currently-playing">
          {#each Object.entries(activeButtonIdMap) as [id, value]}
            <div class="circle note">{value.name}</div>
          {/each}
        </div>
      </div>
    </div>

    <div class="accordion-layout">
      {#each rows as row}
        <div class="row {row}">
          <h4>{row}</h4>
          {#each layout[row].filter(({ id }) => id.includes(direction)) as button}
            <div class={`circle ${activeButtonIdMap[button.id] ? 'active' : ''}`} id={button.id}>
              {button.name}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</main>
