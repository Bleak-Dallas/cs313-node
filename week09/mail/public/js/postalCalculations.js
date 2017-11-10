'use strict';
var ERROR = {"message": "The request failed!"};

/*************************************************************
* Orchestrates the Calculation and Translation of data base on
* information given by the user.
*************************************************************/
function run(type, weight, callback) {
   var data = {
      cost: getCost(type, weight),
      type: interpretType(type),
      weight: weight
   };

   if (callback) callback(null, data);
    if (data.type == "Parcel") {
      console.log("CALC: "+ data.type +" at " + weight + " lbs = $" + data.cost);
    }
    else {
      console.log("CALC: "+ data.type +" at " + weight + " oz = $" + data.cost);
    }

   return data;
}

/*************************************************************
* Create dropdown menus based on letter type or parcel
*************************************************************/
function selectOptions(s1,s2) {

  var mailType = document.getElementById(s1);
  var mailWeight = document.getElementById(s2);
  var weightArray;
  mailWeight.innerHTML = "";

  if (mailType.value == "s") {
      weightArray = ["Weight Not Over (oz.)",1,2,3,3.5];
  }
  else if (mailType.value == "m") {
      weightArray = ["Weight Not Over (oz.)",1,2,3,3.5];
  }
  else if (mailType.value == "f") {
      weightArray = ["Weight Not Over (oz.)",1,2,3,4,5,6,7,8,9,
                                                 10,11,12,13];
  }
  else if (mailType.value == "p") {
      weightArray = ["Weight Not Over (lbs.)",1,2,3,4,5,6,7,8,9,10,11,
                                              12,13,14,15,16,17,18,19,
                                              20,21,22,23,24,25,26];
  }
  for (var weight in weightArray) {
    var newOption = document.createElement("option");
    newOption.value = weightArray[weight];
    newOption.innerHTML = weightArray[weight];
    mailWeight.options.add(newOption);
  }
}


/*************************************************************
* Translates our package type codes to acutal words.
*************************************************************/
function interpretType(type) {
   switch (type) {
      case "s": return "Stamped Letter";
      case "m": return "Metered Letter";
      case "f": return "Large Envelope";
      case "p": return "Parcel";
      default:
         return type;
   }
}

/*************************************************************
* Calls the appropriate function to find price based on type
*************************************************************/
function getCost(type, weight) {
   switch (type) {
      case "s": return stampedMatrix(weight);
      case "m": return meteredMatrix(weight);
      case "f": return flatMatrix(weight);
      case "p": return parcelMatrix(weight);
   }
   return NaN; // error flag
}

/*************************************************************
* Returns the postage pricing for the stamped letters
*************************************************************/
function stampedMatrix(w) {
   if (w <= 1) { return 0.49; }
   if (w <= 2) { return 0.70; }
   if (w <= 3) { return 0.91; }
   if (w <= 3.5) { return 1.12; }
   return NaN; // error flag
}

/*************************************************************
* Returns the postage pricing for the metered letters
*************************************************************/
function meteredMatrix(w) {
   if (w <= 1) { return 0.46; }
   if (w <= 2) { return 0.67; }
   if (w <= 3) { return 0.88; }
   if (w <= 3.5) { return 1.09; }
   return NaN; // error flag
}

/*************************************************************
* Returns the postage pricing for the large envelopes
*************************************************************/
function flatMatrix(w) {
   if (w <= 1)  { return 0.98; }
   if (w <= 2)  { return 1.19; }
   if (w <= 3)  { return 1.40; }
   if (w <= 4)  { return 1.61; }
   if (w <= 5)  { return 1.82; }
   if (w <= 6)  { return 2.03; }
   if (w <= 7)  { return 2.24; }
   if (w <= 8)  { return 2.45; }
   if (w <= 9)  { return 2.66; }
   if (w <= 10) { return 2.87; }
   if (w <= 11) { return 3.08; }
   if (w <= 12) { return 3.29; }
   if (w <= 13) { return 3.50; }
   return NaN; // error flag
}

/*************************************************************
* Returns the postage pricing for the paracels
*************************************************************/
function parcelMatrix(w) {
   if (w <= 1)   { return 6.65; }
   if (w <= 2)   { return 7.20; }
   if (w <= 3)   { return 7.80; }
   if (w <= 4)   { return 8.50; }
   if (w <= 5)   { return 9.85; }
   if (w <= 6)   { return 10.40; }
   if (w <= 7)   { return 11.05; }
   if (w <= 8)   { return 11.40; }
   if (w <= 9)   { return 11.90; }
   if (w <= 10)  { return 12.65; }
   if (w <= 11)  { return 13.50; }
   if (w <= 12)  { return 14.25; }
   if (w <= 13)  { return 15.10; }
   if (w <= 14)  { return 16.00; }
   if (w <= 15)  { return 16.70; }
   if (w <= 16)  { return 17.20; }
   if (w <= 17)  { return 17.95; }
   if (w <= 18)  { return 18.30; }
   if (w <= 19)  { return 18.80; }
   if (w <= 20)  { return 19.60; }
   if (w <= 21)  { return 20.25; }
   if (w <= 22)  { return 20.75; }
   if (w <= 23)  { return 21.20; }
   if (w <= 24)  { return 21.70; }
   if (w <= 25)  { return 22.55; }
   if (w <= 26)  { return 23.50; }
   return NaN; // error flag
}

/*************************************************************
* Prepare for importing into Node.js
*************************************************************/
module.exports = {
   run: run
};
