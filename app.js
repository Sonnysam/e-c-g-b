const axios = require("axios");
const qrcode = require("qrcode-terminal");
const {
  Client,
  MessageMedia,
  LocalAuth,
  Buttons,
  List,
} = require("whatsapp-web.js");
var rf = require("random-facts");
var wd = require("word-definition");
var randomWords = require("random-words");
const { default: word } = require("random-words");
var weather = require("weather-js");

  // `
  //     Oops my weather api is NA currently.😒 
  //     I'll try and let you know whether to take an umbrella along or not
  //     if you need help feel free 😁 to enter *!help*
  //     Remmember me when you're eating gob3 🤖
  //   `;
   //=========== Send a new message to the same chat ==========☁🌧🌨🌩⛅🌤🌪⛈🌬🌫🌦🌥
  // setTimeout(
  //   () =>
  //     function () {
  //       client.sendMessage(
  //         msg.from,
  //         `
  //   Read something before the day ends. Do you know why they say Ewe's are wicked?
  //   Well there's something I know about the weather ⛅ in Accra. It's 26 degrees celcius (scattered clouds)
  // `)},
  //   20000
  // );


const myGroupName = "Extrapolates v2.0";
// const myGroupName = "Test";

const client = new Client();
// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

console.log(rf.randomFact()); // Random fact

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  console.log("MESSAGE RECEIVED", msg);
    client.getChats().then((chats) => {
      myGroup = chats.find((chat) => chat.name === myGroupName);

      const productsList = new List(
        "Please select the time you want the group bot to be alive",
        "View available times",
        [
          {
            title: "Time (Please select just one)",
            rows: [
              { id: "morning", title: "Morning" },
              { id: "afternoon", title: "Afternoon" },
              { id: "evening", title: "Evening" },
            ],
          },
        ],
        "Please vote"
      );
      client.sendMessage(myGroup.id._serialized, productsList);
    });
    
     if (msg.body === "!vote") {
       msg.reply(`You've voted ${msg.body} successfully ✅`);
     }
  else if (msg.body === "!bot") {
    // Send a new message as a reply to the current one
    msg.reply(`
        - I am alive 🚀✅ 
        - Do you need help? 🧐
        - Use *!help* to access commands list
        - Please type my commands like this *Eg:![cmd-in-lowercase]* 
        - No worries if I respond late. It's because I don't have *gob3~net* in my belly (internet)\n 
        *Don't forget to eat gob3 today 😋*
        `);
  } else if (msg.body === "!word") {
    client.sendMessage(msg.from, randomWords());
  } else if (msg.body === "!facts") {
    client.sendMessage(msg.from, rf.randomFact());
  } else if (msg.body === "!help") {
    // Send a new message to the same chat
    client.sendMessage(
      msg.from,
      ` 
        *!meme* displays a random meme
        *!vote* displays a poll for users
        *!bot*: checks if I'm awake
        *!joke*: displays a random joke
        *!groupinfo*: display group info
        *!weather*: displays current weather in Accra
        *!everyone*: mentions or tags everyone
        *!facts*: generates random facts
        *!word*: generates random facts
        *!chats*: displays number opened chats\n
        *More commands coming soon 😁*
        `
    );
  } else if (msg.body === "!groupinfo") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply(`
              *Group Details*
              Name: ${chat.name}
              Description: ${chat.description}
              Created At: ${chat.createdAt.toString()}
              Created By: ${chat.owner.user}
              Participant count: ${chat.participants.length}
            `);
    } else {
      msg.reply("This command can only be used in a group!");
    }
  }
  if (msg.body === "!everyone") {
    const chat = await msg.getChat();

    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);

      mentions.push(contact);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  } else if (msg.body === "!weather") {
    const details = JSON.stringify(result, null, 2);
      weather.find(
        { search: "Accra, Ghana", degreeType: "C" },
        function (err, result) {
          if (err) console.log(err);

          console.log(JSON.stringify(result, null, 2));
        }
      );
    msg.reply(details);
  
  } else if (msg.body === "!chats") {
    const chats = await client.getChats();
    client.sendMessage(msg.from, `I hasve ${chats.length} chats open.`);
  } else if (msg.body === "!info") {
    let info = client.info;
    client.sendMessage(
      msg.from,
      `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `
    );
  }
  // MEME SECTION
  else if (msg.body === "!meme") {
    const meme = await axios("https://meme-api.herokuapp.com/gimme").then(
      (res) => res.data
    );

    client.sendMessage(msg.from, await MessageMedia.fromUrl(meme.url));
  } else if (msg.body === "!joke") {
    const joke = await axios("https://v2.jokeapi.dev/joke/Any?safe-mode").then(
      (res) => res.data
    );

    // JOKE SECTION
    const jokeMsg = await client.sendMessage(msg.from, joke.setup || joke.joke);
    if (joke.delivery)
      setTimeout(function () {
        jokeMsg.reply(joke.delivery);
      }, 1000);
  }

});

client.initialize();
