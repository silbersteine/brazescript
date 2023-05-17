import { LokaliseApi } from "@lokalise/node-api";

async function main() {
  const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
  const project = await lokaliseApi.projects().create({ 
     //Add project name, description, languages, teamID. See documentation here: https://developers.lokalise.com/reference/create-a-project 
    name: "API creation test 1", 
    description: "Braze Campaign 1 description",
    team_id: "327867",
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
  const projID = project.project_id
  console.log("The project ID is: " + project.project_id);
  console.log(project);

  console.log(process.status); // => 'queued'

  await addContributors(projID);//Pass project ID to the contributors function
}

async function addContributors(projectID) {
    const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
    const contributors = await lokaliseApi.contributors().create([
        {
          "email": "bubbles.lokalise@gmail.com",
          "fullname": "Bubblesr",
          "is_admin": false,
          "is_reviewer": true,
          "languages": [
            {
              "lang_iso": "en_US",
              "is_writable": false
            },
            {
                "lang_iso": "es",
                "is_writable": true
            }
          ]
        }
    ], { project_id: projectID });

    console.log(contributors);
  };

main().catch(console.error);
addContributors().catch(console.error);