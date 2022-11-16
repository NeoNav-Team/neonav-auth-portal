const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const certPath = process.env.CERT_PATH || 'localhost';
const localDomain = process.env.LOCAL_DOMAIN || 'localhost';
const cert = path.join(process.cwd(), certPath +'.cer');
const key = path.join(process.cwd(), certPath + '.key');

const httpsOptions = {
    key: fs.readFileSync(key, 'utf8'),
    cert: fs.readFileSync(cert, 'utf8')
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log("ready - started server on url: https://" + localDomain + ":" + port);
    });
});