# Whereoke App
<http://olivia-leach.github.io/whereoke_app/>

## Project 2 for General Assembly Web Development Immersive
@olivia-leach. Built between 4/28/2016 and 5/3/2016.

## Assignment
Build a working full stack application.

## App Description
- Quearies a database of karaoke bars and the nights they host karaoke for bars that are hosting for the selected day.
- Dynamically displays this data using the Google Maps API & Google Streetview API.
- Defaults to current day of week, but users can change the day if necessary, which will then update the map and info-carousel.
- Users can create an account to leave reviews for bars and add them to their favorites list.
- Users can also personalize an icon for their profile.

## Approach
- Structure basic bones of page layout with HTML/SCSS: bootstrap and flexbox
- Connect user-based API events on the front end to API using AJAX/jQuery:
  - Log in (sign-in, POST request)
  - Log out (sign-out, DELETE request)
  - Register (sign-up, POST request)
  - Change Password (change-password, PATCH request)
- Complete JS logic to create a functioning app, integrating Google Maps API and bootstrap components.
  - Filter bars database based on selected day.
  - Display the filtered data on the map.
  - Populate info carousel with filtered bars.
  - etc
- Connect app events on the front end to API using AJAX / jQuery:
  - Load bars on page load (GET request)
  - Edit user icon (PATCH request)
  - Add new bar to favorites (POST request)
  - Delete bar from favorites (DELETE request)
  - Add new review for a bar (POST request)
- Flush out HTML/SCSS
- Add some fun design bonuses

## Technologies Used
- Bootstrap
- Handlebars
- HTML/SCSS
- JavaScript
- AJAX
- jQuery
- Google Maps API
- Flexbox

### Wireframe
- <https://app.moqups.com/olliiviia/o9hwhjxk/view/page/a22e70bbe>

## User Stories
- As a user, I want to be able to quickly view the karaoke going on today without having to register/log in.
- As a user, I want to be able to change the day so that I can plan ahead.
- As a user, I want to be able to see average ratings for each of the bars.
- As a user, I want to be able to have an account so that I can rate bars.
- As a user, I want to be able to create a favorites list so I can remember which ones I liked the best.

## Future updates
- Be able to edit/delete the reviews you've submitted
- Link google map infowindows with carousel (so when the carousel scrolls, the infowindow for that bar automatically pops up).
- Add/edit additional user profile options:
  - tagline
  - favorite song
  - username
- Let users add bars to the bar database
- Add more lines that will be randomly chosen in place of "and I've got a song that needs to be sung" every time the page loads
- Have Google Map pan to extent of bars
