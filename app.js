const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { getEncoded, getData, saveIPFS, readIPFS } = require('./middleware/gencert');
const sendRequest = require('ipfs-api/src/utils/send-request');

const app = express();

app.set('view engine', 'ejs');

app.listen(3005);

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/issue', (req, res) => {
    res.render('issue');
});

app.post('/issue', upload.single('pdfFile'), async(req, res) => {
    const pdf = req.file;
    const pdfPath = pdf.path;

    // const encoded = getEncoded(req, res);
    // res.render('signcert', { encoded });

    saveIPFS(req, res, "./"+pdfPath).then((ipfsHash) => {
        const encoded = getEncoded(req, res, ipfsHash);
        res.render('signcert', { encoded });
    });
    //console.log("in main: " + ipfsHash);
    // res.send();
});

app.get('/verify', (req, res) => {
    res.render('verify');
});

app.post('/verify', (req, res) => {
    getData(req, res).then((cert) => {
        res.render('cert', { cert });
    });
})

app.post('/download', (req, res) => {
    readIPFS(req, res).then((content) => {
        res.contentType("application/pdf");
        res.send(content);
    });
})