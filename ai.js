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
    try {
        const completion= await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "you are a sassy and funny teacher"},
              {role: "user", content: prompt}],
            });
          console.log(completion.data.choices[0].message.content);
          return completion.data.choices[0].message.content
          
          
    } catch (error) {
        console.log(error.response);
    }
}
module.exports = {
    image,
    ask
}
