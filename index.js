'use strict';

//Load the library and specify options
const path = require('path');
const fs = require('fs');
const args = process.argv.slice(2);
const filesToReplace = args[0];
const fileExtension = args[1] || '.html';

let htmlFile = './fixture-small.html';

let contentAsArray = [], returnTransformedCSSSelectorToHTMLAttribute,
isACSSClassSelector, returnCleanCsvString;

returnTransformedCSSSelectorToHTMLAttribute = function (str) {
  return str.replace(".", " ");
};

isACSSClassSelector = function (str) {
  return str.charAt(0) === '.';
};

returnCleanCsvString = function(searchString){
  searchString = searchString.trim();
  if (isACSSClassSelector(searchString)) {
    searchString = searchString.substr(1);
  }
  return searchString;
};

let isLineNotEmptyAndDontStartWithAHash = function (oneLine) {
  return oneLine !== '' && oneLine.charAt(0) !== '#';
};

fs.readFile('upgrade-rules.txt.csv', "utf8", function (err, upgradeRules) {
  contentAsArray = upgradeRules.split("\n");
  //console.log(contentAsArray)
  //console.log(typeof contentAsArray)

  fs.readFile(htmlFile, 'utf8', function (err,htmlContent) {
    if (err) {
      return console.log(err);
    }

    let regExForHtmlClassAttribute = /(\s+class=['"]{1})(.[^'"]*)(['"]{1}>)/g,
    result;

    while (result = regExForHtmlClassAttribute.exec(htmlContent)) {
      let htmlClassAttributesString = result[2],
      htmlClassAttributes = htmlClassAttributesString.split(' ');

      for (var oneLine of contentAsArray) {
        if (isLineNotEmptyAndDontStartWithAHash(oneLine)) {

          let csvColumns = oneLine.split(';'),
          searchString = returnCleanCsvString(csvColumns[0]),
          replaceString = returnCleanCsvString(csvColumns[1]);

          replaceString = returnTransformedCSSSelectorToHTMLAttribute(replaceString);

          let itemIndexToReplace = htmlClassAttributes.indexOf(searchString);
          if(itemIndexToReplace !== -1) {
            htmlClassAttributes[itemIndexToReplace] = replaceString;
          }
        }
      }
      //console.log(htmlClassAttributes);
      let htmlClassAttributesNew = htmlClassAttributes.join(' ');
      if(htmlClassAttributesString !== htmlClassAttributesNew){
        htmlContent = htmlContent.replace(htmlClassAttributesString, htmlClassAttributesNew);
        htmlContent = htmlContent.replace('label-default', '');
        console.log(htmlClassAttributesString + ' > ' + htmlClassAttributesNew);
      }
    }
    fs.writeFile(htmlFile, htmlContent, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
});
