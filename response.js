export const response = {
    success(data, res) {
        res.json({success: true, code: 200, data});
        res.end();
    },
    notFounded(data, res) {
        res.json({success: false, code: 404, data});
        res.end();
    }
}