# Name change society

## Background
The government of a small country has tasked you with building a website to help its citizens manage their names. This country is pretty quirky. The citizens loved changing their name so much that it became common for everyone to change their name at least once a year! Quirkier still, local law requires that no citizen is allowed to re-use a past name, and every current name must be unique. Because of this, it's become common courtesy to hold on to a name for no longer than a year.

### Overview
This government requires a system for its citizens to be able to log in and submit their name changes as well as providing a way to view their past names. Government officials will also be able to log in and view a list of citizens, and perform administrative duties such as viewing past names and submitting new names on behalf of citizens.

They also need a page to show names that should be changing within 28 days. The citizens are expected to be able to check this page without being required to log in. They want to easily keep an eye out for names that they might like to have for a year!

### Your Tasks
##### Create the site's index page. Allowing unauthenticed access to:
1. Log in
1. View a list of all names that are 28 days or less from being a year old

##### Create any necessary pages that allow citizens to:
1. Log in/out
1. View their current name
1. View their historical names
1. Submit a new name

Keep in mind there are restrictions on what a citizen can name themselves:
1. They cannot re-use a name that they've had in the past
1. They cannot use a name that someone else currently has
 
##### Create any necessary pages that allow government officials to:
1. Log in/out
1. View the names of all citizens
1. View any particular citizen to:
  1. See their current name
  1. See their past names
  1. Submit a new name on their behalf

### Solution
For your solution we expect to see:
1. Usage of a relational database such as PostgreSQL
1. A Rest or GraphQL API written in Laravel
1. A frontend built in JavaScript, ideally ES6/TypeScript/React, that performs calls to your API
  1. You are not expected to create a fancy looking page. Feel free to use a basic CSS framework or none at all
1. The database, backend, and frontend to be in Docker containers

Your solution will need a number of endpoints / features / database tables, etc. The following is only a guide of what we are expecting to see in your submission

- A RDBMS datastore (PostgreSQL for example)
  - Tables
    - Citizens
    - Government Officials
    - Names
    - Users
- API Endpoints and Frontend Pages
  - Log in/out
  - Authenticated endpoints / pages
    - The logged in citizen can:
      - Retrive their own name
      - Retrieve all their historical names
      - Submit a new name
      - List all names that are expiring within 28 days
    - The logged in goverment official can:
      - List the names of all citizens
      - List all historical names of any citizen
      - Submit a new name for any citizen

### Considerations
- You may manually create users directly in your database
- Security is important, e.g. Citizens shouldn't be able to submit a new name for other Citizens, view Citizens' past names, etc.
- The code built for this should be easily reusable, so that when the government wants to provide an API for 3rd party use in the future, they won't need to re-build everything
- The government is thinking of allowing citizens to submit name changes that come into effect within 28 days, but has decided to hold off on that for now
- The government will later be required to report to the World Name Change Society. This means that citizens will be required by law to change their name every year and a report must be created and submitted to the World Name Change Society every day so they can chase up citizens who have not changed their name in time