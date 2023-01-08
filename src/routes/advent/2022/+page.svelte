<script>
  // @ts-nocheck
  import { onMount } from 'svelte'
  import { base } from '$app/paths'

  export const ssr = false

  import { store } from './store'

  let saveDay = null

  onMount(async () => {
    let savedDay = window?.localStorage ? window.localStorage.getItem('savedDay-2022') : null

    saveDay = (day) => {
      if (window.localStorage) window.localStorage.setItem('savedDay-2022', day.description)
    }

    if (days?.length) {
      let last = days.find(day => day.description === savedDay)
      if (last) {
        selectDay(last)
      } else {
        selectDay(days[days.length - 1])
      }
    }
  })

  let inputText = ""
  let outputText = ""
  let messageText = ""

  let days = $store.days
  let selectedDay = null

  const selectDay = day => {
    messageText = ""
    inputText = ""
    outputText = ""
    selectedDay = day
    if (saveDay) saveDay(day)
    
    let sample = day.inputs.find(x => x.description === 'sample')
    if (sample) {
      selectInput(sample.data)
    }
  }

  const selectInput = text => {
    inputText = text
    messageText = ""
  }

  const runSolver = fn => {
    messageText = ""
    let start = window.performance.now()
    try {
      const result = fn(inputText.replaceAll(/\r/g, ''))
      const ms = window.performance.now() - start
      if (typeof(result) === 'string' || typeof(result) === 'number') {
        outputText = `${result}`
      } else {
        outputText = JSON.stringify(result, null, 2)
      }
      messageText = `solved in ${ms.toFixed(1)} ms`
    } catch (e) {
      const ms = window.performance.now() - start
      messageText = `error in ${ms.toFixed(1)} ms: ${e}`
      throw e
    }
  }

  // doesn't work due to CORS
  // const fetchInput = async url => inputText = await fetch(url).then(x => x.text())

</script>

<svelte:head>
	<title>Advent of code - 2022</title>
	<meta name="description" content="Advent of Code - 2022" />
</svelte:head>

<section>
	<h1>
		<a href="https://adventofcode.com/2022">Advent of Code - 2022</a>
	</h1>

  <ul>
    {#each days as day}
      <li on:click={ () => selectDay(day)} on:keyup={ () => selectDay(day)} class="{ day === selectedDay ? 'active' : '' }">{ day.description }</li>
    {/each}
  </ul>
</section>

{#if selectedDay}
<section>
  <h2>
    {#if selectedDay.pageUrl}
      <a href={ base + selectedDay.pageUrl }>{ selectedDay.description }</a>
    {:else}
      { selectedDay.description }
    {/if}
  </h2>
</section>

<section class="two-column">
  <div class="left-column">
    <h3>Inputs</h3>
    {#if selectedDay.inputUrl}
      <a style="display: block; text-align: center" target="_blank" rel="noreferrer" href={selectedDay.inputUrl}>{ selectedDay.inputUrl }</a>
    {/if}
    <ul>
      {#each selectedDay.inputs as input }
        <li on:click={ () => selectInput(input.data) } on:keyup={ () => selectInput(input.data)}>{ input.description }</li>
      {/each}
    </ul>
  </div>
  <div class="right-column">
    <h3>Solvers</h3>
    <ul>
      {#each selectedDay.solvers as solver }
        <li on:click={ () => runSolver(solver.solver)} on:keyup={ () => runSolver(solver.solver)}>{ solver.description }</li>
      {/each}
    </ul>
  </div>
</section>

<section class="two-column">
  <div class="left-column">
    <textarea bind:value={ inputText }/>
  </div>
  <div class="right-column">
    <textarea style="height: 200px" bind:value={ outputText }/>
    {#if messageText.length > 0}
    <p>{messageText}</p>
    {/if}
  </div>
</section>
{/if}

<style>
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  li {
    list-style-type: none;
    padding: 10px 15px;
    border-radius: 5px;
    margin-right: 10px;
  }

  li:hover { cursor: pointer; background-color: #ccF; }

  li.active { background-color: blue; color: white; }

  li.active:hover { background-color: blue; /* cursor: not-allowed; */ }

  section.two-column {
    display: flex;
    align-items: flex-start;
    justify-content: stretch;

  }

  div.left-column {
    flex-basis: 100%;
    flex: 1;
    /* background-color: green; */
    padding-left: 10px;
    padding-right: 15px;
  }

  div.right-column {
    flex-basis: 100%;
    flex: 1;
    /* background-color: purple; */
    padding-left: 10px;
    padding-right: 15px;
  }

  textarea {
    width: 100%;
    height: 600px;
  }

  ul {
    display: flex;
  }

  h3 { text-align: center; }
</style>
