export const fetchSearchURL = async (search: string): Promise<Array<any>> => {
  const fetchURL = await fetch(
    `https://e8eda546453445c1a81610de2be42c3e.us-central1.gcp.cloud.es.io:443/user/_search`,
    {
      method: "POST",
      headers: {
        Authorization: `ApiKey ${process.env.ELASTICSEARCH_APIKEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          wildcard: {
            username: `*${search}*`,
          },
        },
      }),
    }
  );
  let data: any = await fetchURL.json();
  if (data && data.hits) {
    data = data.hits.hits.map((hit: any) => {
      hit._source._id = hit._source.id;
      return hit._source;
    });
    return data as Array<any>;
  }
  return [];
};
