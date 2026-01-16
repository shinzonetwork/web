import { postAirtableForm } from "@/lib/airtable";

type FormSubmitRequestBody = {
  id: string;
  body: unknown;
};

export async function POST(request: Request) {
  try {
    const { id, body } = await request.json<FormSubmitRequestBody>();

    const form = airtableFormMap[id];

    if (!form) return Response.json({ message: "not found" }, { status: 404 });

    const response = await postAirtableForm(form.formId, form.tableName, body);

    if (!response) return Response.json({ message: "fail" }, { status: 500 });

    return Response.json({ message: "success" });
  } catch (error: unknown) {
    console.error("Error submitting form:", error);
    return Response.json({ message: "error" }, { status: 500 });
  }
}

// Map of form ids to airtable form configurations
const airtableFormMap: Record<
  string,
  { formId: string; tableName: string } | null
> = {
  indexerRegister: parseAirtableFormEnvVar(process.env.AIRTABLE_INDEXER_FORM),
  suggestRequest: parseAirtableFormEnvVar(process.env.AIRTABLE_SUGGEST_FORM),
};

// Read the AIRTABLE_ env variable and parse it from format of 'baseId|tableName'
function parseAirtableFormEnvVar(envVar?: string) {
  if (!envVar) return null;
  const [formId, tableName] = envVar.split("|");

  return !formId || !tableName ? null : { formId, tableName };
}
