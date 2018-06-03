import { Component } from '@angular/core';

export class Cell {
  public data: string;
  public color: string;
  public background: string;
  public font: string;

  constructor(cell_data: string, cell_color: string, background: string, font: string) {
    this.data = cell_data;
    this.color = cell_color;
    this.background = background;
    this.font = font;
  }
}
