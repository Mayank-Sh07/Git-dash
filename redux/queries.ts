// For data displayed on the /dashboard/[userName] page
export function dashboardQuery(githubUserName: string): string {
  return `
  {
    user(login: "${githubUserName}") {
      name
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

// For data displayed on the /analytics/[userName] page
export function analyticsQuery(githubUserName: string): string {
  return `
  {
    user(login: "${githubUserName}") {
      repositories(affiliations: OWNER, first: 100) {
        nodes {
          name
          commitComments {
            totalCount
          }
        }
      }
      contributionsCollection(to: "2021-08-20T23:05:23Z") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
  
  `;
}

// For Table data displayed on the /analytics/[userName] page, Demonstrating SWR!
export function repositoryFilesQuery(
  githubUserName: string,
  repoName: string
): string {
  return `
  {
    repository(owner: "${githubUserName}", name: "${repoName}") {
      object(expression: "HEAD:") {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                byteSize
                commitUrl
              }
              abbreviatedOid
            }
          }
        }
      }
    }
  }  
  `;
}
