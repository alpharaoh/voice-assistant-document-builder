// We must use ngrok URL to test locally since the ultravox API does not allow http
const ngrokUrl = "https://c3e7-80-193-54-249.ngrok-free.app";

export const editDocumentTool = {
  temporaryTool: {
    modelToolName: "edit-document",
    description:
      "Use this tool to edit the project. You must use this tool whenever you want to edit the project.",
    dynamicParameters: [
      {
        name: "content",
        location: "PARAMETER_LOCATION_BODY",
        schema: {
          body: "The content of the document to edit. Make sure it follows the schema of how to strcuture a document.",
        },
        required: true,
      },
    ],
    http: {
      baseUrlPattern: `${ngrokUrl}/api/document`,
      httpMethod: "POST",
    },
  },
};
