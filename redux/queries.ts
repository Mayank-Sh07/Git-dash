// For data displayed on the /dashboard/[userName] page
export function dashboardQuery(githubUserName: string): string {
  return `
  {
    user(login: "${githubUserName}") {
      bio
      avatarUrl
      createdAt
      email
      repositories(affiliations: OWNER, last: 25) {
        totalCount
        nodes {
          name
          url
          createdAt
          pullRequests {
            totalCount
          }
        }
      }
      repositoriesContributedTo(contributionTypes: PULL_REQUEST) {
        totalCount
      }
      pullRequests {
        totalCount
      }
      following(last: 3) {
        nodes {
          name
          bio
          avatarUrl
          repositoriesContributedTo {
            totalCount
          }
          repositories(orderBy: {field: CREATED_AT, direction: ASC}) {
            totalCount
          }
        }
      }
    }
  }
    `;
}
