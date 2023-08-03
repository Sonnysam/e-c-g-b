const axios = require("axios");

// Function to get random Bible verse
async function getRandomBibleVerse(msg) {
  try {
    const response = await axios.get("https://bible-api.com/verses/random");
    const verseData = response.data;

    const book = verseData.reference.split(" ")[0];
    const chapter = verseData.reference.split(" ")[1];
    const verseNumber = verseData.reference.split(" ")[2];
    const text = verseData.text;

    // Send the Bible verse as a reply
    msg.reply(
      `
      Random Bible Verse:
      Book: ${book}
      Chapter: ${chapter}
      Verse: ${verseNumber}
      Text: ${text}
      `
    );
  } catch (error) {
    console.error("Error fetching Bible verse:", error.message);
    // Send an error message as a reply
    msg.reply("Oops, there was an error fetching the Bible verse. Please try again later.");
  }
}

// Example usage within the 'message' event listener:
client.on("message", async (msg) => {
  // ... your existing code ...

  if (msg.body === "!verse") {
    // Call the getRandomBibleVerse function with the message object
    getRandomBibleVerse(msg);
  }

  // ... more of your existing code ...
});
