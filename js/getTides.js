var xhttp = new XMLHttpRequest();
var self = this;
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
var day1 = new Date();
day1.setDate(day1.getDate() + 1);
var day2 = new Date();
day2.setDate(day2.getDate() + 2);
var day3 = new Date();
day3.setDate(day3.getDate() + 3);
var fDay = day3.getDate();
var fMonth = day3.getMonth() + 1;
var fYear = day3.getFullYear();

function putZero(num){
  if(num < 10){
    return'0' + num;
  }else {
    return num;
  }
}

day = putZero(day);
month = putZero(month);
fDay = putZero(fDay);
fMonth = putZero(fMonth);

function getTime(timeArray){
  var returnValue = "";
  for(x in timeArray){
    var ap = parseInt(timeArray[x].substring(0,2));
    if( ap > 12){
      ap -= 12;
      putZero(ap);
      returnValue += ap + timeArray[x].substring(2,5) + " PM, ";
    }else{
      returnValue += ap + timeArray[x].substring(2,5) + " AM, ";
    }
  }
  return returnValue.substring(0,returnValue.length -2);
}

// From shopify
function getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
    v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
 }

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var result = JSON.parse(xhttp.responseText);
       console.log(result);
       result = result['predictions'];
       var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
       var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
       var todayTidesH = new Array();
       var day1TidesH = new Array();
       var day2TidesH = new Array();
       var day3TidesH = new Array();
       var todayTidesL = new Array();
       var day1TidesL = new Array();
       var day2TidesL = new Array();
       var day3TidesL = new Array()
       for(x in result){
         if(result[x]['type'] == 'H'){
           if(result[x]['t'].substring(8,10) == day){
             todayTidesH.push(result[x]['t'].substr(11,15));
           }else if (result[x]['t'].substring(8,10) == day1.getDate()) {
             day1TidesH.push(result[x]['t'].substr(11,15));
           }
           else if (result[x]['t'].substring(8,10) == day2.getDate()) {
             day2TidesH.push(result[x]['t'].substr(11,15));
           }
           else if (result[x]['t'].substring(8,10) == day3.getDate()) {
             day3TidesH.push(result[x]['t'].substr(11,15));
           }
         }
         if(result[x]['type'] == 'L'){
           if(result[x]['t'].substring(8,10) == day){
             todayTidesL.push(result[x]['t'].substr(11,15));
           }else if (result[x]['t'].substring(8,10) == day1.getDate()) {
             day1TidesL.push(result[x]['t'].substr(11,15));
           }
           else if (result[x]['t'].substring(8,10) == day2.getDate()) {
             day2TidesL.push(result[x]['t'].substr(11,15));
           }
           else if (result[x]['t'].substring(8,10) == day3.getDate()) {
             day3TidesL.push(result[x]['t'].substr(11,15));
           }
         }
       }
       //High tides
      document.getElementById("h-today").innerHTML = getTime(todayTidesH);
      document.getElementById("h-tomorrow").innerHTML = getTime(day1TidesH);
      document.getElementById("h-day2").innerHTML =  getTime(day2TidesH);
      document.getElementById("h-day3").innerHTML =  getTime(day3TidesH);
      // Low tides
      document.getElementById("l-today").innerHTML = getTime(todayTidesL);
      document.getElementById("l-tomorrow").innerHTML = getTime(day1TidesL);
      document.getElementById("l-day2").innerHTML =  getTime(day2TidesL);
      document.getElementById("l-day3").innerHTML =  getTime(day3TidesL);
      //Add Day of week
      document.getElementById("day2-title").innerHTML =  days[day2.getDay()];
      document.getElementById("day3-title").innerHTML =  days[day3.getDay()];
      // Add dates
      document.getElementById("today-date").innerHTML = monthNames[today.getMonth()] + " " + getGetOrdinal(today.getDate());
      document.getElementById("tomorrow-date").innerHTML = monthNames[day1.getMonth()] + " " + getGetOrdinal(day1.getDate());
      document.getElementById("day2-date").innerHTML = monthNames[day2.getMonth()] + " " + getGetOrdinal(day2.getDate());
      document.getElementById("day3-date").innerHTML = monthNames[day3.getMonth()] + " " + getGetOrdinal(day3.getDate());

    }
  };
xhttp.open("GET", 'https://tidesandcurrents.noaa.gov/api/datagetter?station=8514422&product=predictions&datum=mtl&begin_date='+year+month+day+'&end_date='+fYear+fMonth+fDay+'&interval=hilo&units=english&time_zone=lst&application=web_services&format=json', true);
xhttp.send();
