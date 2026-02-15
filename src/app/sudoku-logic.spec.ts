import { TestBed } from '@angular/core/testing';

import { SudokuLogic } from './sudoku-logic';

describe('SudokuLogic', () => {
  let service: SudokuLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
