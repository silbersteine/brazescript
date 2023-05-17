// Importing necessary modules and libraries
import { LokaliseApi } from "@lokalise/node-api";
import fs from 'fs';

// createProject function that creates the project
async function createProject() {

  // Initializing the Lokalise API client with the API key
  const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
  
  // Creating a Lokalise project  
  const project = await lokaliseApi.projects().create({
     
    // Setting project details such as name, description, and languages See documentation here: https://developers.lokalise.com/reference/create-a-project 
    name: "Project Name", //project name
    description: "Description", //project description
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

  // Printing the project ID and details to console
  console.log("The project ID is: " + project.project_id);
  console.log(project);

  console.log(process.status); // => 'queued'

  //Pass project ID to the other functions
  await addContributors(projID);
  await fileUpload(projID);
}


// Function to add contributors to the project
async function addContributors(projectID) {
    const lokaliseApi = new LokaliseApi({ apiKey: '72439dd7b4351377a6a3d143ea1cafe3931e81af' });
    
    // Creating a contributor with email, name, and language permissions
    //To add more contributors unhide the second contributo that is commented out. Make sure to leave a comma after the final closing {} for each contributor 
    const contributors = await lokaliseApi.contributors().create([
        {
          "email": "example@email.com",
          "fullname": "Example",
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
        }// ,
      //   "email": "example@email.com",
      //   "fullname": "Example",
      //   "is_admin": false,
      //   "is_reviewer": true,
      //   "languages": [
      //     {
      //       "lang_iso": "en_US",
      //       "is_writable": false
      //     },
      //     {
      //         "lang_iso": "es",
      //         "is_writable": true
      //     }
      //   ]
      // }
    ], { project_id: projectID });

    console.log(contributors);
  };


// Function to upload a file to the project
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
    //This is the name of the file that will be added to the keys as metadata. It can be the same as the filename used for variable filePath
    filename: 'en_US.json', 
    lang_iso: 'en_US'
  });

  console.log(uploadResponse);
}

createProject().catch(console.error);
addContributors().catch(console.error);
fileUpload().catch(console.error);
