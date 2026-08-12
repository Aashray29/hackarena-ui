# Hackathon Hub UI

Hackathon Management System — Frontend UI Only

Build a complete, modern, responsive frontend UI for a Hackathon Management System.

IMPORTANT

This is a UI-only project.

Do NOT create:

Backend

Database

MySQL integration

Supabase

Firebase

API calls

Authentication logic

Server-side code

Use only frontend mock data and local state where necessary.

I will build the backend and MySQL database manually later.

The frontend should be structured so that I can easily connect REST APIs to it later.

TECH STACK

Use:

React

TypeScript

Tailwind CSS

Modern component-based architecture

Responsive design

Create reusable components and keep the code clean and easy to modify.

PROJECT

Project name:

HackArena — Hackathon Management System

Create a professional technology/hackathon-themed UI suitable for a college project.

The design should feel modern, clean and professional rather than looking like a generic admin template.

USER ROLES

Create UI for three roles:

Participant

Admin

Judge

Do not implement real authentication.

For development, provide separate demo navigation/buttons so I can easily preview:

Participant Dashboard

Admin Dashboard

Judge Dashboard

PUBLIC PAGES

1. Landing Page

Create an attractive homepage with:

Navbar

HackArena logo

Home

Hackathons

About

Login

Register

Hero Section

Headline:

Build. Innovate. Hack.

Subtitle:

"Join exciting hackathons, build amazing projects, collaborate with talented developers, and compete for the top spot."

Buttons:

Explore Hackathons

Register Now

Features

Display 3–4 cards:

Find Hackathons

Build Teams

Submit Projects

Compete & Win

How It Works

Show:

Register

Join/Create Team

Build Your Project

Submit

Get Evaluated

Win

Footer

Include:

HackArena

Quick Links

Contact

Social icons

Copyright

2. Hackathons Page

Display hackathons as attractive cards.

Each card should contain:

Hackathon name

Short description

Date

Registration deadline

Team size

Status badge

Number of participants

View Details button

Example statuses:

Registration Open

Upcoming

Ongoing

Completed

Add:

Search bar

Status filter

Sort option

Use mock data.

3. Hackathon Details Page

Create a detailed page containing:

Hackathon title

Description

Banner/hero section

Start date

End date

Registration deadline

Team size

Prize information

Rules

Technologies/themes

Timeline

Primary button:

Register for Hackathon

Use mock data.

AUTHENTICATION UI

Create:

Login Page

Fields:

Email

Password

Buttons:

Login

Continue as Participant

Continue as Admin

Continue as Judge

Also include:

Forgot password

Register link

These buttons should only navigate to the corresponding UI pages. No real authentication.

Register Page

Fields:

Full name

Email

College

Phone

Password

Confirm password

Button:

Create Account

PARTICIPANT DASHBOARD

Create a dashboard layout with a sidebar.

Sidebar:

Dashboard

My Hackathons

My Team

Find Teams

Project Submission

Results

Profile

Logout

Dashboard Overview

Display cards:

Registered Hackathons

Active Hackathons

Team Members

Submissions

Upcoming Deadline

Add an "Upcoming Hackathons" section.

Add a "Recent Activity" section.

MY HACKATHONS PAGE

Show hackathons the participant has registered for.

Use cards/table with:

Hackathon

Date

Team

Status

Submission status

View button

MY TEAM PAGE

Create a team management interface.

Show:

Team Header

Team name

Hackathon

Team leader

Team size

Team Members

Display member cards with:

Avatar

Name

College

Role

Example:

Team Leader
Member

Buttons:

Create Team

Join Team

Invite Member

Leave Team

Use modal dialogs for creating/joining a team.

Use mock data only.

FIND TEAMS PAGE

Display available teams.

Each team card should show:

Team name

Hackathon

Current members

Maximum members

Required skills

Team leader

Button:

Request to Join

Add:

Search

Hackathon filter

Skill filter

PROJECT SUBMISSION PAGE

Create a professional submission form.

Fields:

Project Name

Project Description

Technologies Used

GitHub Repository URL

Demo URL

Team Name

Button:

Submit Project

After submission, show a submission status card:

Submitted

Submission date

Project name

GitHub link

Demo link

Do not implement actual submission logic.

RESULTS PAGE

Create a results dashboard.

Show:

Project name

Hackathon

Innovation score

Technical score

Presentation score

Impact score

Total score

Rank

Judge feedback

Use mock data.

LEADERBOARD PAGE

Create a visually impressive leaderboard.

Display:

🥇 1st Place
🥈 2nd Place
🥉 3rd Place

Then a table:

| Rank | Team | Project | Score |

Include:

Search

Hackathon filter

Score

Make the top three teams visually prominent.

ADMIN DASHBOARD

Create a separate admin dashboard layout.

Sidebar:

Dashboard

Hackathons

Participants

Teams

Submissions

Judges

Results

Settings

Logout

Admin Overview

Statistics cards:

Total Hackathons

Total Participants

Total Teams

Total Submissions

Pending Evaluations

Add charts using mock data:

Participants per Hackathon

Submissions per Hackathon

Evaluation status

ADMIN HACKATHON MANAGEMENT

Create a page with a table:

Columns:

Hackathon

Date

Participants

Teams

Status

Actions

Actions:

View

Edit

Delete

Add:

Create Hackathon

Create a modal/form containing:

Hackathon name

Description

Start date

End date

Registration deadline

Minimum team size

Maximum team size

Status

Frontend only.

ADMIN PARTICIPANTS

Create participant management page.

Table:

Name

Email

College

Registered Hackathons

Team

Status

Actions

Add:

Search

Filters

View details

ADMIN TEAMS

Create team management page.

Table:

Team name

Hackathon

Leader

Members

Submission status

Actions

Allow UI actions:

View team

View members

Remove team

Use mock data.

ADMIN SUBMISSIONS

Create submission management page.

Table:

Team

Project

Hackathon

Submitted date

Evaluation status

Score

Actions

Actions:

View submission

View GitHub

View Demo

View evaluation

ADMIN JUDGES

Create judge management page.

Display:

Judge name

Email

Assigned submissions

Evaluated submissions

Pending evaluations

Add:

Add Judge

Create an assignment UI where an admin can select:

Judge

Hackathon

Submission

Use mock data only.

JUDGE DASHBOARD

Create a separate judge dashboard.

Sidebar:

Dashboard

Assigned Projects

Pending Evaluations

Completed Evaluations

Profile

Logout

Judge Overview

Cards:

Assigned Projects

Pending Evaluations

Completed Evaluations

Assigned Projects

Show project cards containing:

Team name

Project name

Description

Technologies

GitHub

Demo

Evaluation status

Button:

Evaluate

EVALUATION PAGE

Create a professional evaluation form.

Project information at the top.

Evaluation criteria:

Innovation

Slider/input: 0–25

Technical Implementation

Slider/input: 0–25

Presentation

Slider/input: 0–25

Impact

Slider/input: 0–25

Automatically calculate the displayed total score using frontend state.

Maximum:

100 points

Add:

Feedback textarea

Button:

Submit Evaluation

This is only frontend functionality.

PROFILE PAGE

Create a profile page for participants, judges and admins.

Show:

Profile avatar

Name

Email

College

Phone

Role

Allow editing UI.

No backend functionality.

DESIGN SYSTEM

Use a modern hackathon aesthetic.

Design characteristics:

Dark/modern technology feel

Clean cards

Subtle gradients

Rounded corners

Good spacing

Professional typography

Modern icons

Smooth hover effects

Responsive layout

Do not make the UI overly flashy.

Make it look like a real startup/hackathon platform.

RESPONSIVENESS

The entire application must work properly on:

Desktop

Laptop

Tablet

Mobile

Create responsive:

Navbar

Sidebar

Tables

Cards

Forms

Modals

Dashboards

On mobile, convert the sidebar into a mobile navigation menu.

MOCK DATA

Create realistic frontend mock data for:

5 hackathons

10 participants

5 teams

5 projects

4 judges

Evaluation scores

Leaderboard

Keep mock data in separate files so I can later replace it with API calls.

For example:

src/data/mockHackathons.ts
src/data/mockUsers.ts
src/data/mockTeams.ts
src/data/mockSubmissions.ts
src/data/mockEvaluations.ts

API-READY ARCHITECTURE

Although there is no backend, structure the frontend so that I can later replace mock data with REST API calls.

Create service files such as:

src/services/authService.ts
src/services/hackathonService.ts
src/services/teamService.ts
src/services/submissionService.ts
src/services/evaluationService.ts

For now, these can use mock data.

Clearly separate:

UI components

Pages

Mock data

Services

Types

This will make it easy to connect my manually built Node.js/Express/MySQL backend later.

IMPORTANT

Do not create any database.

Do not use Supabase.

Do not use Firebase.

Do not create backend APIs.

Do not create server-side code.

Do not hardcode database credentials.

This Lovable project should be frontend UI only, with mock data and frontend state.

Make sure every button/navigation works at the UI level so I can demonstrate the complete application flow before connecting my backend.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dfd589cd-0796-425f-9fce-f1140bf3cbef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
