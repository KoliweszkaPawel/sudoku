import {Component, inject} from '@angular/core';
import {SudokuLogic} from '../sudoku-logic';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  protected sudokuLogic = inject(SudokuLogic);

  onInput(rowIndex: number, colIndex: number, event: Event): void {
    const element = event.target as HTMLInputElement;
    const value = parseInt(element.value);
    if (isNaN(value) || value < 1 || value > 9) {
      this.sudokuLogic.setCell(rowIndex, colIndex, 0);
      element.value = '';
      element.style.backgroundColor = 'white';
    } else {
      this.sudokuLogic.setCell(rowIndex, colIndex, value);
      element.style.backgroundColor = this.sudokuLogic.checkField(rowIndex, colIndex) ? 'white' : 'red';
    }
  }
}
