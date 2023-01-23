const { image,ask } = require("./ai.js");
require('dotenv').config()
const token = process.env.DISCORD_TOKEN

const { Client, Events, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents:
      [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent]
  });
  
  client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });
   client.on(Events.GuildMemberAdd,async member => {
    client.channels.fetch()
   })
  
  //generate images with text prompts
  client.on(Events.MessageCreate, async message => {
    if(message.channelId === '1066061713843167344'){
        if(message.author.id != '1066068765235748916'){
          const prompt = message.content;
          const answer = await image(prompt);
          if(answer === undefined){
            client.channels.fetch(message.channelId).then(channel => channel.send('cannot generate image with this prompt'));
          }else{
            client.channels.fetch(message.channelId).then(channel => channel.send(answer));
          }
        }
    }
    //generate answers and responses
    if(message.channelId === '1066005046472474784') {
      if(message.author.id != '1066068765235748916'){
       const prompt = message.content;
       const answer = await ask(prompt); 
       client.channels.fetch(message.channelId).then(channel => {
         channel.send(`<@${message.author.id}>` + answer + '\n  **bot by Ashik - TinkerHub MCET**')
       });
      }
   }
   //announcement by bot
   if(message.channelId === '1066942697560088687') {
    client.channels.fetch('1058704077791432766').then(channel => {
      channel.send(message.content)
    })
   }

  });
  client.login(token);
