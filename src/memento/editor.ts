import EditorMemento, { Memento } from "./memento";

export default class Editor {
  private _content: string;
  private _styles: Array<string>;

  saveState(): Memento {
    return new EditorMemento(this._content, this._styles);
  }

  undoState(state: Memento) {
    this._content = state.getContent();
    this.styles = state.getStyles();
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get styles(): Array<string> {
    return this._styles;
  }

  set styles(styles: Array<string>) {
    this._styles = styles;
  }
}
