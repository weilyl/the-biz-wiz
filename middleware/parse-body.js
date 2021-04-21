function parseBody(req) {
    const changes = Object.entries(req.body);

    let query = 'UPDATE entries SET';

    changes.forEach(([key, value], idx) => {
        if (idx!==changes.length-1) {
            query += ` ${key}=${value},`
        } else {
            query += ` ${key}=${value}`
        }
    })

    query += ` WHERE id=${req["business_id"]} AND user_id=${req.params.user_id} RETURNING *`

    return query
}