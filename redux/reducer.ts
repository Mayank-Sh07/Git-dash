interface GitdashState {
  user: {
    bio: string;
    following: {
      nodes: {
        bio: string;
        avatarUrl: string;
        repositoriesContributedTo: {
          totalCount: number;
        };
        repositories: {
          totalCount: number;
        };
      }[];
    };
  };
}

export const initialState: GitdashState = {
  user: {
    bio: "",
    following: {
      nodes: [
        {
          bio: "",
          avatarUrl: "",
          repositories: { totalCount: 0 },
          repositoriesContributedTo: { totalCount: 0 },
        },
      ],
    },
  },
};

export interface IndexActionData {
  type: string;
  payload: {
    user: {
      bio: string;
      following: {
        nodes: {
          bio: string;
          avatarUrl: string;
          repositoriesContributedTo: {
            totalCount: number;
          };
          repositories: {
            totalCount: number;
          };
        }[];
      };
    };
  };
}

export const reducer = (state = initialState, action: IndexActionData) => {
  switch (action.type) {
    case "SET_INDEX_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
