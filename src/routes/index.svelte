<script>
  import { Router, Route } from 'svelte-routing'

  import Home from './home.svelte'
  import Diatonic from './diatonic.svelte'
  import Chromatic from './chromatic.svelte'
  import Garmon from './garmon.svelte'

  export let url = ''
</script>

<Router {url}>
  <div>
    <Route path="chromatic"><Chromatic /></Route>
    <Route path="diatonic"><Diatonic /></Route>
    <Route path="garmon"><Garmon /></Route>
    <Route path="/"><Home /></Route>
  </div>
</Router>
