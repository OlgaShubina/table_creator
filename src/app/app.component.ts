import { Component } from '@angular/core';
import { Cell } from './cell';
import { range } from 'rxjs';
import deepCopy from 'immutability-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  table_structure: any[] = [];
  cell_arr: Cell[] = [];
  current_index: number[] = [0,0];
  table_history: any[] = [];
  state_history: number = 0;
  last_index: number[] = [];

  createTable(value: any) {
    this.cell_arr = [];
    this.table_structure = [];
    for (let i = 0; i < parseInt(value); i++) {
      let arr = [];
      for (let j = 0; j < parseInt(value); j++) {
        this.cell_arr.push(new Cell("", "black", "#000000", "normal"));
        arr.push(this.cell_arr.length - 1);
      }
      this.table_structure[i] = arr;   
    }
    this.table_history.push([this.table_structure, this.cell_arr]);
  }

  getIndex(i: number, j: number) {
    this.current_index = [i, j];
  }

  changeState(state: any) {
    if (state == "prev" && this.state_history != 0) {
      this.state_history--;
    } else if (this.state_history < this.table_history.length-1) {
      this.state_history++;
    }
    this.cell_arr = this.table_history[this.state_history][1];
    this.table_structure = this.table_history[this.state_history][0];
  }

  addColumn() {
    for (let i in this.table_structure) {      
      this.cell_arr.push(new Cell("", "black", "#000000", "normal"));
      this.table_structure[i].push(this.cell_arr.length - 1);      
    }
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  deleteColumn() {
    if (this.table_structure[0].length > 1) {
      let index = (input: any, arr: any) => { for (let i in arr) { input.splice(arr[i], 1); } };
      this.last_index = [];
      if (this.last_index.length!=0) { index(this.cell_arr, this.last_index.reverse()); }      
      for (let i in this.table_structure) {
        this.last_index.push(this.table_structure[i][this.table_structure[i].length - 1]);
        this.table_structure[i].splice(this.table_structure[i].length - 1, 1);
      }       
    }
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  addRow() {
    let arr = (len: number) => {
      let arr = [];
      for (let i = 0; i < len; i++ ) {
        this.cell_arr.push(new Cell("", "black", "#000000", "normal"));
        arr.push(this.cell_arr.length - 1);
      }
      return arr;
    }
    this.table_structure.push(arr(this.table_structure[0].length));
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  deleteRow() {
    if (this.table_structure.length > 1) {
      let arr = this.table_structure.splice[this.table_structure.length - 1];
      this.table_structure.splice(this.table_structure.length - 1, 1);
      for (let i in arr) {
        this.cell_arr.splice(arr[i], 1);
      }
    }
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  onKey(event: any) {
    this.cell_arr[this.table_structure[this.current_index[0]][this.current_index[1]]].data = event.target.value;
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  changeColor(color: string) {
    let elem = document.getElementById(this.table_structure[this.current_index[0]][this.current_index[1]]);
    elem.style.color = color;
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  changeBackground(color: string) {
    let elem = document.getElementById(this.table_structure[this.current_index[0]][this.current_index[1]]);
    elem.style.background = color;
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }

  changeFont(style: string) {
    let elem = document.getElementById(this.table_structure[this.current_index[0]][this.current_index[1]]);
    elem.style.fontStyle = style;
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }
  changeBold(style: any) {
    let elem = document.getElementById(this.table_structure[this.current_index[0]][this.current_index[1]]);
    elem.style.fontWeight = style;
    this.table_history.push([this.table_structure, this.cell_arr]);
    this.state_history++;
  }
}
