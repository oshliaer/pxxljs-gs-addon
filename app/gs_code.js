function onInstall(e) { onOpen(e); }
function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('Happy Birthday').addItem('run', 'run').addToUi();
}

function run() {
  var userInterface = HtmlService.createTemplateFromFile('html_app').evaluate().setTitle('Happy Birthday');
  SpreadsheetApp.getUi().showSidebar(userInterface);
}

function includeL(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function sheetDraw(pixels) {
  var as = SpreadsheetApp.getActiveSheet();
  as.clear();
  pixels.forEach(function (text) {
    var next = drawLine(text, this);
    Logger.log(next);
    this.y = next.y + 2;
  }, {
      x: 1,
      y: 1,
      sheet: as
    });
}

function shuffle(length) {
  var arr = [];
  while (arr.length < length) {
    var randomnumber = Math.ceil(Math.random() * length)
    if (arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
  }
  return arr;
}

function drawLine(pixelText, startPoint) {

  var a = shuffle(pixelText.length);
  Logger.log(a);
  var left = startPoint.x || 1;
  var top = startPoint.y || 1;
  var maxtop = top;
  var maxleft = left;
  for (var i = 0; i < a.length; i++) {
    var x = pixelText[i].x + left;
    var y = pixelText[i].y + top;

    startPoint.sheet.getRange(y, x).setBackground('green');
    startPoint.sheet.setRowHeight(y, 10);
    if (y < 16) {
      startPoint.sheet.setColumnWidth(x, 10);
    }
    maxtop = y > maxtop ? y : maxtop;
    maxleft = x > maxleft ? x : maxleft;
    if (i % 150 === 0) {
      Utilities.sleep(100);
      SpreadsheetApp.flush();
    }
  }
  SpreadsheetApp.flush();
  return {
    y: maxtop,
    x: maxleft
  }
}