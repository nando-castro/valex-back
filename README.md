# valex-back-api
# Description
​
Valex simulates an API that manages a benefit card, generally made available by companies to their employees.
​
## Features
​
-   Create cards
-   Activate / Block / Unblock cards
-   Recharges card
-   purchase payments
​
## API Reference
​
### Get card info
​
```http
GET /card/view
```
​
#### Request:
​
| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**. user full name       |
| `number`         | `string` | **Required**. card number          |
| `expirationDate` | `string` | **Required**. card expiration date |
​
`Number Format: "1111 1111 1111 1111"`
​
`Expiration Date Format: "MM/YY"`
​
​
### &nbsp; ‣ &nbsp; Create a card
​
```http
POST /card/create
```
​
#### Request:
​
##### Body
#
```json
{
  "employeeId": "1",
  "cardType": "education"
}
```
​
`Valid types: [groceries, restaurant, transport, education, health]`
​
##### Headers
#
```json
{
  "Content-Type": "application/json",
  "x-api-key": "API-key"
}
```
​
#### Response:
#
```json
{
	"number": "1111 1111 1111 1111",
	"cardholderName": "NAME N NAME",
	"securityCode": "111",
	"expirationDate": "01/27",
	"isVirtual": false,
	"isBlocked": false,
	"type": "card type",
	"cvc": "111"
}
```
#
| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |          Created           |          `data: {}`           |
|   **401**   |     Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |
​
### &nbsp; ‣ &nbsp; Activate a card
​
```http
POST /card/:cardId/activate
```
​
#### Request:
​
##### Body
#
```json
{
  "cardId": "3",
  "securityCode": "616",
  "password": "1234"
}
```
#
##### Headers
#
```json
{
  "Content-Type": "application/json"
}
```
​
#### Response:
​
| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          OK           |
|   **404**   |       Not Found       | `error: { message }` |
|   **422**   |     Unprocessable Entity     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |


### &nbsp; ‣ &nbsp; Block a card
​
```http
PUT /card/:cardId/block
```
​
#### Request:
##### Body
#
```json
{
  "password": "1234"
}
```
​
#### Response:
#
| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          OK           |
|   **404**   |       Not Found       | `error: { message }` |
|   **422**   |     Unprocessable Entity     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |
​
### &nbsp; ‣ &nbsp; Unblock a card
​
```http
PUT /card/:cardId/unblock
```
​
#### Request:
##### Body
#
```json
{
  "password": "1234"
}
```
​
#### Response:
#
| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          OK           |
|   **404**   |       Not Found       | `error: { message }` |
|   **422**   |     Unprocessable Entity     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |

​
### &nbsp; ‣ &nbsp; Balance a card
​
```http
POST /card/balance/:cardId
```
​
#### Request:
#
`Card Id params`
​
#### Response:
#
```json
{
  "balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
}
```
​
### &nbsp; ‣ &nbsp; View a card
​
```http
POST /card/view/
```
​
#### Request:

#
```json
{
    employeeId: 5,
    cardType: "education"
    password: "1234"
}
```

`Valid types: [groceries, restaurant, transport, education, health]`
​
#### Response:
```json
{
 "cards": [{
  "number": 5595 5595 5595 5595,
  "cardholderName": "FULANO N SILVA",
	"expirationDate": "04/30",
  "securityCode": "397"
 }]
}
```
​
### &nbsp; ‣ &nbsp; Recharge a card
​
```http
POST /recharge/:cardId
```
​
#### Request:
#
`Card Id params`
​
#### Response:
#
| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          OK           |
​

### &nbsp; ‣ &nbsp; Card Payment Purchase
​
```http
POST /purchase
```
​
#### Request:
```json
{
    cardId: number,
    password: string,
    businessId: number
    amount: number
  }
  ```
​
#### Response:
| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          OK           |
​

## Environment Variables
​
To run this project, you will need to add the following environment variables to your .env file
​
`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`
​
`PORT = number #recommended:5000`
​
`SECRET_KEY = any string`
​
## Run Locally
​
Clone the project
​
```bash
  git clone https://github.com/user/projeto18-valex
```
​
Go to the project directory
​
```bash
  cd projeto18-valex/
```
​
Install dependencies
​
```bash
  npm install
```
​
Create database
​
```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```
​
Start the server
​
```bash
  npm run start
```
​
