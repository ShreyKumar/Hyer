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
  
  React Native would also allow us to export components to be used for our web platform without having to code it entirely for a different environment. React Native also would allow us to quickly test our app using expo which is an open source toolchain for iOS and Android. It would simply involve changing one aspect, let's say the CSS which would automatically be compiled and previewed through an iOS device already connected to the app simply through a QR code. There would be no need to do any manual work of actually sending it to the device. This would be a much better alternative than using XCode or Android Studio for example since firstly they are meant to be developed in different languages entirely and they require a lot of waiting time to actually preview the app. In addition, we also think that it will be much easier for us to control the layout of the app using CSS alone rather than XML on Android Studio for example as our past experiences have not been so great. Although React Native is relatively new, we still think we would be able to learn the technology pretty quickly because of the vast documentation that is available online which is relatively easy to follow.

### Back end ###
  For the backend, we decided to initially use an express server for our endpoints just so it will be easier to integrate any APIs we find online, specifically Firebase as we do plan to use that a lot in our app. We also figured that this will be better than the alternative of using a React Router as most of us do have experience of using express already. It will also be better for our backend team to focus more on the specific technologies needed to accomplish backend functionalities first as they would have to spend more time reading about React. Other alternatives out there such as Django or PHP for example have been proven to be unreliable as they can get stuck/break easily. Express is also generally much faster. This will make things much easier for the front end team as they can query endpoints quickly resulting in a better UI experience. 
