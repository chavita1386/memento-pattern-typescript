import Editor from "./memento/editor";
import History from "./memento/history";
import "./css/tailwind/main.css";

const btnBold = document.querySelector("#btnBold") as HTMLButtonElement;
const btnItalic = document.querySelector("#btnItalic") as HTMLButtonElement;
const btnUnderline = document.querySelector(
  "#btnUnderline"
) as HTMLButtonElement;

const btnSave = document.querySelector("#btnSave") as HTMLButtonElement;
const btnUndo = document.querySelector("#btnUndo") as HTMLButtonElement;
let txtElement = document.querySelector("#txtElement") as HTMLInputElement;

let originator = new Editor();
let history = new History();

// Set initial values
originator.content = "";
originator.styles = txtElement.className.split(" ");
// Save initial values to History (initial state)
history.add(originator.saveState());

function isEqual(value: string): boolean {
  const txtElementStyles = txtElement.classList.value;
  const originatorStyles = originator.styles.join(" ");

  return txtElementStyles === originatorStyles && value === originator.content;
}

txtElement.addEventListener("keyup", e => {
  const value = (e.target as HTMLInputElement).value;
  if (isEqual(value)) {
    btnSave.disabled = true;
  } else {
    btnSave.disabled = false;
  }
});

function changeStyle(attribute: string) {
  txtElement.classList.toggle(attribute);

  if (!isEqual(txtElement.value)) {
    btnSave.disabled = false;
  } else {
    btnSave.disabled = true;
  }
}

btnBold.addEventListener("click", () => {
  const attr = btnBold.getAttribute("data-style");
  changeStyle(attr!);
});

btnItalic.addEventListener("click", () => {
  const attr = btnItalic.getAttribute("data-style");
  changeStyle(attr!);
});

btnUnderline.addEventListener("click", () => {
  const attr = btnUnderline.getAttribute("data-style");
  changeStyle(attr!);
});

btnSave.addEventListener("click", () => {
  originator.content = txtElement.value;
  originator.styles = txtElement.className.split(" ");
  history.add(originator.saveState());
  btnSave.disabled = true;
  btnUndo.disabled = false;
});

btnUndo.addEventListener("click", () => {
  if (history.isEmpty()) {
    txtElement.value = "";
    return;
  }

  if (isEqual(txtElement.value) && history.size() >= 1) {
    originator.undoState(history.remove());
  }

  if (!history.isEmpty()) originator.undoState(history.remove());

  if (history.isEmpty()) {
    btnUndo.disabled = true;
    originator.content = "";
    history.add(originator.saveState());
  }

  txtElement.value = originator.content;
  txtElement.className = originator.styles.reduce(
    (prev, current) => prev + " " + current,
    ""
  );
});
