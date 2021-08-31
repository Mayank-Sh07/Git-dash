import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
// Github graphql API v4 endpoint
const endpoint = "https://api.github.com/graphql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_GITHUB_PAT,
      ContentType: "application/json",
    },
    mode: "cors",
  });
  const data = await graphQLClient.request(req.body);
  res.status(200).json({ ...data });
};
