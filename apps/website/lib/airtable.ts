export async function postAirtableForm(
  baseId: string,
  tableName: string,
  body: unknown
) {
  const baseUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const data = {
    records: [{ fields: body }],
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(
      "Failed to submit form:",
      response.status,
      response.statusText
    );

    throw new Error(response.statusText);
  }

  return await response.json();
}
