'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const puzzleStringsAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;

      let conflicts = [];
      
      if (!coordinate || !value || !puzzle) {
        res.json({"error": "Required field(s) missing"});
      } else if (!solver.validate(puzzle)) {
        if (puzzle.length !== 81) res.json({error: "Expected puzzle to be 81 characters long"});
        else res.json({error: "Invalid characters in puzzle"});
      } else if (!coordinate.match(/^[a-iA-I][1-9]$/)) {
        res.json({error: "Invalid coordinate"});
      } else if (!value.match(/^[1-9]$/)) {
        res.json({error: "Invalid value"});
      } else {
        let puzzleString = req.body.puzzle;
        
        if (!solver.checkRowPlacement(puzzleString, coordinate[0], coordinate[1], value)) conflicts.push("row");
        if (!solver.checkColPlacement(puzzleString, coordinate[0], coordinate[1], value)) conflicts.push("column");
        if (!solver.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], value)) conflicts.push("region");
      }
      if (conflicts.length === 0) res.json({valid: true});
      else res.json({valid: false, conflict: conflicts});
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      if (!puzzleString) res.json({error: "Required field missing"});
      if (!solver.validate(puzzleString)) {
        if (puzzleString.length !== 81) res.json({error: "Expected puzzle to be 81 characters long"});
        else res.json({error: "Invalid characters in puzzle"});
      }
      let returnedString = solver.solve(puzzleString);
      if (returnedString !== 'error') res.json({solution: returnedString})
      else res.json({error: "Puzzle cannot be solved"});
    });
};
