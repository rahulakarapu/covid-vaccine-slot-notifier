# covid-vaccine-slot-notifier

A simple JavaScript code that checks the availability of slots against the criteria defined.

### How to run?
Just copy the code and run in any browser console. If there is any available slot against the criteria defined, you will be notified with a sound. Currently, the script runs every 10 seconds.

### Parameters that you may want to alter:

1. sDoseLookingFor - can be set to 1 or 2 based on the dose you're looking for.
2. aDisctrictCodes - an array of the district codes that you want to book the slots in. (Currently set to show slots in Hyderabad, Medchal and Ranga Reddy districts of Telangana)

Currently the slots looked up are for the age group 18-44. If you're looking for slots for 45+, please adapt the condition in line 49 of the source code. Change session.min_age_limit < 45 to session.min_age_limit >= 45

#### Note: If you're looking to stop the script, just refresh the browser tab.
