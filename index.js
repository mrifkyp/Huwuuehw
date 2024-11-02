const express = require('express');
const axios = require('axios'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/pasteee', async (req, res) => { 
    const { url } = req.query;

    if (!url || !url.startsWith('https://paste.ee/p/')) { 
        return res.json({ "error": "You need a valid URL parameter" });
    }

    const pasteId = url.replace('https://paste.ee/p/', '');
    const rawUrl = `https://paste.ee/r/${pasteId}`;

    try {
        const response = await axios.get(rawUrl);
        res.json({ "result": response.data });
    } catch (error) {
        res.status(500).json({ "error": "Failed to fetch content" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
