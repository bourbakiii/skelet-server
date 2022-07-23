export const response = {
    success(data, res) {
        res.status(200).json({success: true, code: 200, data});
        res.end();
    }, error(data, res) {
        res.status(data.status || 500).json({success: false, code: data.status || 500, data: data.data || null});
        res.end();
    },
    notFounded(data, res) {
        res.json({success: false, code: 404, data});
        res.end();
    },
    validationErrors(data, res) {
        res.status(422).json({
            success: false, code: 422, data: {
                message: 'Не передано одно из полей', errors: (data || [])
            }
        })
        ;
        res.end();
    },
    unathorized(res) {
        res.json({success: false, code: 401, data: {message: 'Для выполнения операции необходимо авторизоваться'}});
        res.end();
    }
}