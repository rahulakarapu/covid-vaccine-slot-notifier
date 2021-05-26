var sDoseLookingFor = "1"; // Dose 1 or Dose 2
var aDisctrictCodes = ["581", "596", "603"];
var runInterval = 10000;
var today = getDateInRequiredFormat(0);
var tomorrow = getDateInRequiredFormat(1);
var dayAfterTomorrow = getDateInRequiredFormat(2);
var aDates = [today, tomorrow, dayAfterTomorrow];
var round = 1;

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

function request(queryURL)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", queryURL, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

async function fnAlertIfSlotAvailable() {
    
    for (i=0;i < aDisctrictCodes.length; i++) {
        for (j=0; j < aDates.length; j++) {
            url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + aDisctrictCodes[i]+"&date=" + aDates[j];
            await stayIdle(1100);
            response = request(url);
            try {
                response = JSON.parse(response)
            } catch(e) {
                continue;
            }
            response.centers.forEach(center => {
                center.sessions.forEach(session => {
                    var doseToLookFor = sDoseLookingFor == "2" ? "available_capacity_dose2" : "available_capacity_dose1";
                    if (session[doseToLookFor] > 0 && session.min_age_limit < 45 && session.available_capacity > 0) {
                        console.log(session.available_capacity + " slots available at", center.name, center.pincode);
                        var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                        audio.play();
                    }
                });
            });
        }
    }
    console.log("Number of times the script has run :", round++);
    await stayIdle(runInterval);
    fnAlertIfSlotAvailable();
}

console.log('Running script to check available slots...');
fnAlertIfSlotAvailable();
