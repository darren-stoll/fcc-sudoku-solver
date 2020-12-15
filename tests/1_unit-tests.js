const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

const server = require('../server');
const Solver = require('../controllers/sudoku-solver.js');
const puzzleStringsAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
let solver = new Solver();

suite('UnitTests', () => {
  test('Logic handles a valid puzzle string of 81 characters', () => {
    let input = solver.validate(puzzleStringsAndSolutions[0][0]);
    assert.isTrue(input);
  }),
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    let input = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....s26f14.37.');
    assert.isFalse(input);
  }),
  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    let input = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....123414.3');
    assert.isFalse(input);
  }),
  test('Logic handles a valid row placement', () => {
    let input = solver.checkRowPlacement(puzzleStringsAndSolutions[0][0], 'A', '1', '3');
    assert.isTrue(input)
  }),
  test('Logic handles an invalid row placement', () => {
    let input = solver.checkRowPlacement(puzzleStringsAndSolutions[0][0], 'A', '1', '5');
    assert.isFalse(input);
  }),
  test('Logic handles a valid column placement', () => {
    let input = solver.checkColPlacement(puzzleStringsAndSolutions[0][0], 'A', '1', '5');
    assert.isTrue(input);
  }),
  test('Logic handles an invalid column placement', () => {
    let input = solver.checkColPlacement(puzzleStringsAndSolutions[0][0], 'A', '1', '8');
    assert.isFalse(input);
  }),
  test('Logic handles a valid region (3x3 grid) placement', () => {
    let input = solver.checkRegionPlacement(puzzleStringsAndSolutions[0][0], 'A', '1', '3');
    assert.isTrue(input);
  }),
  test('Logic handles an invalid region (3x3 grid) placement', () => {
    let input = solver.checkRegionPlacement(puzzleStringsAndSolutions[0][0], 'A', '1', '2');
    assert.isFalse(input);
  }),
  test('Valid puzzle strings pass the solver', () => {
    let input = puzzleStringsAndSolutions[0][0];
    assert.notEqual(solver.solve(input), "error")
  }),
  test('Invalid puzzle strings fail the solver', () => {
    let input = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.equal(solver.solve(input), "error")
  }),
  test('Solver returns the the expected solution for an incomplete puzzle', () => {
    let input = puzzleStringsAndSolutions[0][0];
    let solvedInput = solver.solve(input);
    assert.equal(solvedInput, puzzleStringsAndSolutions[0][1]);
  })
});
