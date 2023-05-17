import { LokaliseApi } from "@lokalise/node-api";
import fs from 'fs';

async function main() {
  const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
  const project = await lokaliseApi.projects().create({ 
     //Add project name, description, languages, teamID. See documentation here: https://developers.lokalise.com/reference/create-a-project 
    name: "Luz's Project", //project name
    description: "My baby loves me", //project description
    team_id: "327867",
    languages: [
        {lang_iso: "en_US"}, //Add base language ISO to project languages
        {lang_iso: "es"}],  //Add target languages
    base_lang_iso: "en_US", //Define the base language of the project from the language iso list
    project_type: "localization_files", 
    tag: "Braze", // This object's purpose is to add a tag at the project level for filtering in the dashboard. Current API does not support this endpoint :(
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
  // await createKeys(projID);//Pass project ID to the file upload function
  await fileUpload(projID);
}

async function addContributors(projectID) {
    const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
    const contributors = await lokaliseApi.contributors().create([
        {
          "email": "luzsmeyin@gmail.com",
          "fullname": "Luz S",
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

  // async function createKeys(projectID) {
  //   const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
  //   const keys = await lokaliseApi.keys().create(
  //       {
  //         keys: [
  //           {
  //             key_name: "welcome_web",
  //             description: "Index app welcome",
  //             platforms: ["web"],
  //             filenames: {
  //               web: "my_filename.json",
  //             },
  //             translations: [
  //               {
  //                 language_iso: "en_US",
  //                 translation: "Welcome",
  //               },
  //             ],
  //           }
  //         ],
  //       },
  //       { project_id : projectID }
  //     );
      
  //     keys.items[0].platforms;
  //     //keys.errors[0].message; // If some keys were not created, the errors will be listed here
  //     console.log(keys);
  // }

async function fileUpload(projectID) {
  
  const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });

  // Read file contents
  const filePath = 'BrazeJsonFiles/campaign1.json'; //Write name of filepath here
  const fileContent = fs.readFileSync(filePath);

  // Convert file content to Base64
  const fileBase64 = Buffer.from(fileContent).toString('base64');

  // Upload the file to Lokalise
  const projectId = projectID;
  const uploadResponse = await lokaliseApi.files().upload(projectId, {
    data: fileBase64,
    filename: 'en_US.json', //This is the name of the file that will be added to the keys as metadata. It can be the same as the filename used for variable filePath
    lang_iso: 'en_US'
  });

  console.log(uploadResponse);
}

main().catch(console.error);
addContributors().catch(console.error);
// createKeys().catch(console.error);
fileUpload().catch(console.error);
