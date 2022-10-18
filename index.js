const tmi = require('tmi.js');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('TwitchBotDatabase.sqlite');

const client = new tmi.Client(
    {
  connection: 
  {
    secure: true,
    reconnect: true
  },
  channels: [ 'xqc' ]
});

client.connect();

const winston = require('winston');

const wbs = require('winston-better-sqlite3');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new wbs({

            // 'db' is required, and should include the full 
            // path to the sqlite3 database file on the disk
            db: 'TwitchBotDatabase.sqlite',

            // The name of the table to use in the database.
            // Defaults to 'log'
            table: 'TwitchChatDatabase',

            // A list of the log params to log. Defaults to 
            // ['level, 'message']. These params are used as 
            // columns in the sqlite3 table
            params: ['USER_ACCID','TWITCH_NAME', 'CHAT_MESSAGE'],
        })
    ]
});

function errorMessage(err)
{
  if (err) 
  {
    return console.log(err.message);
  }
};

client.on('message', (channel, tags, message, self) => 
{
  chatMessage = message;
  var d = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  console.log(`(${tags['user-id']}) ${tags['display-name']}: ${chatMessage}`);
  userID = tags['user-id'];
  twitchName = tags['display-name'];
  id = tags['color'];

  randID = Math.floor(Math.random() * 10000000)
 
  db.run(`INSERT INTO TwitchChatDatabase(FAKE_ID, ACC_ID, TIMESTAMP, USER_ACCID, TWITCH_NAME, CHAT_MESSAGE) VALUES(?, ?, ?, ?, ?, ?)`, [randID, userID, d, userID, twitchName, chatMessage], errorMessage); 
}); 

// "INSERT INTO TwitchChatDatabase(USER_ID) VALUES(?)", [`(${tags['USER_ID']}`],
// INSERT INTO TwitchChatDatabase(TWITCH_NAME) VALUES(?)", [`(${tags['TWITCH_NAME']})`],
// ['C'], function(err) { if (err) { return console.log(err.message); } 

