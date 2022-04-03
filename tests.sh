curl -X 'POST' \
  'http://localhost:8080/api/auth' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "windesheim@docent.nl",
  "password": "1"
}'
curl -X 'GET' \
  'http://localhost:8080/api/categories' \
  -H 'accept: application/json'
curl -X 'POST' \
  'http://localhost:8080/api/categories' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string"
}'
curl -X 'GET' \
  'http://localhost:8080/api/categories/1/products' \
  -H 'accept: application/json'
curl -X 'GET' \
  'http://localhost:8080/api/categories/1' \
  -H 'accept: application/json'
curl -X 'PATCH' \
  'http://localhost:8080/api/categories/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string"
}'
curl -X 'DELETE' \
  'http://localhost:8080/api/categories/1' \
  -H 'accept: */*'
curl -X 'GET' \
  'http://localhost:8080/api/countries' \
  -H 'accept: application/json'
curl -X 'POST' \
  'http://localhost:8080/api/countries' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string"
}'
curl -X 'GET' \
  'http://localhost:8080/api/countries/1' \
  -H 'accept: application/json'
curl -X 'PATCH' \
  'http://localhost:8080/api/countries/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "name": "string"
}'
curl -X 'DELETE' \
  'http://localhost:8080/api/countries/1' \
  -H 'accept: */*'
curl -X 'GET' \
  'http://localhost:8080/api/orders' \
  -H 'accept: application/json'
curl -X 'POST' \
  'http://localhost:8080/api/orders' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "date": "string",
  "paid": 0,
  "shipped": 0
}'
curl -X 'PATCH' \
  'http://localhost:8080/api/orders/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "date": "string",
  "paid": 0,
  "shipped": 0
}'
curl -X 'GET' \
  'http://localhost:8080/api/products' \
  -H 'accept: application/json'
curl -X 'GET' \
  'http://localhost:8080/api/products?search=1' \
  -H 'accept: application/json'
curl -X 'POST' \
  'http://localhost:8080/api/products' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "string",
  "id": 0,
  "title": "string",
  "stock": 0,
  "price": 0,
  "desc": "string",
  "categories_id": 0
}'
curl -X 'GET' \
  'http://localhost:8080/api/products/1' \
  -H 'accept: application/json'
curl -X 'PATCH' \
  'http://localhost:8080/api/products/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "string",
  "id": 0,
  "title": "string",
  "stock": 0,
  "price": 0,
  "desc": "string",
  "categories_id": 0
}'
curl -X 'DELETE' \
  'http://localhost:8080/api/products/1' \
  -H 'accept: */*'
curl -X 'GET' \
  'http://localhost:8080/api/users' \
  -H 'accept: application/json'
curl -X 'POST' \
  'http://localhost:8080/api/users' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "password": "string0",
  "email": "string@string.nl",
  "firstname": "string",
  "infix": "string",
  "lastname": "string",
  "city": "string",
  "zipcode": "1234AB",
  "street": "string",
  "housenumber": "string",
  "newsletter": 0
}'
curl -X 'GET' \
  'http://localhost:8080/api/users/1' \
  -H 'accept: application/json'
curl -X 'PATCH' \
  'http://localhost:8080/api/users/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 0,
  "password": "string0",
  "email": "string@gmail.com",
  "firstname": "string",
  "infix": "string",
  "lastname": "string",
  "city": "string",
  "zipcode": "5678CD",
  "street": "string",
  "housenumber": "string",
  "newsletter": 0
}'
curl -X 'DELETE' \
  'http://localhost:8080/api/users/1' \
  -H 'accept: */*'
curl -X 'GET' \
  'http://localhost:8080/api/users/1/orders' \
  -H 'accept: application/json'