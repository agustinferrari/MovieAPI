
# API Reference / Endpoints

#### Brief description of the endpoints the API provides:

## Indices

* [Ungrouped](#ungrouped)

  * [Add favorites](#1-add-favorites)
  * [Get favorite movies](#2-get-favorite-movies)
  * [Get movies by keyword](#3-get-movies-by-keyword)
  * [Login registered user](#4-login-registered-user)
  * [Logout](#5-logout)
  * [Register user request](#6-register-user-request)


--------


## Ungrouped



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

| Key | Value | Description |
| --- | ------|-------------|
| token | ioNmlO7WmDbDru43WnWP |  |



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
        },
        {
            "adult": false,
            "backdrop_path": "/8s4h9friP6Ci3adRGahHARVd76E.jpg",
            "genre_ids": [
                16,
                35,
                10751,
                878
            ],
            "id": 379686,
            "original_language": "en",
            "original_title": "Space Jam: A New Legacy",
            "overview": "When LeBron and his young son Dom are trapped in a digital space by a rogue A.I., LeBron must get them home safe by leading Bugs, Lola Bunny and the whole gang of notoriously undisciplined Looney Tunes to victory over the A.I.'s digitized champions on the court. It's Tunes versus Goons in the highest-stakes challenge of his life.",
            "popularity": 7153.206,
            "poster_path": "/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg",
            "release_date": "2021-07-08",
            "title": "Space Jam: A New Legacy",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 1230,
            "suggestionScore": 88
        },
        {
            "adult": false,
            "backdrop_path": "/AsqUSUqXrK8JfH8WEQnCXVbIAv6.jpg",
            "genre_ids": [
                878,
                53,
                27
            ],
            "id": 520763,
            "original_language": "en",
            "original_title": "A Quiet Place Part II",
            "overview": "Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path.",
            "popularity": 1448.823,
            "poster_path": "/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg",
            "release_date": "2021-05-21",
            "title": "A Quiet Place Part II",
            "video": false,
            "vote_average": 7.7,
            "vote_count": 2165,
            "suggestionScore": 86
        },
        {
            "adult": false,
            "backdrop_path": "/70AV2Xx5FQYj20labp0EGdbjI6E.jpg",
            "genre_ids": [
                80,
                28,
                53
            ],
            "id": 637649,
            "original_language": "en",
            "original_title": "Wrath of Man",
            "overview": "A cold and mysterious new security guard for a Los Angeles cash truck company surprises his co-workers when he unleashes precision skills during a heist. The crew is left wondering who he is and where he came from. Soon, the marksman's ultimate motive becomes clear as he takes dramatic and irrevocable steps to settle a score.",
            "popularity": 1903.109,
            "poster_path": "/M7SUK85sKjaStg4TKhlAVyGlz3.jpg",
            "release_date": "2021-04-22",
            "title": "Wrath of Man",
            "video": false,
            "vote_average": 7.9,
            "vote_count": 1560,
            "suggestionScore": 84
        },
        {
            "adult": false,
            "backdrop_path": "/yizL4cEKsVvl17Wc1mGEIrQtM2F.jpg",
            "genre_ids": [
                28,
                878
            ],
            "id": 588228,
            "original_language": "en",
            "original_title": "The Tomorrow War",
            "overview": "The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.",
            "popularity": 3297.608,
            "poster_path": "/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg",
            "release_date": "2021-06-30",
            "title": "The Tomorrow War",
            "video": false,
            "vote_average": 8.3,
            "vote_count": 2884,
            "suggestionScore": 82
        },
        {
            "adult": false,
            "backdrop_path": "/tehpKMsls621GT9WUQie2Ft6LmP.jpg",
            "genre_ids": [
                12,
                53,
                28,
                27,
                37
            ],
            "id": 602223,
            "original_language": "en",
            "original_title": "The Forever Purge",
            "overview": "All the rules are broken as a sect of lawless marauders decides that the annual Purge does not stop at daybreak and instead should never end as they chase a group of immigrants who they want to punish because of their harsh historical past.",
            "popularity": 5616.37,
            "poster_path": "/uHA5COgDzcxjpYSHHulrKVl6ByL.jpg",
            "release_date": "2021-06-30",
            "title": "The Forever Purge",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 577,
            "suggestionScore": 78
        },
        {
            "adult": false,
            "backdrop_path": "/5HjzYTihkH7EvOWSE7KcsF6pBMM.jpg",
            "genre_ids": [
                10751,
                35,
                12,
                16,
                14
            ],
            "id": 522478,
            "original_language": "en",
            "original_title": "Peter Rabbit 2: The Runaway",
            "overview": "Bea, Thomas, and the rabbits have created a makeshift family, but despite his best efforts, Peter can’t seem to shake his mischievous reputation. Adventuring out of the garden, Peter finds himself in a world where his mischief is appreciated, but when his family risks everything to come looking for him, Peter must figure out what kind of bunny he wants to be.",
            "popularity": 1617.292,
            "poster_path": "/cycDz68DtTjJrDJ1fV8EBq2Xdpb.jpg",
            "release_date": "2021-03-25",
            "title": "Peter Rabbit 2: The Runaway",
            "video": false,
            "vote_average": 7.3,
            "vote_count": 202,
            "suggestionScore": 63
        },
        {
            "adult": false,
            "backdrop_path": "/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg",
            "genre_ids": [
                28,
                12,
                53,
                878
            ],
            "id": 497698,
            "original_language": "en",
            "original_title": "Black Widow",
            "overview": "Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.",
            "popularity": 5750.009,
            "poster_path": "/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
            "release_date": "2021-07-07",
            "title": "Black Widow",
            "video": false,
            "vote_average": 8,
            "vote_count": 3337,
            "suggestionScore": 63
        },
        {
            "adult": false,
            "backdrop_path": "/pVNXmfZvQKFdUKVYNJxZAiy69DC.jpg",
            "genre_ids": [
                28,
                12
            ],
            "id": 529106,
            "original_language": "ru",
            "original_title": "Майор Гром: Чумной Доктор",
            "overview": "Igor Grom is a skilled policeman from St. Petersburg, known for his daring nature and uncompromising attitude towards the criminals of all kinds. Incredible strength, analytical mind and integrity – these qualities make Major Grom the perfect policeman. Working tirelessly, he always pushes through, and meets the challenges standing in the way.",
            "popularity": 1017.203,
            "poster_path": "/wnesEmcq7xdw1Rm1Bn6XEFTkenR.jpg",
            "release_date": "2021-04-01",
            "title": "Major Grom: Plague Doctor",
            "video": false,
            "vote_average": 7,
            "vote_count": 209,
            "suggestionScore": 60
        },
        {
            "adult": false,
            "backdrop_path": "/c0izdYdnTe4uMRifHgvTA85wPz0.jpg",
            "genre_ids": [
                28,
                80,
                27
            ],
            "id": 503736,
            "original_language": "en",
            "original_title": "Army of the Dead",
            "overview": "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble: venturing into the quarantine zone to pull off the greatest heist ever attempted.",
            "popularity": 1207.08,
            "poster_path": "/z8CExJekGrEThbpMXAmCFvvgoJR.jpg",
            "release_date": "2021-05-14",
            "title": "Army of the Dead",
            "video": false,
            "vote_average": 6.4,
            "vote_count": 2010,
            "suggestionScore": 56
        },
        {
            "adult": false,
            "backdrop_path": "/ok7RdHhVngnwkvKj09tvtOvypG.jpg",
            "genre_ids": [
                80,
                18,
                53,
                9648
            ],
            "id": 649409,
            "original_language": "en",
            "original_title": "No Sudden Move",
            "overview": "A group of criminals are brought together under mysterious circumstances and have to work together to uncover what's really going on when their simple job goes completely sideways.",
            "popularity": 1296.452,
            "poster_path": "/34BmdJkdvRweC3xJJFlOFQ2IbYc.jpg",
            "release_date": "2021-06-24",
            "title": "No Sudden Move",
            "video": false,
            "vote_average": 6.6,
            "vote_count": 128,
            "suggestionScore": 52
        },
        {
            "adult": false,
            "backdrop_path": "/xXHZeb1yhJvnSHPzZDqee0zfMb6.jpg",
            "genre_ids": [
                28,
                12,
                80,
                53
            ],
            "id": 385128,
            "original_language": "en",
            "original_title": "F9",
            "overview": "Dominic Toretto and his crew battle the most skilled assassin and high-performance driver they've ever encountered: his forsaken brother.",
            "popularity": 1923.049,
            "poster_path": "/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg",
            "release_date": "2021-05-19",
            "title": "F9",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 731,
            "suggestionScore": 47
        },
        {
            "adult": false,
            "backdrop_path": "/qi6Edc1OPcyENecGtz8TF0DUr9e.jpg",
            "genre_ids": [
                27,
                9648,
                53
            ],
            "id": 423108,
            "original_language": "en",
            "original_title": "The Conjuring: The Devil Made Me Do It",
            "overview": "Paranormal investigators Ed and Lorraine Warren encounter what would become one of the most sensational cases from their files. The fight for the soul of a young boy takes them beyond anything they'd ever seen before, to mark the first time in U.S. history that a murder suspect would claim demonic possession as a defense.",
            "popularity": 1094.102,
            "poster_path": "/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg",
            "release_date": "2021-05-25",
            "title": "The Conjuring: The Devil Made Me Do It",
            "video": false,
            "vote_average": 7.9,
            "vote_count": 3209,
            "suggestionScore": 41
        },
        {
            "adult": false,
            "backdrop_path": "/x9p2syPxeK2OYCpz35fsg0EFjlG.jpg",
            "genre_ids": [
                16,
                35
            ],
            "id": 834404,
            "original_language": "en",
            "original_title": "Teen Titans Go! See Space Jam",
            "overview": "The Teen Titans are visited by the Nerdlucks, the Space Jam villains who tried to capture Michael Jordan and the Looney Tunes. Astonished to discover his fellow Titans have never seen Space Jam, Cyborg organizes an exclusive watch party. Of course, if the Titans are watching a movie, don't expect silence to be golden. Raven and Starfire provide the commentary, Cyborg presents the fun facts, Beast Boy points out the butt shots, and Robin, but Robin doesn't trust their new alien friends. Are the Nerdlucks here to attend an innocent watch party, or do they have more sinister motives up their sleeves?",
            "popularity": 1643.381,
            "poster_path": "/j0pJ7e2ZGdzo9yEV7c6TLBue8Co.jpg",
            "release_date": "2021-06-20",
            "title": "Teen Titans Go! See Space Jam",
            "video": false,
            "vote_average": 7.3,
            "vote_count": 66,
            "suggestionScore": 31
        },
        {
            "adult": false,
            "backdrop_path": "/gX5UrH1TLVVBwI7WxplW43BD6Z1.jpg",
            "genre_ids": [
                16,
                35,
                12,
                10751
            ],
            "id": 459151,
            "original_language": "en",
            "original_title": "The Boss Baby: Family Business",
            "overview": "The Templeton brothers — Tim and his Boss Baby little bro Ted — have become adults and drifted away from each other. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again … and inspire a new family business.",
            "popularity": 4263.831,
            "poster_path": "/5dExO5G2iaaTxYnLIFKLWofDzyI.jpg",
            "release_date": "2021-07-01",
            "title": "The Boss Baby: Family Business",
            "video": false,
            "vote_average": 7.9,
            "vote_count": 894,
            "suggestionScore": 30
        },
        {
            "adult": false,
            "backdrop_path": "/zsH3iW60T1t2HBTtrSKzzxJ406J.jpg",
            "genre_ids": [
                16,
                35,
                10751
            ],
            "id": 846214,
            "original_language": "en",
            "original_title": "The Simpsons: The Good, the Bart, and the Loki",
            "overview": "Loki is banished from Asgard once again and must face his toughest opponents yet: the Simpsons and Springfield’s mightiest heroes. The God of Mischief teams up with Bart Simpson in the ultimate crossover event paying tribute to the Marvel Cinematic Universe of superheroes and villains.",
            "popularity": 1664.683,
            "poster_path": "/rtMdtzywcAGOrF6t8fbxJBqpdcq.jpg",
            "release_date": "2021-07-07",
            "title": "The Simpsons: The Good, the Bart, and the Loki",
            "video": false,
            "vote_average": 8,
            "vote_count": 295,
            "suggestionScore": 25
        },
        {
            "adult": false,
            "backdrop_path": "/wjQXZTlFM3PVEUmKf1sUajjygqT.jpg",
            "genre_ids": [
                878,
                28,
                53
            ],
            "id": 581726,
            "original_language": "en",
            "original_title": "Infinite",
            "overview": "Evan McCauley has skills he never learned and memories of places he has never visited. Self-medicated and on the brink of a mental breakdown, a secret group that call themselves “Infinites” come to his rescue, revealing that his memories are real.",
            "popularity": 2350.156,
            "poster_path": "/niw2AKHz6XmwiRMLWaoyAOAti0G.jpg",
            "release_date": "2021-06-10",
            "title": "Infinite",
            "video": false,
            "vote_average": 7.2,
            "vote_count": 542,
            "suggestionScore": 20
        },
        {
            "adult": false,
            "backdrop_path": "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
            "genre_ids": [
                35,
                80
            ],
            "id": 337404,
            "original_language": "en",
            "original_title": "Cruella",
            "overview": "In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs. She befriends a pair of young thieves who appreciate her appetite for mischief, and together they are able to build a life for themselves on the London streets. One day, Estella’s flair for fashion catches the eye of the Baroness von Hellman, a fashion legend who is devastatingly chic and terrifyingly haute. But their relationship sets in motion a course of events and revelations that will cause Estella to embrace her wicked side and become the raucous, fashionable and revenge-bent Cruella.",
            "popularity": 1756.111,
            "poster_path": "/rTh4K5uw9HypmpGslcKd4QfHl93.jpg",
            "release_date": "2021-05-26",
            "title": "Cruella",
            "video": false,
            "vote_average": 8.4,
            "vote_count": 4349,
            "suggestionScore": 17
        },
        {
            "adult": false,
            "backdrop_path": "/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
            "genre_ids": [
                28,
                14,
                12
            ],
            "id": 460465,
            "original_language": "en",
            "original_title": "Mortal Kombat",
            "overview": "Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.",
            "popularity": 1077.922,
            "poster_path": "/nkayOAUBUu4mMvyNf9iHSUiPjF1.jpg",
            "release_date": "2021-04-07",
            "title": "Mortal Kombat",
            "video": false,
            "vote_average": 7.5,
            "vote_count": 3381,
            "suggestionScore": 5
        }
    ]
}
```



### 2. Get favorite movies


This enpoint allows a user to get his favorite movies.

To send a request you'll need the **token** and **email**. (The token must match the user email).

##### Example:


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:3000/getFavorites
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| token | qEJKqHrYHcpCr5mgm7WS |  |
| email | juanasanchez@gmail.com |  |



### 3. Get movies by keyword


This enpoint allows a user to get 20 movies filtered by keyword from TheMovieDB, in case no keyword is sent, the api will return the most popular 20 movies. 

To send a request you'll need the **token** and **keyword (optional)**.


##### Example:


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: http://localhost:3000/getMovies
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| token | qEJKqHrYHcpCr5mgm7WS |  |
| keyword | uruguay |  |



### 4. Login registered user


This enpoint allows a user to login and receive a token, access the next API endpoints

To send a request you'll need a **email**, and **password**.

##### Example:


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

##### Example:


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/logout
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| token | qEJKqHrYHcpCr5mgm7WS |  |



### 6. Register user request


This enpoint allows a user to register himself, allowing him to login and access other API endpoints

To send a request you'll need a **email**, **firstName**, **lastName**, and **password**.

##### Example:


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
