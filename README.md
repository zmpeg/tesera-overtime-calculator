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
    Overtime Accrued:    47.5
    Overtime Used (TIL): 42.5
    Vacation Used:       40
    Vacation Accrued:    80.9

    Overtime Balance:    5 hours
    Vacation Balance:    40.9 hours
