# Helpr.

## Introduction

Helpr allows the expats to volunteer and help the community of Berlin.  
This app was made with [@j-jmnz](https://github.com/j-jmnz) and [@roosterhack](https://github.com/roosterhack) during the last module of the [Ironhack Web Development Bootcamp](https://www.ironhack.com/en), in a time span of 10 days.

###### What is the app about?

- Assist expats to volunteer and help the community of Berlin
- Inspire people and raise awareness of current social issues.

> In a nutshell, we wanted to build a simple app which connects people who want to help and people who need help.

After the research and the brainstorming to define the MVP, we created a roadmap to define and split the tasks for the project.   

###### Prize _(votes from the jury & public)_

Winner of the March-May 2019 Ironhack batch :1st_place_medal:  

###### Technologies used

MongoDB, Express, React (hooks only), Redux, Node, Rest API, Mapbox GL JS.

------

:heart_decoration: [Discover Helpr](https://helpr-app.herokuapp.com/) - Mobile first, we recommend using it on mobile

------

## Minimum Viable Product - 1st iteration

- Mobile first app (desktop version to be finished soon)
- Create help alerts with location data
- Map view with alerts
- Create and join events 
- Bookmark alerts and events
- Comment on alerts/events

## Challenges:

###### Learning new technologies on the go

For the project, we decided to use Redux to manage the app's states, we had to learn it on the go before starting the project. The first approach was a bit confusing, but once the setup was done, it was a very helpful tool that speeded up our project creation. 

###### Database structure

We used cross-referenced collections (many-to-many). We realized that it would have been better to reference the User collection with "middleware" collections to simplify the handleling of dynamic references deletion. 

------

## Next iterations:

- [ ] NGO listing feature
- [ ] Share alerts/events
- [ ] Add to calendar
- [ ] Finish the search functionnality
- [ ] Finish the desktop version
- [ ] User testing
- [ ] Social authentication
- [ ] Admin interface to create categories/NGOs 
- [ ] Think of the alerts/events/comments moderation model.

## Sources:

- Pictures from [Unsplash](https://unsplash.com/)
- Icons from [Font Awesome](https://fontawesome.com/)

