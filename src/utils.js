// import React from "react";

function timestampConversion(timestamp) {
  var months = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  );
  var mmddyyyy = new Date(timestamp * 1000).toLocaleDateString("en-US");
  var dateList = mmddyyyy.split("/");
  var _date =
    dateList[1]?.toString() +
    " " +
    months[parseInt(dateList[0]) - 1] +
    " " +
    dateList[2];
  return _date;
}

// function dateToTimestampConversion(date) {
//   console.log("dateToTimestampConversion");
//   var yyyymmdd = date.split("-");
//   var months = new Array(
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sept",
//     "Oct",
//     "Nov",
//     "Dec"
//   );
//   var _date =
//     yyyymmdd[2].toString() +
//     "-" +
//     months[parseInt(yyyymmdd[1]) - 1] +
//     "-" +
//     yyyymmdd[0].toString();
//   return new Date(_date).getTime() / 1000;
// }

// export default { timestampConversion, dateToTimestampConversion };
export default timestampConversion;
