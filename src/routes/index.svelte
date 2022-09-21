<script>
  import { Router, Route } from 'svelte-routing'

  import Home from './home.svelte'
  import Diatonic from './diatonic.svelte'
  import Chromatic from './chromatic.svelte'

  export let url = ''
</script>

<Router {url}>
  <div>
    <Route path="chromatic" component={Chromatic} />
    <Route path="diatonic" component={Diatonic} />
    <Route path="/" component={Home} />
  </div>
</Router>
