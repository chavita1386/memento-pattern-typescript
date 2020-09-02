export interface Memento {
  getContent(): string;
  getStyles(): Array<string>;
}

export default class EditorMemento implements Memento {
  private readonly _content: string;
  private readonly _styles: Array<string>;

  constructor(content: string, styles: Array<string>) {
    this._content = content;
    this._styles = styles;
  }

  getContent(): string {
    return this._content;
  }

  getStyles(): Array<string> {
    return this._styles;
  }
}
