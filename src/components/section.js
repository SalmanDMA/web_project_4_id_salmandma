export default class Section {
 constructor({ items, renderer }, containerSelector) {
  this._items = items;
  this._renderer = renderer;
  this._container = containerSelector;
 }

 renderer() {
  this._items.forEach((item) => {
   this._renderer(item);
  });
 }

 addItem(element, top) {
  if (top) {
   this._container.prepend(element);
  } else {
   this._container.append(element);
  }
 }
}
