export const healthCheck = (req, res) => {
    res.json({
        status: 'ok',
        service: 'backend',
        version: '1.0.0',
    });
};
