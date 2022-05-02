import type { NextApiRequest, NextApiResponse } from "next";


async function index(req: NextApiRequest, res: NextApiResponse) {
  const { table, id } = req.query as { [key: string]: string };
  const ids = id.split(";");
  const idsFilter = ids.reduce((prev, id, index) => {
    const isLast = ids.length - 1 === index;
    return prev + `id.eq.${id}${isLast ? "" : ","}`;
  }, "");

  // const query = supabase.from(table).select("*").or(idsFilter);

  // if (ids.length === 1) query.single();

  // const { data, error } = await query;

  // if (error) {
  //   res.status(400).json(error);
  //   return;
  // }

  // res.status(200).json({ data });
}

export default index;
