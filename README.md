# App Flow

- User arrives at site. I show the loading spinner. I do not render children.
- I async log them in for some time.
- Finally I know the user. I store them in global AppContext
- Now I render children (Routes)
- The Root route mounts and starts to consider some complex logic

At this point, I know:
- The user's role (user | superadmin)
- The user's companyIds ([111, 222, 333])
- The route that they are TRYING to go to
  - /company/6/
  - /company/6/billing
  - /
  - /billing