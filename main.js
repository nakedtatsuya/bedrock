const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: "us-east-1",
});

const params = {
  modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "こんにちは、"
          }
        ]
      }
    ]
  }),
};

const invokeModel = async () => {
  try {
    const command = new InvokeModelCommand(params);
    const response = await client.send(command);
    // バイナリデータをテキストに変換
    const textDecoder = new TextDecoder("utf-8");
    const responseBodyText = textDecoder.decode(response.body);

    console.log("Response Text:", responseBodyText);
  } catch (error) {
    console.error("Error invoking model:", error);
  }
};

invokeModel();
