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
          title: "Products list",
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
