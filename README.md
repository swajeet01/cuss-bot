# cuss-bot
A Discord bot to have some fun with my friends
## Usage
A `config.json` file needs to be in source directory as-
```json
{
    "BOT_TOKEN": "---------------------------------",
    "OWNER_ID": "----------------"
}
```
Where `BOT_TOKEN` is private token of Discord bot and OWNER_ID is Discord ID
of bot owner, which will be used in `noCuss` array containing IDs of users
whom bot will refuse to cuss further more this user can use `no-cuss` command to
add users to `noCuss` array.

Run the script as `$ node index.js`
