function isInputElement(x: any): x is HTMLInputElement {
  return "value" in x;
}

const devourButtons = document.querySelectorAll(".devour-button");

const devour = async function(this: HTMLElement) {
  const id = this.getAttribute("data-id");
  const url = `/api/burgers/?id=${id}`;

  const response = await fetch(url, {
    method: "PUT"
  });

  this.setAttribute("data-devoured", "true");
  location.reload(true);
};

const addNew = async function() {
  let inputBox = document.getElementById("burger-text");
  if (isInputElement(inputBox)) {
    const text = inputBox.value;
    const url = `/api/burgers/`;
    await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ burger: text })
    });
  } else {
    return;
  }
};

const clear = async function() {
  const allWithDevoured = document.querySelectorAll("data-devoured");
  const allDevoured = Array.from(allWithDevoured).filter(
    el => el.getAttribute("data-devoured") === "true"
  );
  console.log(allDevoured);
};

Array.from(devourButtons).forEach(element => {
  element.addEventListener("click", devour);
});

document.getElementById("add-burger")!.addEventListener("click", addNew);
document.getElementById("clear")!.addEventListener("click", clear);
