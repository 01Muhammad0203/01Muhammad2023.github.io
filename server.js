const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-report', (req, res) => {
    const report = req.body;
    const filePath = path.join(__dirname, 'report.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }

        let reports = [];
        if (data) {
            reports = JSON.parse(data);
        }

        reports.push(report);

        fs.writeFile(filePath, JSON.stringify(reports, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing file' });
            }

            res.status(200).json({ message: 'Report saved successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
