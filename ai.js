const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API,
    
});
const openai = new OpenAIApi(configuration);

//dalle-image-generation
  async function image(prompt) {
    try {
        const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data.data[0].url;
    return image_url
    } catch (error) {
        console.log(error.message)
    } 
  }

  //chat-gpt-3 
  async function ask(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    const answer = response.data.choices[0].text;
    return answer;
}
module.exports = {
    image,
    ask
}