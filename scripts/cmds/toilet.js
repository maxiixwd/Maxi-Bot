const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "toilet",
    aliases: ["toilet"],
    version: "1.0",
    author: "Upen Basnet",
    countDown: 5,
    role: 0,
    shortDescription: "face on toilet",
    longDescription: "",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    
    if (mention.length === 0) {
      return message.reply("Please mention someone.");
    }
    
    // Restrict the command for UID 100078140834638
    const restrictedUID = "100078140834638";
    if (mention.includes(restrictedUID) || event.senderID === restrictedUID) {
      return message.reply("This command is restricted for the mentioned user.");
    }

    if (mention.length === 1) {
      const one = event.senderID, two = mention[0];
      try {
        const pth = await bal(one, two);
        await message.reply({
          body: "You Deserve This Place🤣",
          attachment: fs.createReadStream(pth)
        });
      } catch (error) {
        console.error("Error generating the image:", error);
        message.reply("An error occurred while processing your request.");
      }
    } else {
      const one = mention[1], two = mention[0];
      try {
        const pth = await bal(one, two);
        await message.reply({
          body: "You Deserve This Place🤣",
          attachment: fs.createReadStream(pth)
        });
      } catch (error) {
        console.error("Error generating the image:", error);
        message.reply("An error occurred while processing your request.");
      }
    }
  }
};

async function bal(one, two) {
  const avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  avone.circle();
  const avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  avtwo.circle();
  const pth = "toilet.png";
  const img = await jimp.read("https://i.imgur.com/sZW2vlz.png");

  img.resize(1080, 1350)
     .composite(avone.resize(360, 360), 8828282, 2828)
     .composite(avtwo.resize(450, 450), 300, 660);

  await img.writeAsync(pth);
  return pth;
}
