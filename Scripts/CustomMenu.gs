function onOpen( ){
  // This line calls the SpreadsheetApp and gets its UI   
  // Or DocumentApp or FormApp.
  var ui = SpreadsheetApp.getUi();
   
  //These lines create the menu items and 
  // tie them to functions we will write in Apps Script
  ui.createMenu('Teacher Setup')
      //.addSubMenu(ui.createMenu('Setup a new class')
      //  .addItem('Create a new class', 'CopyTemplateSheet')
      //  .addItem('TBD: Complete setup', 'getRange'))
      .addItem('Create a new class', 'copyTemplateSheet')
      .addItem('Add a new student', 'addStudent')
      .addItem('Add 10 lesson columns','add10Cols')
      .addItem('View user guide','openUserGuide')
      .addToUi();
}

function copyTemplateSheet(){
  // get new sheet name
  var ui = SpreadsheetApp.getUi();
  Logger.log('Prompt user for the new sheet name...');
  var uPrompt = ui.prompt('What is the name of the new class?', '', ui.ButtonSet.OK_CANCEL);
  // Process the user's response.
  if (uPrompt.getSelectedButton() == ui.Button.OK) {
    Logger.log('The user\'s response is %s.', uPrompt.getResponseText());
  }
  
  // get startup parameters
  Logger.log('Getting startup parameters...');
  var name = uPrompt.getResponseText();
  var workbook = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSs = workbook.getSheetByName('Template');
  var tempName = 'Copy of Template';
  var timestamp = new Date();
  
  // Befoe cloning sheet, delete any copies of Template
  Logger.log('Deleting temporary sheets...');
  var tempSs = workbook.getSheetByName(tempName);
  if (tempSs) { workbook.deleteSheet(tempSs)}; 
  SpreadsheetApp.flush(); // Utilities.sleep(2000);
  // Befoe cloning sheet, delete any copies of '0'
  var zeroSs = workbook.getSheetByName('0');
  if (zeroSs) { workbook.deleteSheet(zeroSs)}; 
  SpreadsheetApp.flush(); // Utilities.sleep(2000);
  
  // clone and rename sheet. hide/show and color tabs
  Logger.log('Renaming sheet to requested name');
  var newSs = sourceSs.copyTo(workbook);
  newSs.setName(name);             
  newSs.setTabColor(null); // Unset the color.
  newSs.showSheet();
  sourceSs.hideSheet();
  
  // Show confirmation to user
  ui.alert('New class created');
}

function addStudent() {
  // get new sheet name
  var ui = SpreadsheetApp.getUi();
  Logger.log('Prompt user for the new student name...');
  var uPrompt = ui.prompt('What is the name of the new student?', '', ui.ButtonSet.OK_CANCEL);
  // Process the user's response.
  if (uPrompt.getSelectedButton() == ui.Button.OK) {
    Logger.log('The user\'s response is %s.', uPrompt.getResponseText());
  }
  
  // get startup parameters
  Logger.log('Getting startup parameters...');
  var workbook = SpreadsheetApp.getActive();
  var sheet = workbook.getActiveSheet();
  var name = uPrompt.getResponseText();
  
  // insert new row above row 6
  Logger.log('Inserting new row...');
  workbook.getRange('6:6').activate();
  workbook.getActiveSheet().insertRowsBefore(workbook.getActiveRange().getRow(), 1);
  workbook.getActiveRange().offset(0, 0, 1, workbook.getActiveRange().getNumColumns()).activate();
  
  // copy the "now" formula to entire row. Will overwrite A6:E6 later
  Logger.log('Copying formulas from row beneath new row...');
  workbook.getRange('F6:6').activate();
  workbook.getRange('D7').copyTo(workbook.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  
  // update student name
  Logger.log('Updating student name');
  workbook.getRange('A6').activate();
  workbook.getCurrentCell().setValue(name);
  
  // copy status tracking info to new row
  Logger.log('Copying status tracking columns...');
  workbook.getRange('B6:E6').activate();
  workbook.getRange('B7:E7').copyTo(workbook.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  
  // sort range alphabetically
  Logger.log('Sorting...');
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var sortRange = sheet.getRange(5,1,lastRow-5,lastColumn); // A5:bottom right cell
  sortRange.sort(1);
  
  // Show confirmation to user
  ui.alert('New student created.');
}