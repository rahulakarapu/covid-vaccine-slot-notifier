var sDoseLookingFor = "1"; // Dose 1 or Dose 2
var aDisctrictCodes = ["581", "596", "603"];
// var aDisctrictCodes = ["294", "265"]
var runInterval = 10000;
var today = getDateInRequiredFormat(0);
var tomorrow = getDateInRequiredFormat(1);
var dayAfterTomorrow = getDateInRequiredFormat(2);
var aDates = [today, tomorrow, dayAfterTomorrow];
var round = 1;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var player = require('play-sound')(opts = {})

const stayIdle = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function getDateInRequiredFormat (difference) {
    var currentDate = new Date();
    while (difference) {
        currentDate.setDate(currentDate.getDate() + 1);
        difference--;
    }
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    return day + "-" + month + "-" + year;
}

function request(queryURL) {
    return new Promise(function(resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", queryURL, false );
        xmlHttp.send( null );
        resolve(xmlHttp.responseText);
    });
}


async function fnAlertIfSlotAvailable() {
    
    for (i=0;i < aDisctrictCodes.length; i++) {
        for (j=0; j < aDates.length; j++) {
            url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + aDisctrictCodes[i]+"&date=" + aDates[j];
            await stayIdle(1100);
            request(url)
            .then(function(response) {
                response = JSON.parse(response);
                response.centers && response.centers.forEach(center => {
                    center.sessions && center.sessions.forEach(session => {
                        var doseToLookFor = sDoseLookingFor == "2" ? "available_capacity_dose2" : "available_capacity_dose1";
                        if (session[doseToLookFor] > 0 && session.min_age_limit < 45 && session.available_capacity > 0) {
                            console.log(session[doseToLookFor] + " slots available on " + aDates[j] +  " at", center.name, center.pincode);
                            player.play('beep.mp3', function(err){
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                });
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }
    console.log("Number of times the script has run :", round++);
    await stayIdle(runInterval);
    fnAlertIfSlotAvailable();
}

console.log('Running script to check available slots...');
fnAlertIfSlotAvailable();
