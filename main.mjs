import { LokaliseApi } from "@lokalise/node-api";

async function main() {
  const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
  const project = await lokaliseApi.projects().create({ 
     //Add project name, description, languages, teamID. See documentation here: https://developers.lokalise.com/reference/create-a-project 
    name: "Project name", 
    description: "Braze Campaign 1 description",
    languages: [
        {lang_iso: "en_US"},
        {lang_iso: "es"}], 
    base_lang_iso: "en_US",
    project_type: "localization_files", 
    tag: "Braze",
    per_platform_key_names: false,
    reviewing: true,
    auto_toggle_unverified: true,
    offline_translation: false,
    key_editing: true,
    inline_machine_translations: true,
    custom_translation_statuses: true,
    custom_translation_statuses_allow_multiple: false,
    segmentation: false

});
  project.project_id;
  console.log(project.project_id);
  console.log(project);

  console.log(process.status); // => 'queued'
}

main().catch(console.error);