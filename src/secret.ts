import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export async function loadEnvFromSecret(secretId: string, version = "latest") {
  const client = new SecretManagerServiceClient();
  // Let the client figure out the project via ADC/metadata. You can also:
  // const projectId = await client.getProjectId();
  // const name = `projects/${projectId}/secrets/${secretId}/versions/${version}`;

  const [projectId] = await client.getProjectId();
  const name = `projects/${projectId}/secrets/${secretId}/versions/${version}`;

  const [accessResponse] = await client.accessSecretVersion({ name });
  const payload = accessResponse.payload?.data?.toString("utf8") ?? "";

  // Try JSON first; fall back to KEY=VALUE lines
  try {
    const parsed = JSON.parse(payload);
    if (typeof parsed === "object" && parsed) {
      for (const [k, v] of Object.entries(parsed)) {
        if (process.env[k] === undefined) process.env[k] = String(v);
      }
      return;
    }
  } catch (_) {
    // not JSON, try dotenv-style
  }

  for (const line of payload.split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (m) {
      const [, key = "", rawVal = ""] = m;
      const val = rawVal.replace(/^"|"$/g, "");
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}
