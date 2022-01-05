const fs = require("fs");
const https = require("https");

https.createServer({
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem')
}, (req, res) => {
    res.end("Teste");
}).listen(3333)