<script>
  import { onMount } from "svelte";
  let id = 0;
  let burgers = [];
  let textValue = "";
  let baseUrl = `https://${window.location.hostname}:${window.location.port}`;

  const clear = () => {
    burgers = burgers.filter(b => !b.devoured);
  };

  const devour = async function(e) {
    const url = `${baseUrl}/api/burgers/?id=${e.target.attributes["data-id"].value}`;
    await fetch(url, {
      method: "PUT"
    });
    burgers = await dataRequest();
  };

  const addNew = async function() {
    const url = `${baseUrl}/api/burgers/new`;
    await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ burger: textValue })
    });
    textValue = "";
    burgers = await dataRequest();
  };

  const dataRequest = async () => {
    let data = await fetch(`${baseUrl}/api/burgers`);
    let json = await data.json();

    return json;
  };

  onMount(async () => {
    burgers = await dataRequest();
  });

  $: remaining = burgers.filter(b => !b.devoured).length;
</script>

<div class=" container">
  <div class="row">
    <h1 class="center-align grey-text text-lighten-4">Veggie Burger Bash</h1>
  </div>
  <div class="burger-container row z-depth-3 fade-in">
    <div class="burgers col s12 m6 center-align">
      <h5>Ready to eat!</h5>
      <ul class="collection">
        {#each burgers as burger (burger.id)}
          {#if !burger.devoured}
            <div
              class="burger-div"
              data-id={burger.id}
              data-devoured={burger.devoured}>
              <li class="collection-item">
                <h6>{burger.burger_name}</h6>
              </li>
              <button
                class=" btn-small devour-button"
                data-id={burger.id}
                on:click={devour}>
                Devour it
              </button>
            </div>
          {/if}
        {:else}
          <p>Enter a burger to get started!</p>
        {/each}
      </ul>
    </div>

    <div class="burgers-devoured center-align col s12 m6">
      <h5>Already eaten:</h5>
      <ul class="collection">
        {#each burgers as burger (burger.id)}
          {#if burger.devoured}
            <div class="burger-div" data-devoured={burger.devoured}>
              <li class="collection-item">{burger.burger_name}</li>
            </div>
          {/if}
        {:else}
          <p>Waiting..</p>
        {/each}
      </ul>
    </div>
  </div>
  <div class="row">
    <p class="grey-text text-lighten-4">{remaining} remaining</p>

    <input
      class="grey-text text-lighten-4"
      type="text"
      id="burger-text"
      bind:value={textValue} />
    <button class="btn-large" id="add-burger" on:click={addNew}>Add New</button>

  </div>
</div>
