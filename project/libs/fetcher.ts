async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}

export default fetcher;
