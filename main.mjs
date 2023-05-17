import { LokaliseApi } from "@lokalise/node-api";

async function main() {
  const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
  const projects = await lokaliseApi.projects().list();
  console.log(projects);

  console.log(process.status); // => 'queued'
}

main().catch(console.error);