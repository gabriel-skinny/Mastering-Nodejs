const http = require("http");
const qs = require("querystring");

http.createServer((req, res) => {
    let body = '';
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-type": "text/html"
        })

        return res.end(
            '<form action="/submit" method="post">\
            <input type="text" name="sometext">\
            <input type="submit" value="Send some text">\
            </form>'
        )
    }

    if (req.url === "/submit") {
        req.on("readable", () => {
            let data = req.read();
            data && (body += data);
        });
        req.on("end", () => {
            console.log({ body });
            let fields = qs.parse(body);
            res.end(`Thanks for sending ${fields.sometext}`);
        })
    }
}).listen(3333);