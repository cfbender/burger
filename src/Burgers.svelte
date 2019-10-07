<script>
  let id = 0;
  let burgers = [{ id: ++id, name: "Beyond Burger", done: false }];
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

  $: remaining = burgers.filter(b => !b.done).length;

  const devour = e => {
    let currentBurger = burgers.filter(b => b.id === Number(e.target.id))[0];
    currentBurger.done = true;
    let restofBurgers = burgers.filter(b => b.id !== Number(e.target.id));
    burgers = [...restofBurgers, currentBurger];
  };
</script>

<div className="burger-new">
  <ul>
    {#each burgers as burger (burger.id)}
      {#if !burger.done}
        <li>{burger.name}</li>
        <button on:click={devour} id={burger.id}>Devour it</button>
      {/if}
    {/each}
  </ul>
</div>
<div className="burger-done">
  <ul>
    {#each burgers as burger}
      {#if burger.done}
        <li>{burger.name}</li>
      {/if}
    {/each}
  </ul>
</div>

<p>{remaining} remaining</p>

<input type="text" id="burger-text" bind:value={textValue} />
<button on:click={addNew}>Add New</button>

<button id="clear" on:click={clear}>Clear Completed</button>
