export default async function handler(req, res) {
    const fetch = (await import('node-fetch')).default;
    const { dateFrom, dateTo, page, limit } = req.query;

    const url = `http://109.73.206.144:6969/api/stocks?dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&limit=${limit}&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API proxy error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}