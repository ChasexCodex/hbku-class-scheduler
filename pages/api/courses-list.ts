import type {NextApiRequest, NextApiResponse} from "next";
import config from "@/utils/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const term = req.body.term

  if (!term) {
    res.status(400).json({name: 'Error', text: 'Missing term parameter'});
    return
  }

  const data = await fetch(config('coursesApi'), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "startRow": 0,
      "endRow": 0,
      "termCode": term,
      "publicSearch": "Y"
    })
  })

  try {
    const json = await data.json()
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({name: 'Error', text: e});
  }
}
