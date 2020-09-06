This project was bootstrapped with React, Typescript, Redux, Redux-Persist, axios, lodash, Vanilla CSS

## Installing Dependencies

In the project root directory

### `yarn install`

## Available Scripts To Run The Projects

In the project root directory

### `yarn start`

## The Frontend

* The input fields on the middle of the page until you start typing in the search input field, You will find the input fields moved to the top left corner of the page .<br />

* The page shows loading while fetching the data from the Github api.<br />

* The page shows an error message if the request failed to load or API rate limit exceeded.<br />

* You can search for Users by typing their names in the search input field and select `Users` from the dropdown.<br />

* You can search for Repositories by typing the Repository name in the search input field and select `Repositories` from the dropdown.<br />

* You should type more than or equal to 3 characters to start calling the API and fetch the data.<br />

* Used debounce utility to enhance search performance by reducing the requests to the server.<br />

* If the user clears the input or types less than three characters, clear the results will be cleared and displaying an empty screen. <br />

* The data should be cached in the store and persisted via redux-persist.<br />

* On smaller screens (width <= 768px), the grid will be 2 columns<br />

### API Route

`https://api.github.com`

### API Endpoints

**`GET`** `/search/users?q=${keyword}+in:user`
To see all Users<br />

**`GET`** `/search/repositories?q=${keyword}`
To see all Repositories<br />
