
# MovieAPI

## Indices

* [API Reference / Endpoints](#api-reference/endpoints)

  * [Add favorites](#1-add-favorites)
  * [Get favorite movies](#2-get-favorite-movies)
  * [Get movies by keyword](#3-get-movies-by-keyword)
  * [Login registered user](#4-login-registered-user)
  * [Logout](#5-logout)
  * [Register user request](#6-register-user-request)


--------


## API Reference / Endpoints

#### Brief description of the endpoints the API provides:

### 1. Add favorites


This enpoint allows an authenticated user to add favorites movies to certain user, identified by its mail.

To send a request you'll need a **token**, **email**, and **movies**.

##### Example:


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/addFavorites
```



***Query params:***

| Key | Value |
| --- | ------|
| token | ioNmlO7WmDbDru43WnWP |



***Body:***

```js        
{
    "email": "juanasanchez@gmail.com",
    "movies": [
        {
            "adult": false,
            "backdrop_path": "/3RMbkXS4ocMmoJyAD3ZsWbm32Kx.jpg",
            "genre_ids": [
                28,
                12,
                18,
                878,
                53
            ],
            "id": 615658,
            "original_language": "en",
            "original_title": "Awake",
            "overview": "After a sudden global event wipes out all electronics and takes away humankind’s ability to sleep, chaos quickly begins to consume the world. Only Jill, an ex-soldier with a troubled past, may hold the key to a cure in the form of her own daughter. The question is, can Jill safely deliver her daughter and save the world before she herself loses her mind.",
            "popularity": 2327.953,
            "poster_path": "/1OTa0PfX2axMY8f9tFRSzESUgkC.jpg",
            "release_date": "2021-06-09",
            "title": "Awake",
            "video": false,
            "vote_average": 6.1,
            "vote_count": 550,
            "suggestionScore": 91
        },
        {
            "adult": false,
            "backdrop_path": "/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg",
            "genre_ids": [
                16,
                35,
                10751,
                14
            ],
            "id": 508943,
            "original_language": "en",
            "original_title": "Luca",
            "overview": "Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water’s surface.",
            "popularity": 2966.59,
            "poster_path": "/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
            "release_date": "2021-06-17",
            "title": "Luca",
            "video": false,
            "vote_average": 8.1,
            "vote_count": 3226,
            "suggestionScore": 90
        }
    ]
}
```



### 2. Get favorite movies


This enpoint allows a user to get his favorite movies.

To send a request you'll need the **token** and **email**. (The token must match the user email).

#### Example:


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:3000/getFavorites
```



***Query params:***

| Key | Value |
| --- | ------|
| token | qEJKqHrYHcpCr5mgm7WS |
| email | juanasanchez@gmail.com |



### 3. Get movies by keyword


This enpoint allows a user to get 20 movies filtered by keyword from TheMovieDB, in case no keyword is sent, the api will return the most popular 20 movies. 

To send a request you'll need the **token** and **keyword (optional)**.


#### Example:


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:3000/getMovies
```



***Query params:***

| Key | Value |
| --- | ------|
| token | qEJKqHrYHcpCr5mgm7WS |
| keyword | uruguay |



### 4. Login registered user


This enpoint allows a user to login and receive a token, access the next API endpoints

To send a request you'll need a **email**, and **password**.

#### Example:


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/login
```



***Body:***

```js        
{
    "email": "juanasanchez@gmail.com",
    "password": "password12345"
}
```



### 5. Logout


This enpoint allows a user to logout, invalidating the token sent.

To send a request you'll need the **token** only.

#### Example:


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/logout
```



***Query params:***

| Key | Value |
| --- | ------|
| token | qEJKqHrYHcpCr5mgm7WS |



### 6. Register user request


This enpoint allows a user to register himself, allowing him to login and access other API endpoints

To send a request you'll need a **email**, **firstName**, **lastName**, and **password**.

#### Example:


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/registerUser
```



***Body:***

```js        
{
    "email": "juanasanchez@gmail.com",
    "firstName": "Juana",
    "lastName": "Sanchez",
    "password": "password12345"
}
```



---
[Back to top](#api-reference--endpoints)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-07-27 12:22:28 by [docgen](https://github.com/thedevsaddam/docgen)
