export interface DragCard {
  title: String;
  element?: HTMLElement;
  color: String;
  tempParams: DragParams;
  params: DragParams;
  display: Boolean;
  content: any;
  rotate: Number;
  state: Boolean;
  cols: Number;
  rows: Number;
}

export interface DragParams {
  x?: String;
  y?: String;
  top?: String;
  left?: String;
  width?: String;
  height?: String;
}
