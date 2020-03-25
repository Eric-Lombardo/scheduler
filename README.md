# Interview Scheduler

Interview Sceduler is a React based project to create, edit and delete appointments

This project was to practice: React, Axios, Cypress, Storybook, Jest and Classnames 

## Setup

Install dependencies with `npm install`.

## Walkthrough
### On page load
The user is shown a modern interface with access to specific days of the week through the left side-bar. Clicking on a day will update the main interface with available or booked slots for that day. From here a user can create, edit or delete their appointments. Their choice of day will be highlighted with a white background in the side-bar.

## Creating an appointment
Clicking on the "+" icon for an available slot will display a small form where the user can fill out their name and choose a specific interviewer from a list of available interviewers for that given day. Next, the user can save the appointment to the database by clicking on the "Save" button. This will save the information from the form to the database and then display the saved appointment to the user, confirming their name, chosen interviewer and time slot.
### On second thought ...
While creating a new appointment the user also has the option to change their minds and not fill out the form by clicking on the "Cancel" button. This will bring the user back to the main interface like it was before with the "+" button visible for that time slot

## Editing an appointment
After the creation of an appointment, the user can edit their names or choice of interviewer by hovering over an existing appointment and clicking on the edit icon. This will display an already filled-out appointment with the current info. From here, the user can change their name and choice of interviewer. Once the user has changed the info, they can either save their changes by clicking on the "Save" button or back out and display the old appointment by clicking on the "Cancel" button

## Deleting an appointment
After the creation of an appointment, the user can delete an appointment by hovering over an existing appointment and clicking on the trash bin icon. This is a destructive action, so a confirmation box will be displayed allowing the user to cancel or confirm their request. After confirming the delete process, the appointment will be gone and the user will now be presenented witht he "+" icon for that time slot showing them their action has been recorded.

## Spots available
All days currently hold a maximum of 5 appointments. Creating or deleting an appointment will update the available spots remaining for that particular day.

## All booked
When a user chooses a day from the sidebar, the default state of the app will make a partiular day's background become red on hover. However, when a day is fully booked and no spots remain, the hover background color will become a muted red. The same is true for the current active day chosen, but the background will become a muted white.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
