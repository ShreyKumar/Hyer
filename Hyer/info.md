## GET USERS
If the request body contains username, it will return a javascript array containing the user whose name matches the given username (case sensitive).

## POST USERS
Request body contains the following fields:  
username  
password  
firstName  
lastName  
email  
phoneNumber  
bio  
photo  
  
User also contains a credits which is defaulted 0.00 when posted. Returns the key (username), when successfully posted.

## PUT USERS
Request body contains all the fields which POST has, with the addition of credits.

## DELETE USERS
Remains the same, deletes user with given username in request body.

## GET JOBS
Request body contains the following fields:  
jobID  
search 
employer   
order  
latitude  
longitude  
km  
  
This works in a way way you can use one of search by jobID, search, OR employer (if multiple are used, then search by jobID will be used). Using jobID lists the job with given jobID. Using search, lists all jobs, where the name or tags contain what was searched for. Using employer will list all jobs by given employer. If none are used, then it will list all jobs. In ADDITION to this, you can set the order of the jobs, currently only working with pay and distance. So for example if you leave jobID and search blank and set order to pay, then it will list ALL jobs ordered by HIGHEST pay. Another example is if you search for a term and set order to distance and give longitude and latitude, then it will list ALL jobs CONTAINING what was searched for (in the name or tags) and then it will sort those jobs by CLOSEST distance to the given coordinate. If km is given, then it will only give jobs within the kilometer restriction. So the options are in summary:  
CHOOSE ONE OF:  
jobID  
search  
employer  
(if multiple are used, jobID will be used, if none are selected all jobs are returned)  
THEN CHOOSE:  
order  
(pay or distance, if distance is used then longitude and latitude must be given)  
THEN CHOOSE:  
km  
(where all jobs outside the km radius will not be listed, like distance order longitude and latitiude must be given)  
  
So all 3 can be used or only one. Obviously if anythign is used with jobID, the job with the given jobID will be returned unless you give a km and the job is outside the km radius.

## POST JOBS
Request boddy contains the following fields:  
jobName  
description  
longitude  
latitude  
value  
type  
duration  
prerequisites  
employer  
tags  
  
Job also contains the fields applicants, hired, and status, where applicants and hired are both defaulted to empty strings, and status is defaulted to open when posted.

## UPDATE JOBS
Request body contains all the fields which POST has, with the addition of applicants, hired, and status.

## DELETE JOBS
Remains the same, deletes job with given jobID in request body.

## FRONTEND
Login: Gets Username, checks if passwords are equal, stores username  
Edit User: Posts with stored username  
Search Jobs: Gets jobs  
Post Jobs: Post jobs with stored username for employer 
Payment: Update employer credits with negative amount of value * duration, and update hired credits with positive amount of value * duration  
Apply for job: Updates job applicants with stored username  
Hire applicant: Updates job hired with applicant and removes applicant from applicants  
Look at applicants: Get jobs with employer as stored username