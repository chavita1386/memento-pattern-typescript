import { Memento } from "./memento";

export default class History {
  private items: Array<Memento> = [];

  public add(item: Memento): void {
    this.items.push(item);
  }

  public remove(): Memento {
    const lastItem = this.items[this.items.length - 1];
    this.items.pop();
    return lastItem;
  }

  public isEmpty(): boolean {
    return this.items.length <= 0;
  }

  public size(): number {
    return this.items.length - 1;
  }
}
