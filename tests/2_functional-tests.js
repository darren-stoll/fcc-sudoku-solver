const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const Solver = require('../controllers/sudoku-solver.js');
const puzzleStringsAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
let solver = new Solver();

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST request to /api/solve', () => {
    test('Solve a puzzle with valid puzzle string', () => {
      let input = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: input
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.solution);
          assert.equal(res.body.solution, puzzleStringsAndSolutions[0][1]);
        })
    }),
    test('Solve a puzzle with missing puzzle string', () => {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: ''
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Required field missing");
        })
    }),
    test('Solve a puzzle with invalid characters', () => {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: 'abc..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Invalid characters in puzzle");
        })
    }),
    test('Solve a puzzle with incorrect length', () => {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        })
    }),
    test('Solve a puzzle that cannot be solved', () => {
      chai.request(server)
        .post('/api/solve')
        .send({
          puzzle: '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Puzzle cannot be solved");
        })
    })
  })
  suite('POST request to /api/check', () => {
    test('Check a puzzle placement with all fields', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'A2',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          if (res.body.error) {
            assert.notEqual(res.body.error, "Required field(s) missing");
          } else {
            assert.exists(res.body.valid);
            assert.exists(res.body.conflict);
          }
        })
    }),
    test('Check a puzzle placement with single placement conflict', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'A2',
          value: '7'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.valid);
          assert.exists(res.body.conflict);
          assert.equal(res.body.conflict.length, 1);
        })
    }),
    test('Check a puzzle placement with multiple placement conflicts', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'A2',
          value: '1'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.valid);
          assert.exists(res.body.conflict);
          assert.isAbove(res.body.conflict.length, 1);
        })
    }),
    test('Check a puzzle placement with all placement conflicts', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'B1',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.valid);
          assert.exists(res.body.conflict);
          assert.equal(res.body.conflict.length, 3);
        })
    }),
    test('Check a puzzle placement with missing required fields', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'B1',
          value: ''
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Required field(s) missing")
        })
    }),
    test('Check a puzzle placement with invalid characters', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'B1',
          value: 'F'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Invalid value")
        })
    }),
    test('Check a puzzle placement with incorrect length', () => {
      let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92691';
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'B1',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
        })
    }),
    test('Check a puzzle placement with invalid placement coordinate', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'B0',
          value: '2'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Invalid coordinate");
        })
    }),
    test('Check a puzzle placement with invalid placement value', () => {
      let puzzleString = puzzleStringsAndSolutions[0][0];
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: puzzleString,
          coordinate: 'B1',
          value: '0'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.exists(res.body.error);
          assert.equal(res.body.error, "Invalid value");
        })
    })
  })
});

