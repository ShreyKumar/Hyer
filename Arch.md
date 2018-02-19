# Introduction
For this project, we will divide the work into 2 teams. We will have a backend team that will mainly focus on developing the Express server application and front end who will focus on developing an appropriate frontend interface.

Our main goal for the development of this application is to have backend functionality working at the bare minimum as it is the backbone of our application. This is why we will  be pushing more resources towards getting backend functionality working first and then perhaps shift one member to the frontend team to design a sleek UI. 
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
  For the front end of this project, we figured that using React Native would be ideal for this situation given that it is intended to be a complicated but responsive app. We also see benefits of using React Native over other platforms given that it is generally easier to code everything for multiple platforms. React Native makes it easy to export it to an .apk which can be used to submit to the Google Play store fairly easily. 
  
  React Native would also allow us to export components to be used for our web platform without having to code it entirely for a different environment. It also allows us to quickly test our app using expo which is an open source toolchain for iOS and Android. It would simply involve changing one aspect, such as the CSS. For example, it would automatically be compiled and previewed through an iOS device already connected to the app simply through a QR code. There would be no need to do any manual work of actually sending it to the device. This would be a much better alternative than using XCode or Android Studio, since  they are meant to be developed in different languages entirely and they require a lot of waiting time to actually preview the app. In addition, we also think that it will be much easier for us to control the layout of the app using CSS alone rather than XML on Android Studio, given that our past experiences have not been so great. Although React Native is relatively new, we still think we would be able to learn the technology pretty quickly because of the vast, easy to follow online documentation.

### Back end ###
  For the backend, we decided to use an express server for our endpoints just so it will be easier to integrate any APIs we find online. For example, we plan on using Firebase as our user management and database system. We also figured that this will be better than the alternative of using a React Router as most of us already have experience with express. It will also be better for our backend team to focus more on the specific technologies needed to accomplish backend functionalities first, as they would have to spend more time reading about React. Other alternatives out there such as Django or PHP have been proven to be unreliable, as they can get stuck or break easily. Express is also generally much faster and simpler. This will make things much easier for the front end team, as they can query endpoints quickly resulting in a better UI experience. This will also make things easier for the back end team, as express allows quick and simple additions and modifications to endpoints.
