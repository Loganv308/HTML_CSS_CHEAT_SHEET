const express = require('express');

const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger').verbose();
const app = express();
const port = 3000;
const host = "localhost";

function htmlStuff()
{
        if(db)
        {
        //$(".json").html(JSON.stringify(qry));
        var query = qry;
        var html = "";

        $("p").html("Status Database Connection : "+query.status);
        if(query.status){

                $.each(query.content, function(data)
                {
                    html += "<tr>";
                    html += "<td>"+this.no+"</td>";
                    html += "<td>"+this.nama+"</td>";
                    html += "<td>"+this.alamat+"</td>";
                    html += "</tr>";
            });
        }

        $(".data").html(html);
        }

        // open the database
        
    }
let db = new sqlite3.Database('TwitchBotDatabase.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
    console.error(err.message);
    }
    console.log('Connected to the TwitchBotDatabase database.');
    });

let db2 = new sqlite3.Database('TwitchBotDatabase.sqlite', sqlite3.OPEN_READWRITE, (err) =>
{
    if (err) 
    {
    console.error(err.message);
    }
    console.log('Connected to the TwitchBotDatabase database.');

    htmlStuff();
});

// Dummy Express GET call
app.get('/',(req,res) => {
    res.send("<h1>Twitch Chat Bot Logger</h1>");
    logger.info("Server Sent A Hello World!");
}) 

app.get('/',(req,res) => {
res.send("<h1>Twitch Chat Bot Logger</h1>");
logger.info("Server Sent a Successful Load");
}) 

// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Could not perform the calculation!');
logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
// Run the server
app.listen(port, () => {
    console.log("Server started...");
    logger.info(`Server started and running on http://${host}:${port}`)
})

// The below code will need to be edited to fit the TwitchChatDatabase table properly.

// db.serialize(() => {
//     db.each(`SELECT PlaylistId as id,
//                     Name as name
//             FROM playlists`, (err, row) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//     });
// });



  