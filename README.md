# WebFinal
Final Project for CS4220 Current Trends in Web Design

To access the API since we are using Node.js, we need to install dotenv to read our .env file

    -- Install dotenv --
    In terminal: "npm install dotenv"

    -- Install MongoDB driver --
    In terminal: "npm install mongodb"

-- PROJECT REQUIREMENTS --
    package.json
        - includes standard project metadata
            - (name, version, autho, contributors, description)
        - define all required dependencies for the project
    
    server.js
        - set up an Express.js server
        - imports and uses routes defined in routes/<topic>.js and routes/history.js
        - establishes a connection to your team's own MongoDB Cloud Atlas database using a .env

    routes/<topic>.js
        - where <topic> matches the theme of the seleced API (ex: movies.js, books.js, etc.)
        - GET/<topic>
            - uses a query parameter to accept the keyword
            - interacts with the api.js to perform the to search by keyword and returns a JSON response
            - the JSON response should be minimal and clean, containing ONLY TWO KEYS for each item:
                - display: a readable display name associated with the keyword
                - identifier: the ID and/or value needed to perform future requests
            - saves unique search keywords to the MongoDB SearchHistoryKeyword collection
        - GET/<topic>/:id
            - uses a path parameter to accept a dynamic id
            - interacts with the api.js to perform the get data by id and returns a JSON response
    
    routes/history.js
        - GET/history
            - accepts a required query parameter type with the value keywords
                - handles validation if the type is not provided and is not keywords
            - if the value is keywords:
                - is able to retrieve all saved keywords from the SearchHistoryKeyword collection in MongoDB and return them in clean JSON format that does not include the Mongo _id
    
    services/api.js
        - same as the midterm
        - search API by keyword
            - accepts a keyword as an argument
            - sends a request to the selected API using the keyword
            - returns an array of search results
        - get detailed data by unique identifier
            - accepts an item's unique identifier (ID) as an argument
            - sends a request to the selected API to get detailed info on the itme
            - returns the detailed data
    
    services/db.js
        - the exact db.js file from cards-app-cli-with-mongo.zip
        - utilize this file to handle all interactions w/ your MongoDB Cloud Atlas in conjunction w/ your own .env

    .env
        - create a .env file w/ the following environment variables required to connect to your own MongoDB Cloud Atlas instance
            - DB_USER
            - DB_PASSWORD
            - DB_HOST
            - DB_NAME


    -- MIDTERM --
    cli.js
        - help menu
            - displayed when user runs "node cli.js --help"
            - clearly lists available commands and arguments w/ descriptions
        - search command
            - structure: node cli.js search <keyword>
            - <keyword>: any word that relates to API selection
            - passes keyword argument to corresponding func in app.js
        - history command
            - strcuture: node cli.js history keywords
            - validate argument is keywords
            - passes argument to corresponding func in app.js

    app.js
        - search functionality
            - searches API using provided keyword
            - saves keyword to search_history.json (only if unique)
            - displays list prompt with a clean, user-friendly list of search results to select
                - NOT raw JSON
            - gets and displays info for the selected item from API
                - NOT raw JSON

    history.js
        - history functionality
            - if argument is keywords
                - display a list promp of clean, user-friendly keyword history from search_history.json
                    - NOT raw JSON
                    - first option must be "Exit" to terminate app w/out proceeding
                - if user selects a keyword, follow a similar flow outline in "Search Functionality"