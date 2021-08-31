export function indexGQL(githubUserName: string): string {
  return `
    {
      user(login: "${githubUserName}") {
        bio
        following(last: 3) {
          nodes {
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
