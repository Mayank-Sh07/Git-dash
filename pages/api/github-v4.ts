import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient } from "graphql-request";
// Github graphql API v4 endpoint
const endpoint = "https://api.github.com/graphql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, PAT } = req.body;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: "bearer " + PAT,
      ContentType: "application/json",
    },
    mode: "cors",
  });
  const data = await graphQLClient.request(query);
  res.status(200).json({ ...data });
};
