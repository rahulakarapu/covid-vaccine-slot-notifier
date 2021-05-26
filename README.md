# cowin-vaccine-slot-notifier

## How to check for slots using the script cowin-slot-booking-script-browser.js

This is a simple JavaScript code that checks the availability of slots against the criteria defined. It can directly run on the browser.

### How to run?
Just copy the code and run in any browser console. If there is any available slot against the criteria defined, you will be notified with a sound. Currently, the script runs every 10 seconds.

#### Note: If you're looking to stop the script, just refresh the browser tab.




## How to check for slots using the script cowin-slot-booking-script-node.js

This is a simple JavaScript code that checks the availability of slots against the criteria defined. It can be run on a terminal with node.js environment.

### How to run?
1. Ensure that node.js is installed in the system.
2. Install XMLHttpRequest package using the command `npm install xmlhttprequest` - This is to make get calls to the COWIN API.
3. Install play-sound package using the command `npm install play-sound` - This is for playing the sound when a slot is available.
4. Using the terminal, cd into the folder that contains the file cowin-slot-booking-script-node.js. Run the script using `node cowin-slot-booking-script-node.js`


## Parameters that you may want to alter:

1. sDoseLookingFor - can be set to 1 or 2 based on the dose you're looking for.
2. aDisctrictCodes - an array of the district codes that you want to book the slots in. Currently set to show slots available in Hyderabad, Medchal and Ranga Reddy districts of Telangana.
3. Currently the slots looked up are for the age group 18-44. If you're looking for slots for 45+, please adapt the condition in the source code. Change session.min_age_limit < 45 to session.min_age_limit > 44


