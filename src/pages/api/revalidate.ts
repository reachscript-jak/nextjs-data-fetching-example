import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ revalidated: boolean } | string>
) {
  try {
    await res.unstable_revalidate("/isr60a");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error!");
  }
}
