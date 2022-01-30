import { Board, Row } from "./types";
import { SudokuSolver } from "./SudokuSolver";
import * as data from "./sudoku_test_data";

const testBoard: Board = [
	[0, 0, 3, 5, 6, 0, 7, 0, 0],
	[0, 0, 4, 0, 0, 7, 0, 0, 0],
	[6, 8, 7, 0, 0, 2, 5, 1, 0],
	[0, 0, 0, 9, 2, 0, 1, 7, 0],
	[7, 2, 0, 8, 0, 1, 9, 4, 3],
	[0, 9, 0, 0, 7, 3, 0, 0, 2],
	[1, 0, 2, 0, 3, 4, 8, 0, 0],
	[4, 0, 9, 6, 0, 0, 0, 0, 0],
	[0, 3, 8, 0, 0, 9, 0, 0, 0]
];
const emptyBoard = testBoard.map((row: Row) => {
	return row.map((_square: number) => { // eslint-disable-line
		return 0;
	});
});

const board1 = data.RawSudoku[0];
const board2 = data.RawSudoku[1];
const board3 = data.RawSudoku[2];
const board4 = data.RawSudoku[3];
const board5 = data.RawSudoku[4];

const boards = [
	testBoard,
	board1,
	board2,
	board3,
	board4,
	board5,
	emptyBoard
];

const checkBoard = (board: Board) => {
	const sudSol = new SudokuSolver(board);
	sudSol.printBoard("Initial board:");
	const result = sudSol.solveBoard();

	if (result) {
		console.log("Solved succesfully");
		sudSol.printBoard("After solving:");

	} else {
		console.log("Unable to solve");
	}
};

const runBoards = (boards: Board[]) => {

	console.time(`Seconds taken to solve ${boards.length} boards:`);

	boards.forEach((board: Board) => {
		checkBoard(board);
	});
	console.timeLog(`Seconds taken to solve ${boards.length} boards:`);
};
runBoards(data.RawSudoku);
runBoards(boards);

