# Calculate Overtime vs Time In Lieu

## Installation

    git clone git@github.com:zmpeg/tesera-overtime-calculator.git
    cd tesera-overtime-calculator
    nvm use
    npm install

## Config

Copy `sample.env` to `.env`. Set the variables in `.env`. Dates are formatted YYYYMMDD. You can find your userid in the address bar when you login to harvest normally.

    cp sample.env .env
    "${EDITOR:-vi}" .env


## Run

    $ node calculate.js
    Overtime: 44.5
    TIL: 47
    You are at: -2.5
