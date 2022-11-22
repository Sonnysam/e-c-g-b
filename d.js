const { Client, LocalAuth, Buttons, List } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const myGroupName = "Source Group";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.getChats().then((chats) => {
    myGroup = chats.find((chat) => chat.name === myGroupName);

    const productsList = new List(
      "Here's our list of products at 50% off",
      "View all products",
      [
        {
          title: "Products lists",
          rows: [
            { id: "apple", title: "Apple" },
            { id: "mango", title: "Mango" },
            { id: "banana", title: "Banana" },
          ],
        },
      ],
      "Please select a product"
    );
    client.sendMessage(myGroup.id._serialized, productsList);
  });
});

client.on("message", (message) => {
  if (message.type === "list_response") {
    message.reply(`You've selected ${message.body}`);
  }
});

client.initialize();


//   client.getChats().then((chats) => {
//     myGroup = chats.find((chat) => chat.name === myGroupName);

//     const productsList = new List(
//       "Please select the time you want the group bot to be alive",
//       "View available times",
//       [
//         {
//           title: "Time (Please select just one)",
//           rows: [
//             { id: "morning", title: "Morning" },
//             { id: "afternoon", title: "Afternoon" },
//             { id: "evening", title: "Evening" },
//           ],
//         },
//       ],
//       "Please vote"
//     );
//     client.sendMessage(myGroup.id._serialized, productsList);
//   });
