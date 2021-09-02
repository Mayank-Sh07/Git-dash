# Git-dash

A dashboard for viewing Github data.
<br>
### [YOUTUBE VIDEO LINK](https://youtu.be/3nPlF2U9U8w)

> ## Setup and Walkthrough

### To use Git-Dash you need to create your Github account personal Access Token. (Instructions Link below)
[Creating PAT](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

### Enter your Github username and personal Access Token into the fields to enter into Gitdash.
![image](https://user-images.githubusercontent.com/52369953/131734994-5c09b2eb-143b-4c86-a341-e2378160e158.png)

Upon entering, The dashboard page will be displayed (Server Side rendered) 
Here, you can see the top three people you follow on Github, after which there is statistics on your respositories and pull requests.

![image](https://user-images.githubusercontent.com/52369953/131734376-490f6743-5d24-41b5-ac59-37425b8b7628.png)

In the analytics page, you can view and filter your github contributions as a line chart. (Filter by year or month, data displayed per day)
You can also view files of your github repositories. Moreover, It shows you the pull requests per repository as a Radial Chart
![image](https://user-images.githubusercontent.com/52369953/131734851-44347162-50d5-4c74-93d2-cac265ffafb3.png)

Note: The other navigations are purely for presentation, I have added Tooltips to make things obvious.
<br>

> ## Roadmap
- [x] Next-JS app with MUI & Typescript
- [x] Minimal external dependencies
- [x] Design reference [UI](https://dribbble.com/shots/15545195-Integrator-dashboard-dark)
- [x] Adding Redux for State management
- [x] Dashboard-Tab with paginated Table (analytics page)
- [x] Data visualization using Recharts
- [ ] Testing using Cypress
      <br>

> ## Keeping In Mind

- Performance of the site
> To ensure optimal performance, I have utilized server side rendering.
- Fault tolerant state management
> I have used redux and kept prop passing to a minimum, No confusion! Additionally, I have used TypeScript!
- Responsiveness through **Grid** and **Box**
> The dashboard is responsive, forgot to mention in the YouTube video.
- Clean code with good docs
> Tried self-documented code approach due to lack of time to make proper docs. Modular components, intuitive naming scheme, easy to understand whats going on.
  <br>

> ## Resources
>
> | Resource Name      | Link                                                          | Reason                  |
> | ------------------ | ------------------------------------------------------------- | ----------------------- |
> | design inspiration | https://dribbble.com/shots/15545195-Integrator-dashboard-dark | Clean design, Intuitive |
> | Dummy API (Github) | https://rapidapi.com/rapidapi/api/github-graphql2/            | Robust, Suits needs     |

<br>

> ## Future Improvements (Post Submission)

- I couldn't generate types for everything (time constraint)
- More attention to detail, design-wise
