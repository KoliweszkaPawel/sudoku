import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SudokuLogic {
  readonly startingBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  playableBoard = signal(structuredClone(this.startingBoard));

  setCell(row: number, col: number, value: number): void {
    const newBoard = this.playableBoard();//.map(row => [...row]);
    newBoard[row][col] = value;
    this.playableBoard.set(newBoard);
  }

  checkField(row: number, col: number): boolean {
    const value = this.playableBoard()[row][col];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.playableBoard()[i][j] === value && j === col && i !== row) return false;
        if (this.playableBoard()[i][j] === value && j !== col && i === row) return false;
      }
    }

    for (let dir of this.findSquareDirections(row, col)) {
      if (this.playableBoard()[row + dir[0]][col + dir[1]] === value) return false;
    }
    return true;
  }

  private findSquareDirections(row: number, col: number): [number, number][] {
    const rowMod = row % 3;
    const colMod = col % 3;
    if (rowMod === 0 && colMod === 0) return [[1,1],[1,2],[2,1],[2,2]];
    if (rowMod === 0 && colMod === 1) return [[1,-1],[1,1],[2,-1],[2,1]];
    if (rowMod === 0 && colMod === 2) return [[1,-1],[1,-2],[2,-1],[2,-2]];
    if (rowMod === 1 && colMod === 0) return [[-1,1],[-1,2],[1,1],[1,2]];
    if (rowMod === 1 && colMod === 1) return [[-1,-1],[-1,1],[1,-1],[1,1]];
    if (rowMod === 1 && colMod === 2) return [[-1,-1],[-1,-2],[1,-1],[1,-2]];
    if (rowMod === 2 && colMod === 0) return [[-1,1],[-1,2],[-2,1],[-2,2]];
    if (rowMod === 2 && colMod === 1) return [[-1,-1],[-1,1],[-2,-1],[-2,1]];
    if (rowMod === 2 && colMod === 2) return [[-1,-1],[-1,-2],[-2,-1],[-2,-2]];
    return [[0,0]];
  }
}
