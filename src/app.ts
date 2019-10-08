function isInputElement(x: any): x is HTMLInputElement {
  return "value" in x;
}

const baseUrl = `http://${window.location.hostname}:${window.location.port}`;
const devourButtons = document.querySelectorAll(".devour-button");

const devour = async function(this: HTMLElement) {
  const id = this.getAttribute("data-id");
  const url = `${baseUrl}/api/burgers/?id=${id}`;
  await fetch(url, {
    method: "PUT"
  });
  if (this.parentElement !== null) {
    this.parentElement.setAttribute("data-devoured", "1");
  }
  location.reload(true);
};

const addNew = async function() {
  let inputBox = document.getElementById("burger-text");
  if (isInputElement(inputBox)) {
    const text = inputBox.value;
    const url = `${baseUrl}/api/burgers/new`;
    await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ burger: text })
    });
    location.reload(true);
  } else {
    return;
  }
};

const clear = async function() {
  const allDevoured = document.querySelectorAll("div[data-devoured='1']");
  Array.from(allDevoured).forEach(el => el.classList.add("hide"));
};

Array.from(devourButtons).forEach(element => {
  element.addEventListener("click", devour);
});

document.getElementById("add-burger")!.addEventListener("click", addNew);
document.getElementById("clear")!.addEventListener("click", clear);
