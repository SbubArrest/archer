/* eslint-disable default-case */
const fs = require('fs-nextra');
const snekfetch = require('snekfetch');
const { resolve, join } = require('path');
const Canvas = require('canvas');

exports.init = () => {
  Canvas.registerFont(resolve(join(__dirname, './profileFonts/Roboto/Roboto-Black.ttf')), { family: 'Roboto-Black' });
  Canvas.registerFont(resolve(join(__dirname, './profileFonts/Roboto/Roboto-Regular.ttf')), { family: 'Roboto-Regular' });
  Canvas.registerFont(resolve(join(__dirname, './profileFonts/Roboto/Roboto-Light.ttf')), { family: 'Roboto-Light' });
  Canvas.registerFont(resolve(join(__dirname, './profileFonts/Roboto/Roboto-LightItalic.ttf')), { family: 'Roboto-LightItalic' });
  Canvas.registerFont(resolve(join(__dirname, './profileFonts/Roboto/Roboto-Italic.ttf')), { family: 'Roboto-Italic' });
};

exports.run = async (client, msg, [user, background]) => {
  /*
  * TODO: rename clan to group, streamAccounts to socialAccounts
  * */
  const Image = Canvas.Image;
  const canvas = new Canvas(800, 500);
  const ctx = canvas.getContext('2d');
  let userName = msg.author.username;
  let userDiscrim = msg.author.discriminator;
  let userID = msg.author.id;
  let clan, games, streamAccounts, gameAccounts;
  let noGames = 0, noAccounts = 0, newOverallY = 0, newAccountsY = 0;

  const defaultClan = {
    logo       : 'http://i.imgur.com/qlS77UF.png',
    type       : 'Community',
    name       : 'I am a G4M3R',
    tag        : '[g4m3r]',
    url        : 'www.g4m3r.xyz',
    text       : 'The G4M3R community',
    homeServer : '223909216866402304',
    discordLink: 'https://discord.gg/someIDtoJoin',
  };
  const defaultGameAccounts = [];
  const defaultStreamAccounts = [];
  const defaultGames = [];
  const defaultGames1 = [
    {
      name     : 'Test game 1',
      platform : 'PSN',
      shortname: null,
    },
  ];
  const defaultGames2 = [
    {
      name     : 'Test game 1',
      platform : 'PSN',
      shortname: null,
    },
    {
      name     : 'Test game 2 with blabla',
      platform : 'XBL',
      shortname: null,
    }
  ];
  const defaultGames3 = [
    {
      name     : 'Test game 1',
      platform : 'PSN',
      shortname: null,
    },
    {
      name     : 'Test game 2 with blabla',
      platform : 'XBL',
      shortname: null,
    },
    {
      name     : 'Testgame 3 with very very long text',
      platform : 'STEAM',
      shortname: null,
    },
  ];

  try {
    if (user) userID = user.id;
    const userDocument = await users.get(userID).run().catch(e => logger.error(e));

    // checking for users games
    games = userDocument.games;
    if (games.length === 0) {
      switch (background) {
        case '0':
          games = defaultGames;
          break;
        case '1':
          games = defaultGames1;
          break;
        case '2':
          games = defaultGames2;
          break;
        case '3':
          games = defaultGames3;
          break;
      }
    }
    noGames += games.length;

    // checking for users social accounts
    streamAccounts = userDocument.streamAccounts;
    if (streamAccounts.length === 0) {
      streamAccounts = defaultStreamAccounts;
    }
    noAccounts += streamAccounts.length;

    // checking for users game accounts
    gameAccounts = userDocument.gameAccounts;
    if (gameAccounts.length === 0) {
      gameAccounts = defaultGameAccounts;
    }
    noAccounts += gameAccounts.length;

    // checking for users group
    clan = await clans.get(userDocument.clan);
    if (!clan) clan = defaultClan;
  } catch (e) {
    logger.error(e);
  }
  const y = await client.funcs.profileY(noAccounts, noGames);
  newOverallY = y.overall;
  newAccountsY = y.accounts;

  // TODO: Selected background needs also to be stored in the user document (DB)
  try {
    // get image and draw it as background
    const bg = new Image();
    switch (background) {
      case 'bf':
        bg.onload = () => ctx.drawImage(bg, 0, 0, 750, 450);
        bg.src = await fs.readFile(`${__dirname}/profileImages/bg_battlefield.jpg`);
        break;
      default:
        bg.onload = () => ctx.drawImage(bg, 0, 0, 750, 450);
        bg.src = await fs.readFile(`${__dirname}/profileImages/bg_gintama.jpg`);
        break;
    }

    // Background rectangle
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.6;
    await ctx.fillRect(10, 200 + newOverallY, 730, 240 - newOverallY);
    ctx.globalAlpha = 1.0;

    // get and draw user avatar
    const avatar = new Image();
    let aURL;
    const avatarY = 30 + newOverallY;
    const avatarX = 25;
    if (user) {
      aURL = user.displayAvatarURL({ format: 'png' });
    } else {
      aURL = msg.author.displayAvatarURL({ format: 'png' });
    }

    ctx.rect(avatarX, avatarY, 196, 196);
    ctx.fillStyle = 'transparent';
    ctx.shadowColor = '#999';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = -5;
    ctx.fill();

    avatar.onload = () => ctx.drawImage(avatar, avatarX, avatarY, 196, 196);
    avatar.src = await snekfetch.get(aURL).then(d => d.body);

    // get and draw bot logo
    const botLogo = new Image();
    botLogo.onload = () => ctx.drawImage(botLogo, 620, 410, 120, 32);
    botLogo.src = await fs.readFile(`${__dirname}/profileImages/logo_horizontal_black.png`);

    // if user exists, get usersname and discriminator and write it
    if (user) {
      userName = user.username;
      userDiscrim = user.discriminator;
    }
    ctx.fillStyle = '#000';
    // custom size for username depending on length of username
    if (userName.length < 10) {
      ctx.font = '35px Roboto-Black';
    } else if (userName.length < 14) {
      ctx.font = '31px Roboto-Black';
    } else {
      ctx.font = '28px Roboto-Black';
    }
    ctx.fillText(`${userName}`, avatarX, avatarY + 230);
    ctx.font = '18px Roboto-Regular';
    ctx.fillText(`[#${userDiscrim}]`, avatarX, avatarY + 255);

    /*
    *  Clan Stuff
    * get and draw clan logo, name and URL if the user has a clan
    *
    */
    const clanX = 640;
    const clanY = 210 + newOverallY;
    const clanLogo = new Image();
    clanLogo.onload = () => ctx.drawImage(clanLogo, clanX, clanY, 90, 90);
    clanLogo.src = await snekfetch.get(clan.logo).then(d => d.body).catch(e => logger.error(e));
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    const clanNameWidth = clan.name.length;
    if (clanNameWidth < 10) {
      ctx.font = '35px Roboto-Black';
    } else if (clanNameWidth < 14) {
      ctx.font = '31px Roboto-Black';
    } else {
      ctx.font = '28px Roboto-Black';
    }
    ctx.fillText(`${clan.name}`, clanX - 15, clanY + 25); // printing the clan name
    ctx.font = '18px Roboto-LightItalic';
    ctx.fillText(`(${clan.url})`, clanX - 15, clanY + 50); // printing the clan URL
    ctx.font = '18px Roboto-Regular';
    ctx.fillText(`${clan.type}`, clanX - 15, clanY + 77); // printing the clan URL

    /*
    * Games Stuff
    * */
    ctx.fillStyle = '#000';
    const gamesX = 735;
    let gamesY = 325 + newOverallY;
    for (const key in games) {
      if (typeof games[key] !== 'function') {
        ctx.font = '18px Roboto-Black';
        ctx.textAlign = 'right';
        const testWidth = ctx.measureText(`  [ ${games[key].platform} ]`).width;
        ctx.fillText(` [ ${games[key].platform} ]`, gamesX, gamesY);
        ctx.font = '18px Roboto-Regular';
        ctx.textAlign = 'right';
        ctx.fillText(` ${games[key].name} `, gamesX - testWidth, gamesY);
        gamesY += 21;
      }
    }
    /*
   * Social and Gaming Accounts
   * */
    // concat streaming and game accounts
    const allAccounts = gameAccounts.concat(streamAccounts);
    const accountsX = 25;
    let accountsY;
    if (allAccounts.length > 0) {
      if (allAccounts.length < 7) {
        accountsY = 300 + newAccountsY + ((7 - allAccounts.length) * 10);
        for (const key in allAccounts) {
          if (typeof allAccounts[key] !== 'function') {
            ctx.font = '18px Roboto-Black';
            ctx.textAlign = 'left';
            const testWidth = ctx.measureText(`[ ${allAccounts[key].id} ]  `).width;
            ctx.fillText(`[ ${allAccounts[key].id} ]`, accountsX, accountsY);
            ctx.font = '18px Roboto-Regular';
            ctx.textAlign = 'left';
            ctx.fillText(` ${allAccounts[key].name}`, accountsX + testWidth, accountsY);
            accountsY += 21;
          }
        }
      } else if (allAccounts.length < 10) {
        accountsY = 300 + newAccountsY + ((9 - allAccounts.length) * 8.5);
        for (const key in allAccounts) {
          if (typeof allAccounts[key] !== 'function') {
            ctx.font = '15px Roboto-Black';
            ctx.textAlign = 'left';
            const testWidth = ctx.measureText(`[ ${allAccounts[key].id} ] `).width;
            ctx.fillText(`[ ${allAccounts[key].id} ]  `, accountsX, accountsY);
            ctx.font = '15px Roboto-Regular';
            ctx.textAlign = 'left';
            ctx.fillText(` ${allAccounts[key].name}`, accountsX + testWidth, accountsY);
            accountsY += 17;
          }
        }
      }
    }

    // send picture in discord
    canvas.toBuffer((err, buf) => {
      msg.send('', { file: { attachment: buf } });
    });
  } catch (e) {
    logger.error(e);
  }
};

exports.conf = {
  enabled      : true,
  runIn        : ['text', 'dm', 'group'],
  aliases      : ['prof'],
  permLevel    : 1,
  botPerms     : [],
  requiredFuncs: [],
  cooldown     : 0,
};

exports.help = {
  name       : 'profile',
  description: 'Shows the profile card of a user for a certain background',
  usage      : '[user:user] [str:string]',
  usageDelim : ' ',
  extendedHelp: [
    'The profile card shows all your:',
    '  • registered game accounts',
    '  • registered social accounts',
    '  • clan / community information',
    '  • registered games',
    '',
    '» use the `accounts` command to register accounts',
    // '» use the `games` command to register games',
    // '» use the `group` command to register / join a group',
  ],
};
