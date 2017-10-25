var xhttp = new XMLHttpRequest();
var self = this;
var today = new Date();
var toDate = new Date();
toDate.setDate(today.getDate() + 3);

// Puts a zero in front
function putZero(num){
  if(num < 10){
    return'0' + num;
  }else {
    return num;
  }
}

//Formats time into a string to displau
function formatTime(time){
  var returnValue = "";
  var ap = parseInt(time.substring(0,2));
  if( ap > 12){
    ap -= 12;
    putZero(ap);
    returnValue += ap + time.substring(2,5) + " PM, ";
  }else{
    returnValue += ap + time.substring(2,5) + " AM, ";
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
       var tidesArray = new Array();
       for(x in result){
         if(result[x]['type'] === "H" || result[x]['type'] === "L"){
           tidesArray.push(result[x]['t'].substr(11,15));
         }
       }
       var dates = ["today","tomorrow","day3","day4"];
       var displayDays = ["Today", "Tomorrow"];
       for(date = 0; date < dates.length; date++){
         // Adds the current date
         var display = document.getElementById(dates[date]).getElementsByClassName('dates');
         var displayDate = new Date();
         displayDate.setDate(today.getDate() + date);
         monthNames[today.getMonth()] + " " + getGetOrdinal(today.getDate());
         if(date > 1){
           display[0].innerHTML = days[displayDate.getDay()] + ", " + monthNames[displayDate.getMonth()] + " " + getGetOrdinal(displayDate.getDate());
         }else {
           display[0].innerHTML = displayDays[date] + ", "+ monthNames[displayDate.getMonth()] + " " + getGetOrdinal(displayDate.getDate());
         }
         // Adds the times to the page
         var child = document.getElementById(dates[date]).getElementsByClassName('times');
         child[0].innerHTML = formatTime(tidesArray[0]) + ", " + formatTime(tidesArray[3]);
         child[1].innerHTML = formatTime(tidesArray[2]) + ", " + formatTime(tidesArray[4]);
         console.log(child);
       }
       console.log(tidesArray);
    }
  };
var startDate = String(today.getFullYear()) + putZero(today.getMonth() + 1)+putZero(today.getDate());
var endDate = String(toDate.getFullYear()) + putZero(toDate.getMonth() + 1)+putZero(toDate.getDate());
xhttp.open("GET", 'https://tidesandcurrents.noaa.gov/api/datagetter?station=8514422&product=predictions&datum=mtl&begin_date='+startDate+'&end_date='+endDate+'&interval=hilo&units=english&time_zone=lst&application=web_services&format=json', true);
xhttp.send();
