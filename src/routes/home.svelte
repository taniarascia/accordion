<script>
  import { Link } from 'svelte-routing'
</script>

<div class="home information">
  <header>
    <h1 class="title">Keyboard Accordion</h1>
    <div class="subtitle">Play the accordion with your computer keyboard!</div>
  </header>

  <main>
    <div class="selections">
      <Link to="diatonic" class="selection">
        <img src="assets/diatonic.jpeg" alt="Diatonic" />
        <h2>Diatonic</h2>
      </Link>
      <Link to="chromatic" class="selection">
        <img src="assets/chromatic.jpeg" alt="Chromatic" />
        <h2>Chromatic</h2>
      </Link>
    </div>
  </main>

  <footer>
    Made by <a href="https://www.taniarascia.com" target="_blank">Tania</a>.
    <a href="https://github.com/taniarascia/accordion" target="_blank">Open source</a>.
  </footer>
</div>
