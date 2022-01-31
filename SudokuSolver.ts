import { Row, Board } from "./types";
import chalk from "chalk";

class SudokuSolver {
	board: Board;
	originalBoard: Board;
	constructor(board: Board) {
		this.originalBoard = board;
		this.board = board.slice();
	}

	printBoard(message = "") {
		const horizontalBorder = "--------------------------";
		const doubleHorizontalBorder = "==========================";

		console.log(chalk.bold(message));
		this.board.forEach((row: Row, index: number) => {
			if (index % 3 === 0) {
				console.log(chalk.green(doubleHorizontalBorder));
			}
			else (
				console.log(horizontalBorder)
			);
			let str = "";
			row.forEach((number: number, indexX: number) => {
				if (indexX % 3 === 0) {
					str = str.concat(chalk.green("|")).concat(number.toString()).concat("|");
				} else if (indexX % 3 === 2) {
					str = str.concat("|").concat(number.toString()).concat(chalk.green("| "));

				} else {
					str = str.concat("|").concat(number.toString());
				}
			});
			console.log(str);
		});
		console.log(chalk.green(doubleHorizontalBorder));
	}
	isValidRow(row: number, number: number) {
		for (let col = 0; col < 9; col++) {
			if (this.board[row][col] === number) {
				return false;
			}
		}
		return true;
	}
	isValidCollumn(col: number, number: number) {
		for (let row = 0; row < 9; row++) {
			if (this.board[row][col] === number) {
				return false;
			}
		}
		return true;
	}
	boxZerothIndex = (number: number) => number - (number % 3);
	isValidBox(row: number, col: number, number: number) {
		const rowZerothIndex = this.boxZerothIndex(row);
		const collumnZerothIndex = this.boxZerothIndex(col);
		for (let i = rowZerothIndex; i < rowZerothIndex + 3; i++) {
			for (let j = collumnZerothIndex; j < collumnZerothIndex + 3; j++) {
				if (this.board[i][j] === number) {
					return false;
				}
			}
		}
		return true;
	}
	isValidNumberPlacement(row: number, col: number, number: number) {
		return (this.isValidRow(row, number)
			&& this.isValidCollumn(col, number)
			&& this.isValidBox(row, col, number));
	}
	updateBoard(row: number, col: number, num: number) {
		this.board[row][col] = num;
	}
	noEmptySquares() {
		let emptySquares = 0;
		this.board.forEach((row: Row) => {
			row.forEach((square: number) => {
				if (square === 0) {
					emptySquares += 1;
				}
			});
		});
		return (emptySquares === 0);
	}

	solveBoard() {
		if (this.noEmptySquares()) {
			return true;
		}
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				const square = this.board[row][col];
				if (square === 0) {
					for (let possible = 1; possible < 10; possible++) {
						if (this.isValidNumberPlacement(row, col, possible)) {
							this.updateBoard(row, col, possible);
							if (this.solveBoard() === true) {
								return true;
							}
							else {
								this.updateBoard(row, col, 0);
							}
						}
					}
					return false;
				}

			}
		}
	}

}
export { SudokuSolver };