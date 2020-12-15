class SudokuSolver {

  validate(puzzleString) {
    let proper81chars = puzzleString.match(/^[\d.]{81}$/)
    if (proper81chars) {
      return true;
    };
    return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let existingCol = parseInt(column) - 1;
    switch (row.toUpperCase()) {
      case ("A"):
        for (let i = 0; i < 9; i++) {
          if (i === existingCol) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("B"):
        for (let i = 9; i < 18; i++) {
          if (i === existingCol + 9) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("C"):
        for (let i = 18; i < 27; i++) {
          if (i === existingCol + 18) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("D"):
        for (let i = 27; i < 36; i++) {
          if (i === existingCol + 27) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("E"):
        for (let i = 36; i < 45; i++) {
          if (i === existingCol + 36) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("F"):
        for (let i = 45; i < 54; i++) {
          if (i === existingCol + 45) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("G"):
        for (let i = 54; i < 63; i++) {
          if (i === existingCol + 54) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("H"):
        for (let i = 63; i < 72; i++) {
          if (i === existingCol + 63) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case ("I"):
        for (let i = 72; i < 81; i++) {
          if (i === existingCol + 72) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      default:
        break;      
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let existingRow;
    if (row === "A") existingRow = 0;
    else if (row === "B") existingRow = 9;
    else if (row === "C") existingRow = 18;
    else if (row === "D") existingRow = 27;
    else if (row === "E") existingRow = 36;
    else if (row === "F") existingRow = 45;
    else if (row === "G") existingRow = 54;
    else if (row === "H") existingRow = 63;
    else if (row === "I") existingRow = 72;
    switch (column) {
      case "1":
        for (let i = 0; i < 81; i += 9) {
          if (i === existingRow) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "2":
        for (let i = 1; i < 81; i += 9) {
          if (i === existingRow + 1) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "3":
        for (let i = 2; i < 81; i += 9) {
          if (i === existingRow + 2) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "4":
        for (let i = 3; i < 81; i += 9) {
          if (i === existingRow + 3) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "5":
        for (let i = 4; i < 81; i += 9) {
          if (i === existingRow + 4) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "6":
        for (let i = 5; i < 81; i += 9) {
          if (i === existingRow + 5) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "7":
        for (let i = 6; i < 81; i += 9) {
          if (i === existingRow + 6) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "8":
        for (let i = 7; i < 81; i += 9) {
          if (i === existingRow + 7) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      case "9":
        for (let i = 8; i < 81; i += 9) {
          if (i === existingRow + 8) continue;
          if (puzzleString[i] === value) {
            return false;
          }
        }
        break;
      default:
        break;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    row = row.toUpperCase();
    let currRow, currCol;
    // Region 1
    if ((row === "A" || row === "B" || row === "C") && (column === "1" || column === "2" || column === "3")) {
      let inc = 0;
      for (let i = 0; i < 3; i++) { // row
        if (i === 0) currRow = "A";
        else if (i === 1) currRow = "B";
        else if (i === 2) currRow = "C";
        for (let j = 0; j < 3; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 2
    if ((row === "A" || row === "B" || row === "C") && (column === "4" || column === "5" || column === "6")) {
      let inc = 0;
      for (let i = 0; i < 3; i++) { // row
        if (i === 0) currRow = "A";
        else if (i === 1) currRow = "B";
        else if (i === 2) currRow = "C";
        for (let j = 3; j < 6; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 3
    if ((row === "A" || row === "B" || row === "C") && (column === "7" || column === "8" || column === "9")) {
      let inc = 0;
      for (let i = 0; i < 3; i++) { // row
        if (i === 0) currRow = "A";
        else if (i === 1) currRow = "B";
        else if (i === 2) currRow = "C";
        for (let j = 6; j < 9; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 4
    if ((row === "D" || row === "E" || row === "F") && (column === "1" || column === "2" || column === "3")) {
      let inc = 0;
      for (let i = 3; i < 6; i++) { // row
        if (i === 3) currRow = "D";
        else if (i === 4) currRow = "E";
        else if (i === 5) currRow = "F";
        for (let j = 0; j < 3; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 5
    if ((row === "D" || row === "E" || row === "F") && (column === "4" || column === "5" || column === "6")) {
      let inc = 0;
      for (let i = 3; i < 6; i++) { // row
        if (i === 3) currRow = "D";
        else if (i === 4) currRow = "E";
        else if (i === 5) currRow = "F";
        for (let j = 3; j < 6; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 6
    if ((row === "D" || row === "E" || row === "F") && (column === "7" || column === "8" || column === "9")) {
      let inc = 0;
      for (let i = 3; i < 6; i++) { // row
        if (i === 3) currRow = "D";
        else if (i === 4) currRow = "E";
        else if (i === 5) currRow = "F";
        for (let j = 6; j < 9; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 7
    if ((row === "G" || row === "H" || row === "I") && (column === "1" || column === "2" || column === "3")) {
      let inc = 0;
      for (let i = 6; i < 9; i++) { // row
        if (i === 6) currRow = "G";
        else if (i === 7) currRow = "H";
        else if (i === 8) currRow = "I";
        for (let j = 0; j < 3; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 8
    if ((row === "G" || row === "H" || row === "I") && (column === "4" || column === "5" || column === "6")) {
      let inc = 0;
      for (let i = 6; i < 9; i++) { // row
        if (i === 6) currRow = "G";
        else if (i === 7) currRow = "H";
        else if (i === 8) currRow = "I";
        for (let j = 3; j < 6; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    // Region 9
    if ((row === "G" || row === "H" || row === "I") && (column === "7" || column === "8" || column === "9")) {
      let inc = 0;
      for (let i = 6; i < 9; i++) { // row
        if (i === 6) currRow = "G";
        else if (i === 7) currRow = "H";
        else if (i === 8) currRow = "I";
        for (let j = 6; j < 9; j++) { // column
          currCol = (j+1).toString();
          if (row + column === currRow + currCol) continue;
          inc = (i * 9) + j;
          if (puzzleString[inc] === value) {
            return false;
          }
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    let validExample = false;
    let i;
    let puzzleComplete = false;
    // console.log('pressed');
    // Convert puzzleString to nested array for easier navigation
    let puzzleStringArr = [];
    let puzStrPos = 0;
    let rowArr;
    for (let i = 0; i < 9; i++) {
      rowArr = [];
      for (let j = 0; j < 9; j++) {
        rowArr.push(puzzleString[puzStrPos]);
        puzStrPos++;
      }
      puzzleStringArr.push(rowArr);
    }
    
    let puzInc = 0;

    // check if the initial state of the puzzle is valid 
    let rowLetterArr = ['A','B','C','D','E','F','G','H','I'];
    
    for (let i = 1; i < 10; i++) {
      for (let j = 0; j < rowLetterArr.length; j++) {
        if (puzzleStringArr[j][i-1] === '.') continue;
        // console.log(puzzleStringArr[i-1][j], this.checkRowPlacement(puzzleStringArr, rowLetterArr[j], i.toString(), puzzleStringArr[i-1][j]));
        let rowCheck = this.checkRowPlacement(puzzleString, rowLetterArr[j], i.toString(), puzzleStringArr[j][i-1]);
        let colCheck = this.checkColPlacement(puzzleString, rowLetterArr[j], i.toString(), puzzleStringArr[j][i-1]);
        let regCheck = this.checkRegionPlacement(puzzleString, rowLetterArr[j], i.toString(), puzzleStringArr[j][i-1]);
        if (!(rowCheck && colCheck && regCheck)) {
          return "error";
        }
      }
    }

    while (!puzzleComplete) {
      if (puzInc === 81) {
        let updatedPuzzleString = '';
        for (let i = 0; i < 9; i++) {
          for(let j = 0; j < 9; j++) {
            updatedPuzzleString += puzzleStringArr[i][j];
          }
        }

        if (puzzleString === updatedPuzzleString) {
          return "error";
        } else if (/\./.test(updatedPuzzleString)) {
          puzInc = 0;
          puzzleString = updatedPuzzleString;
          continue;
        } else {
          return updatedPuzzleString;
        }
      }

      let currRow = Math.floor(puzInc/9);
      let currCol = puzInc%9;
            
      if (puzzleStringArr[currRow][currCol] !== '.') {
        puzInc++;
        continue;
      }

      // Convert column number to column coordinate letter
      let rowLetter;
      switch (currRow) {
        case 0:
          rowLetter = 'A';
          break;
        case 1:
          rowLetter = 'B';
          break;
        case 2:
          rowLetter = 'C';
          break;
        case 3:
          rowLetter = 'D';
          break;
        case 4:
          rowLetter = 'E';
          break;
        case 5:
          rowLetter = 'F';
          break;
        case 6:
          rowLetter = 'G';
          break;
        case 7:
          rowLetter = 'H';
          break;
        case 8:
          rowLetter = 'I';
          break;
        default:
          break;
      }
      let possibleEntries = [];
      for (let i = 1; i < 10; i++) {
        let valueToPlace = i.toString();
        if (this.checkRowPlacement(puzzleString, rowLetter, (currCol + 1).toString(), valueToPlace) &&
         this.checkColPlacement(puzzleString, rowLetter, (currCol + 1).toString(), valueToPlace) &&
         this.checkRegionPlacement(puzzleString, rowLetter, (currCol + 1).toString(), valueToPlace)) {
          possibleEntries.push(valueToPlace);
        }
      }
      if (possibleEntries.length === 1) {
        puzzleStringArr[currRow][currCol] = possibleEntries[0];
      }

      puzInc++;
    }
  }
}

module.exports = SudokuSolver;

