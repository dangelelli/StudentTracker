function onEditX() {
  // This script records changes to the spreadsheet on a changelog sheet.
  // The changelog sheet should include these column headers:
  // "New Value', "TimeStamp"
  // The script will require each user's authorization to run.
  
  // set variables for source document
  var sss = SpreadsheetApp.getActiveSpreadsheet();
  var sssId = sss.getId();
  var ss = sss.getActiveSheet();
  var ssName = ss.getName();
  var sheetToIgnore = 'DataChangeLog' // sheet where the changelog is stored
  
  // set variables for target document
  //var tss = SpreadsheetApp.openById('166pRMvGPsmiQPd3evWC9lNr0UGbqn7WkMSqRY7Atrqs'); // sheet id for StudentTrackerData
  //var ts = tss.getSheetByName('DataChangeLog'); // sheet where the changelog is stored
  var ts = sss.getSheetByName('DataChangeLog'); // sheet where the changelog is stored
    
  //set variables for source cells
  var cell = SpreadsheetApp.getActiveRange();
  var cellNotation = cell.getA1Notation();
  var cellRow = cell.getRow();
  var cellCol = cell.getColumn();
  var timestamp = new Date();
  
  //set lesson and student
  var cellLesson = ss.getRange(4, cellCol) // Pull the lesson name
  var cellStudent = ss.getRange(cellRow, 1) // Pull the student name/identifier
  
  // write data change from source into target sheet
  if (ssName != sheetToIgnore) {  
    ts.appendRow([
      cell.getValue(),
      timestamp, 
      ssName,
      cellLesson.getValue(),
      cellStudent.getValue(),
      cell.getColumn(),
      cell.getRow(),
      sss.getName(),
      sssId,
    ] );
  }
}
