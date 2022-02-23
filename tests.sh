echo "POST /api/auth\n"
curl -X 'POST' \
  'http://localhost:8080/api/auth' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "string",
  "password": "strings"
}'

echo "\n"
echo "GET /api/categories\n"
curl -X 'GET' \
  'http://localhost:8080/api/categories' \
  -H 'accept: application/json'

echo "\n"
echo "POST /api/categories\n"
curl -X 'POST' \
    'http://localhost:8080/api/categories' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "id": 0,
    "name": "string"
}'

echo "\n"
echo "GET /api/categories/1/products\n"
curl -X 'GET' \
  'http://localhost:8080/api/categories/1/products' \
  -H 'accept: application/json'

echo "\n"
echo "GET /api/categories/1\n"
curl -X 'GET' \
  'http://localhost:8080/api/categories/1' \
  -H 'accept: application/json'

echo "\n"
echo "PATCH /api/categories/1\n"
curl -X 'PATCH' \
  'http://localhost:8080/api/categories/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string"
}'

echo "\n"
echo "DELETE /api/categories/1\n"
curl -X 'DELETE' \
  'http://localhost:8080/api/categories/1' \
  -H 'accept: */*'
  
echo "\n"
echo "GET /api/countries\n"
curl -X 'GET' \
  'http://localhost:8080/api/countries' \
  -H 'accept: application/json'

echo "\n"
echo "POST /api/countries\n"
curl -X 'POST' \
  'http://localhost:8080/api/countries' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "countries_id": 0,
  "countries_name": "string"
}'

echo "\n"
echo "GET /api/countries/1\n"
curl -X 'GET' \
  'http://localhost:8080/api/countries/1' \
  -H 'accept: application/json'

echo "\n"
echo "PATCH /api/countries/1\n"
curl -X 'PATCH' \
  'http://localhost:8080/api/countries/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "countries_id": 0,
  "countries_name": "string"
}'

echo "\n"
echo "DELETE /api/countries/1\n"
curl -X 'DELETE' \
  'http://localhost:8080/api/countries/1' \
  -H 'accept: */*'

echo "\n"
echo "GET /api/orders\n"
curl -X 'GET' \
  'http://localhost:8080/api/orders' \
  -H 'accept: application/json'

echo "\n"
echo "POST /api/orders\n"
curl -X 'POST' \
  'http://localhost:8080/api/orders' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "orders_id": 0,
  "orders_name": "string",
  "orders_price": 0,
  "orders_desc": "string"
}'

echo "\n"
echo "GET /api/orders/1\n"
curl -X 'GET' \
  'http://localhost:8080/api/orders/1' \
  -H 'accept: application/json'

echo "\n"
echo "PATCH /api/orders/1\n"
curl -X 'PATCH' \
  'http://localhost:8080/api/orders/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "orders_id": 0,
  "orders_name": "string",
  "orders_price": 0,
  "orders_desc": "string"
}'

echo "\n"
echo "GET /api/products\n"
curl -X 'GET' \
  'http://localhost:8080/api/products' \
  -H 'accept: application/json'

echo "\n"
echo "GET /api/products?q=on\n"
curl -X 'GET' \
  'http://localhost:8080/api/products?q=on' \
  -H 'accept: application/json'

echo "\n"
echo "POST /api/products\n"
curl -X 'POST' \
  'http://localhost:8080/api/products' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "products_id": 0,
  "products_name": "string",
  "products_price": 0,
  "products_desc": "string"
}'

echo "\n"
echo "GET /api/products/1\n"
curl -X 'GET' \
  'http://localhost:8080/api/products/1' \
  -H 'accept: application/json'

echo "\n"
echo "PATCH /api/products/1\n"
curl -X 'PATCH' \
  'http://localhost:8080/api/products/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "products_id": 0,
  "products_name": "string",
  "products_price": 0,
  "products_desc": "string"
}'

echo "\n"
echo "DELETE /api/products/1\n"
curl -X 'DELETE' \
  'http://localhost:8080/api/products/1' \
  -H 'accept: */*'

echo "\n"
echo "GET /api/users\n"
curl -X 'GET' \
  'http://localhost:8080/api/users' \
  -H 'accept: application/json'

echo "\n"
echo "POST /api/users\n"
curl -X 'POST' \
  'http://localhost:8080/api/users' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "users_id": 0,
  "users_name": "string"
}'

echo "\n"
echo "GET /api/users/1\n"
curl -X 'GET' \
  'http://localhost:8080/api/users/1' \
  -H 'accept: application/json'

echo "\n"
echo "PATCH /api/users/1\n"
curl -X 'PATCH' \
  'http://localhost:8080/api/users/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "users_id": 0,
  "users_name": "string"
}'

echo "\n"
echo "DELETE /api/users/1\n"
curl -X 'DELETE' \
  'http://localhost:8080/api/users/1' \
  -H 'accept: */*'

echo "\n"
echo "GET /api/users/1/orders\n"
curl -X 'GET' \
  'http://localhost:8080/api/users/1/orders' \
  -H 'accept: application/json'