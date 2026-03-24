# WebMidterm
Midterm Project for CS4220 Current Trends in Web Design

To access the API since we are using Node.js, we need to install dotenv to read our .env file

    -- Install dotenv --
    In terminal: "npm install dotenv"

    (it still needs to be imported to app.js)

-- PROJECT REQUIREMENTS --
    package.json
        - includes standard project metadata
            - (name, version, autho, contributors, description)
        - define all required dependencies for the project
    
    api.js
        - search API by keyword
            - accepts a keyword as an argument
            - sends a request to the selected API using the keyword
            - returns an array of search results
        - get detailed data by unique identifier
            - accepts an item's unique identifier (ID) as an argument
            - sends a request to the selected API to get detailed info on the itme
            - returns the detailed data
    
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