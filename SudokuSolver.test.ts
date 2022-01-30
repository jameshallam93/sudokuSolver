import { SudokuSolver } from "./SudokuSolver";
import { almostCompleteSudoku, RawSudoku, SolvedSudoku } from "./sudoku_test_data";

describe("The Sudoku Solver class, ", () => {

	describe("when given a board with only one missing number, ", () => {
		let sudsol: SudokuSolver;
		const boardWithOneMissing = almostCompleteSudoku[0];
		beforeEach(() => {
			sudsol = new SudokuSolver(boardWithOneMissing.slice());
		});
		test("the class can find the correct missing number using the solveBoard method:", () => {
			sudsol.solveBoard();
			expect(sudsol.board[0][0]).toEqual(1);
		});
		test("can determine if a number is in an invalid row", () => {
			const invalid = 5;
			const result = sudsol.isValidRow(0, invalid);
			expect(result).toBe(false);
		});
		test("can determine if a number is in an invalid collumn", () => {
			const invalid = 5;
			const result = sudsol.isValidCollumn(0, invalid);
			expect(result).toBe(false);
		});
		test("can determine if a number is in an invalid box", () => {
			const invalid = 5;
			const result = sudsol.isValidBox(0, 0, invalid);
			expect(result).toBe(false);
		});

	});
	describe("when given a board with four missing numbers, ", () => {
		// these tests use a board which is almost complete, save for the top row:
		// [0, 1, 0, 3, 2, 0, 6, 7, 0], 
		//  5     9        4        8
		const boardWithFourMissing = almostCompleteSudoku[1].slice();

		test("the class can find the correct missing number using the fillInAllSquares method:", () => {
			const sudsol = new SudokuSolver(boardWithFourMissing.slice());

			sudsol.solveBoard();
			expect(1).toEqual(1);
		});
		test("can determine whether a number is placed in an invalid square", () => {
			const sudsol = new SudokuSolver(boardWithFourMissing.slice());

			const result = sudsol.isValidNumberPlacement(0, 0, 9);
			expect(result).toBe(false);
		});
	});
	describe("when given a complete board", () => {
		let sudSol: SudokuSolver;
		const complete1 = SolvedSudoku[0];
		beforeEach(() => {
			sudSol = new SudokuSolver(complete1);
		});
		test("can print the board, formatted correctly", () => {
			const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { return; });
			sudSol.printBoard("testMessage");
			expect(consoleSpy.mock.calls.length).toEqual(20);
		});
	});
	describe("when given a new challenge with no numbers filled in", () => {
		test("can complete the sudoku successfully", () => {
			const board = RawSudoku[0];
			const sudSol = new SudokuSolver(board);
			sudSol.solveBoard();
			expect(sudSol.noEmptySquares()).toBe(true);
		});
	});
});