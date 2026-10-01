# ServiceFlow

A responsive lead-management web application designed for service businesses to capture, organize, search, and manage customer enquiries.

## Overview

ServiceFlow is a front-end web application built around a simple business problem:

> Service businesses can lose potential customers when enquiries are scattered across different channels and difficult to track.

The application provides a lightweight interface for managing leads from one dashboard.

## Core Features

- Add new leads
- Edit existing leads
- Delete leads
- Search leads by customer, email, or service
- Filter leads by status
- Real-time lead statistics
- Recent activity feed
- Persistent browser storage using `localStorage`
- Responsive dashboard layout
- Mobile-friendly interface
- Client-side input escaping for rendered user content

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Git
- GitHub
- GitHub Pages / Live Server for development

## Application Structure

```text
serviceflow/
│
├── assets/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── pages/
│   └── dashboard.html
│
├── .gitignore
├── index.html
└── README.md

How It Works
1. Lead creation
Users can add a customer with:
- Customer name
- Email
- Service
- Lead status
2. Lead management
Existing leads can be edited or deleted directly from the dashboard.
3. Search and filtering
The dashboard allows users to search across customer names, email addresses, and services, while status filters provide a focused view of the pipeline.
4. Persistent data
Lead data is stored in the browser using localStorage, allowing the application state to survive page refreshes during local use.
Responsive Design
ServiceFlow is designed to adapt across:
- Mobile phones
- Tablets
- Laptops
- Desktop displays
The interface uses responsive CSS, flexible layouts, and mobile-specific breakpoints rather than relying on a fixed desktop width.
Engineering Decisions
Client-side persistence
For this prototype, localStorage provides a simple way to demonstrate persistent application state without requiring a backend database.
Defensive rendering
User-entered lead information is escaped before being inserted into the page to reduce the risk of unintended HTML injection.
Page-aware JavaScript
The application initializes dashboard functionality only when the relevant dashboard elements exist. This allows the shared JavaScript file to be loaded safely without generating errors on the landing page.
Current Scope
ServiceFlow is currently a front-end application.
It does not yet include:
- User authentication
- Cloud database storage
- Server-side APIs
- Multi-user collaboration
- Email notifications
- Production CRM integrations
These are potential future extensions rather than features currently claimed by the project.
Future Development
Potential future versions could introduce:
- Backend API
- Database persistence
- Authentication
- Role-based access
- Lead assignment
- Follow-up reminders
- Analytics
- Email integrations
- Customer communication history
Development
This project is developed using Git with incremental commits documenting major development milestones.
Development workflow:
Build → Test → Debug → Refine → Commit → Push

Author
Hikhensile Mashamba
Web Developer • Business IT Student • Founder of Mash Web Studio
Website: https://mashwebstudio.com

### Then:

**Ctrl + S**

**Do NOT commit yet.**

Tell me **DONE** once the README is saved.