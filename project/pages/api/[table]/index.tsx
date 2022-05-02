import type { NextApiRequest, NextApiResponse } from "next";

// import { supabase } from "../../../libs/supabase";

async function index(req: NextApiRequest, res: NextApiResponse) {
  // Get table, sort and query variables from request
  // and assume the rest are for filtering.
  const { table, sort, q } = req.query as { [key: string]: string };
  delete req.query.table;
  delete req.query.sort;
  delete req.query.q;

  // const query = supabase.from(table).select("*");

  // Search
  if (q) {
    const searches = q.split(/:(.+)/);
    console.log(searches);

    // query.ilike(searches[0], `%${searches[1]}%`);
  }

  // Filter
  const filters = Object.entries(req.query);
  filters.forEach(([key, value]) => {
    // query.eq(key, value);
  });

  // Sort
  if (sort) {
    const sortKeyValues = sort.split(",").map((value) => value.split(":"));

    sortKeyValues.forEach(([key, value]) => {
      // query.order(key, { ascending: value.toLowerCase() === "asc" });
    });
  }

  // const { data, error } = await query;

  // if (error) {
  //   res.status(400).json(error);
  //   return;
  // }

  // res.status(200).json({ data });
}

export default index;
