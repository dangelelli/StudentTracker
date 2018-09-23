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
