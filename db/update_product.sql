UPDATE products
SET
    name = $2,
    price = $3,
    img_url = $4
WHERE
    id = $1;