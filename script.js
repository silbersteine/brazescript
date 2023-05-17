import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af'});
const projects = await lokaliseApi.projects().list();
projects.items[0].name;

process = await lokaliseApi.files().upload(project_id,
  {data: data_base64, filename: 'test1.json', lang_iso: 'en'})
process.status // => 'queued'