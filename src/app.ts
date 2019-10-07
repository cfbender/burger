function isNotNull<T>(x: T | null): x is T {
  return typeof x !== null;
}

const devourButtons = document.querySelectorAll(".devour-button");

const devour = async function(this: HTMLElement) {
  const id = this.getAttribute("data-id");
  const url = `/api/burgers/?id=${id}`;

  const response = await fetch(url, {
    method: "PUT"
  });
};

const addNew = async function() {
  let inputBox = document.getElementById("burger-text");
  if (isNotNull(inputBox)) {
    // @ts-ignore
    const text = inputBox.value;
    const url = `/api/burgers/`;
    console.log(text);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      body: JSON.stringify({ burger: text })
    });
  } else {
    return;
  }
};

Array.from(devourButtons).forEach(element => {
  element.addEventListener("click", devour);
});

document.getElementById("add-burger")!.addEventListener("click", addNew);
