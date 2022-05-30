# BoardCamp Api

CRUD API to manage a board game rental app. 

- Link to heroku deploy: https://projeto-15-boardcamp.herokuapp.com/

- The frontend repo for this api can be found at the link: https://github.com/bootcamp-ra/boardcamp-front

#
## About

This is an CRUD api which provides and handles all data and database operations of a board game app.

Below are the implemented endpoints:

- '/games' --> Methods: GET, POST
- '/categories' --> Methods: GET, POST
- '/customers' --> Methods: GET, POST
- '/customers/:id' --> Methods: GET, PUT
- '/rentals' --> Methods: GET, POST
- '/rentals/:id' --> Method: DELETE
- '/rentals/:id/return' --> Method: POST 

>Check section <a name="Endpoints details">Endpoint details</a> to know how to properly use each endpoint.

#
## Technologies
The following tools and frameworks were used in the construction of the project:<br>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23000000.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

#
## How to run

1. Clone the front-end repository at https://github.com/bootcamp-ra/boardcamp-front
2. Run `npm install` in the front-end repository (there might be some vulnerabilitie messages in the front-end repository)
3. In the front-end repository, change the `baseURL` at the `src/services/api/api.js` to match the deployed <b>boardcamp-api</b> url: https://projeto-15-boardcamp.herokuapp.com/

</br> 

* <p>From localhost url:</p>
```javascript
14  const instance = axios.create({
15    baseURL: "http://localhost:4000/",
16  });
```
- <p>To the <b>boardcamp-api</b> url, deployed on Heroku:</p>
```javascript
14  const instance = axios.create({
15    baseURL: "https://projeto-15-boardcamp.herokuapp.com/",
16  });
```
4. Run the front-end with 
```bash
npm start
```
> If you get an error, try running `npm audit fix --force` in the front-end repository before running this command

5. You can optionally build the project running
```bash
npm run build
```
6. Finally access http://localhost:3000 on your browser to start using the app
7. Check the [Endpoint details](#endpoints-details) section in order to learn what each one of the endpoints does, and how to properly use them.

#
## Endpoints details
<br>

### ``` Method: GET, Route: '/games' ```

> Fetch all registered games on the database and return them as an array of objects with the following structure:

```javascript
[
    {
      id: 1,
      name: "Game 1",
      image: "https://image1.png",
      stockTotal: 1,
      categoryId: 1,
      pricePerDay: 100
    },
    {
      id: 2,
      name: "Game 2",
      image: "https://image2.png",
      stockTotal: 2,
      categoryId: 2,
      pricePerDay: 200
    }
    ,
    {...}
    ,
    {
      id: n,
      name: "Game n",
      image: "https://imagen.png",
      stockTotal: n,
      categoryId: n,
      pricePerDay: n
    }
]
```

#
### ``` Method: POST, Route: '/games' ```

> Add a new game to the database.
The game must be provided in the request body, as an object, following the structure:

```javascript
{
  name: "string",
  image: "string",
  categoryID: "string",
  pricePerDay: "number",
  stockTotal: "number"
}
```

  `-> GAME VALIDATION:`

* `all: required`
* `image: must be a valid url`
* `categoryID: must match the id of an existing category`
* `pricePerDay: must be an integer, converted into cents (i.e. $1.99 = 199)`
* `stockTotal: must be an integer`

#
### ``` Method: GET, Route: '/categories' ```

> Fetch all registered games on the database and return them as an array of objects with the following structure:

```javascript
[
    {
      id: 1,
      name: "Category 1"
    },
    {
      id: 2,
      name: "Category 2"
    }
    ,
    {...}
    ,
    {
      id: n,
      name: "Category n"
    }
  ]
```

#
### ``` Method: POST, Route: '/categories' ```

> Add a new category to the database.
The category name must be provided in the request body, inside an object, following the structure:
```javascript
{
  name: "string"
}
```

`-> CATEGORY VALIDATION:`
  * `name: required`
  * `name: must be different from registered categories`


#
### ``` Method: GET, Route: '/customers' ```

> Fetch all registered customers on the database and return them as an array of objects with the following structure:

```javascript
[
  {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
  },
  {
    id: 2,
    name: 'Maria Alfreda',
    phone: '21998899221',
    cpf: '12345678910',
    birthday: '1994-12-25'
  },
  {...}
]
```

#
### ``` Method: GET, Route: '/customers/:id' ```
> Receives an id from url params and fetch a single registered customer with the same id. Return them as a JSON object with the following structure:
  ```javascript
  {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
  }
  ```

#
### ``` Method: POST, Route: '/customers' ```

> Add a new customer to the database.
All customer data must be provided in the request body, inside an object, following the structure:
```javascript
{
  {
    name: "string",
    phone: "string",
    cpf: "string",
    birthday: date
  }
}
```

`-> CUSTOMER VALIDATION:`
  * `all: required`
  * `phone: must be a valid phone number, with 10 or 11 digits`
  * `cpf: must be a valid CPF, with 11 digits`
  * `cpf: must be different from all registered customers CPF values`
  * `birthday: must be a valid date`

#
### ``` Method: PUT, Route: '/customers/:id' ```

  > Update a customer with the given id.
  All customer data must be provided in the request body, inside an object, following the structure:
```javascript
{
  {
    name: "string",
    phone: "string",
    cpf: "string",
    birthday: date
  }
}
```

`-> CUSTOMER VALIDATION:`
  * `all: required`
  * `phone: must be a valid phone number, with 10 or 11 digits`
  * `cpf: must be a valid CPF, with 11 digits`
  * `cpf: must be different from all registered customers CPF values`
  * `birthday: must be a valid date`



#
### ``` Method: GET, Route: '/rentals' ```

> Fetch all registered rentals on the database and return them as an array of objects with the following structure:

```javascript
[
  {
    id: 1,
    customerId: 1,
    gameId: 1,
    rentDate: '2021-06-20',
    daysRented: 3,
    returnDate: null,
    originalPrice: 4500,
    delayFee: null,
    customer: {
     id: 1,
     name: 'João Alfredo'
    },
    game: {
      id: 1,
      name: 'Banco Imobiliário',
      categoryId: 1,
      categoryName: 'Estratégia'
    }
  },
  {...}
]
```

#
### ``` Method: POST, Route: '/rentals' ```

> Add a new rental to the database.
All rental data must be provided in the request body, inside an object, following the structure:

```javascript
{
  customerId: number,
  gameId: number,
  daysRented: number
}
```

`-> RENTAL VALIDATION`
  * `all: required`
  * `customerId: must be an integer`
  * `customerId: must match the id of an existing customer`
  * `gameId: must be an integer`
  * `gameId: must match the id of an existing game`
  * `daysRented: must be an integer`
  * `daysRented: must be greater than 0`

#
### ``` Method: POST, Route: '/rentals/:id/return' ```

> Receives an id from url params and close the rental with the given id.
Updates the `returnDate` and calculates the `delayFee` from the rental in the database.

<br>

`-> RENTAL VALIDATION:`
  * `id: must match the id of an existing rental`

#
### ``` Method: DELETE, Route: '/rentals/:id' ```

> Receives an id from url params and delete the rental with the given id.
Delete the rental only if it's `returnDate` field is not `null`.

<br>

`-> RENTAL VALIDATION:`
  * `id: must match the id of an existing rental`
  * `returnDate from the matching rental must not be null`