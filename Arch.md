# Introduction
For this project, we will divide the work into 2 teams. We will have a backend team that will mainly focus on developing the Express server application and front end who will focus on developing an appropriate frontend interface.

Our main goal for the development of this application is to have backend functionality working at the bare minimum as it is the backbone of our application. This is also because we want to achieve . This is why we wish to put more resources towards getting backend functionality working first and then perhaps shift one member to the frontend team to design a sleek UI.
<br><br>
__Backend team__:
  - Patrick
  - Raymond
  - Ryan

__Frontend team__:
  - Shrey
  - Tim

# Technical details

### Front end ###
  For the front end of this project, we figured that using React Native would be ideal for this situation given that it is intended to be a complicated app. We also see benefits of using React Native over other platforms given that it generally is easier to code everything for multiple platforms as it is easier to export it to a .apk which can be used to submit to the Google Play store fairly easily.

  React Native would also allow us to export components to be used for our web platform without having to code it entirely for a different environment. It also allows us to quickly test our app using expo which is an open source toolchain for iOS and Android. It would simply involve changing one aspect, let's say the CSS which would automatically be compiled and previewed through an iOS device already connected to the app simply through a QR code. There would be no need to do any manual work of actually sending it to the device. This would be a much better alternative than using XCode or Android Studio for example since firstly they are meant to be developed in different languages entirely and they require a lot of waiting time to actually preview the app. In addition, we also think that it will be much easier for us to control the layout of the app using CSS alone rather than XML on Android Studio for example as our past experiences have not been so great. Although React Native is relatively new, we still think we would be able to learn the technology pretty quickly because of the vast documentation that is available online which is relatively easy to follow.

### Back end ###
  For the backend, we decided to initially use an express server for our endpoints just so it will be easier to integrate any APIs we find online, specifically Firebase as we do plan to use that a lot in our app. We also figured that this will be better than the alternative of using a React Router as most of us do have experience of using express already. It will also be better for our backend team to focus more on the specific technologies needed to accomplish backend functionalities first as they would have to spend more time reading about React. Other alternatives out there such as Django or PHP for example have been proven to be unreliable as they can get stuck/break easily. Express is also generally much faster. This will make things much easier for the front end team as they can query endpoints quickly resulting in a better UI experience.


### Use cases ###
  As described in the Project description document, we aim to use satisfy the following use cases accordingly.

  __Employer:__
  > Add, remove or edit jobs with preferences including location radius, duration, availability, prerequisites etc.

  This will be both in the Employer and Employee apps.

  > View job candidate profiles

  We will use Firebase to load data of potential job candidates and display them with React components.

  > Send requests to hire potential job candidates

  Our API for the Employer app should handle this.

  > Accept/Decline requests from job candidates

  We would require connecting the Employee API to the Employer API.

  > Add pictures and a bio to increase authenticity of jobs to employees

  Firebase should be able to handle image storage.

  > Provide bank details to the system so it is able to validate everything properly

  We can implement the Stripe API here so that it's completely secure.

  > Report employees for having fake accounts

  We can potentially implement an email system to send to an admin if this does happen.

  > Broadcast job postings to employees interested in their preferred radius

  We can use iOS/Android notifications to notify the employee. Again, it would require connecting the API to use in both accounts.

  > Provide phone/email verification to authenticate themselves

  We can use the mailgun/firebase API to authenticate the user and Twilio to send text messages.

  > Manage their employees through a timer and payment system, as soon as the timer ends, they’ve done their part and ready to get paid.

  Should be relatively easy to set up, we would need to potentially set a listener to the timer and impose an automated payment system.

  > Add/Remove value from their wallet

  Again, it would need communicating with the Stripe API. The reason why we want a wallet system is to minimize the number of payments. The Stripe API also would probably have a limit to the number of API calls one could make.

  > Rate employees

  The rating system would not be a top priority but when we do implement it, it would simply require an endpoint and rating information would be stored in firebase.


  __Employee:__
  > Search for jobs according to their preferences

  This would simply be a call to the database to search for jobs that have the appropriate attributes (preferences)

  > Send requests to available employees nearby

  This would be a request to the endpoint to search for employees

  > Get paid using the wallet system with option to cash into their actual bank account

  Since the amount would already be loaded through the Stripe API, all this would require is two calls to the API, one to minus the total amount and the other to add to the amount.

  > Rate employers

  This would require calls to the API to update/change ratings

  > Customize their profile with a picture and bio.

  This would require a call to update the already existent picture in the firebase storage and a call to update the user bio

  > Report any potential employers

  We would ideally want to remove any bad employers who would seem "sketchy", email notifications to an admin should handle this



  __Admin:__
  > Resolve a report

  There would be an admin panel to resolve reports. There must be valid reasons to report someone.
