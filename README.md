# Git-dash

A dashboard for viewing Github data.

> ## Setup and Walkthrough

To use Git-Dash you need to create your Github account personal Access Token. (Instructions Link below)
[Creating PAT](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
<br>
![image](https://user-images.githubusercontent.com/52369953/131656350-6787333a-2dcc-40d0-a721-604e7e114933.png)
Enter your Github username and personal Access Token into the fileds to enter into Gitdash.

![image](https://user-images.githubusercontent.com/52369953/131656865-8991b69a-dec1-43d7-9444-09af26ac43ad.png)
Upon entering, The above dashboard page will be displayed (Server Side rendered) 
Here, you can see the top three people you follow on Github, after which there is statistics on your respositories and pull requests.

![image](https://user-images.githubusercontent.com/52369953/131657220-0c406cf8-172d-4494-b44c-c5729d374416.png)
In the analytics page, you can view and filter your github contributions as a line chart. (Filter by year or month, data displayed per day)
You can also view files of your github repositories (Currently only oldest, explained in YouTube video). Moreover, It shows you 
the pull requests per repository as a Radial Chart

The other navigations are purely for presentation
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
- Fault tolerant state management
- Responsiveness through **Grid** and **Box**
- Clean code with good docs
  <br>

> ## Resources
>
> | Resource Name      | Link                                                          | Reason                  |
> | ------------------ | ------------------------------------------------------------- | ----------------------- |
> | design inspiration | https://dribbble.com/shots/15545195-Integrator-dashboard-dark | Clean design, Intuitive |
> | Dummy API (Github) | https://rapidapi.com/rapidapi/api/github-graphql2/            | Robust, Suits needs     |

<br>
