<script>
  import { onMount } from "svelte";
  let id = 0;
  let burgers = [];
  const clear = () => {
    burgers = burgers.filter(b => !b.done);
  };

  let textValue = "";

  const addNew = e => {
    if (textValue === "") {
      return;
    } else {
      let newBurger = {
        id: ++id,
        name: textValue,
        done: false
      };
      burgers = [...burgers, newBurger];
      textValue = "";
    }
  };

  const devour = e => {
    let currentBurger = burgers.filter(b => b.id === Number(e.target.id))[0];
    currentBurger.done = true;
    let restofBurgers = burgers.filter(b => b.id !== Number(e.target.id));
    burgers = [...restofBurgers, currentBurger];
  };

  const dataRequest = async () => {
    let data = await fetch(
      `http://${window.location.hostname}:${window.location.port}/api/burgers`
    );
    let json = await data.json();

    return json;
  };
  onMount(async () => {
    burgers = await dataRequest();
  });
  // let promise = dataRequest();
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
              <button class=" btn-small devour-button" data-id={this.id}>
                Devour it
              </button>
            </div>
          {/if}
        {:else}
          <p>loading...</p>
        {/each}
      </ul>
    </div>

    <div class="burgers-devoured center-align col s12 m6">
      <h5>You've already eaten:</h5>
      <ul class="collection">
        {#each burgers as burger (burger.id)}
          {#if burger.devoured}
            <div class="burger-div" data-devoured={burger.devoured}>
              <li class="collection-item">{burger.burger_name}</li>
            </div>
          {/if}
        {:else}
          <p>loading...</p>
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
    <button class="btn-large" id="add-burger">Add New</button>

    <button class="btn-large" id="clear">Hide Completed</button>

  </div>
</div>
