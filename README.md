# Ultimate Tic Tac Toe

Tic Tac Toe is a very simple game; select 3 tiles in a row and beat your opponent! However,
ultimate Tic Tac Toe plays off of that and makes it a little more complicated; simply enough,
you play Tic Tac Toe inside of Tic Tac Toe. First, select the square you would like to play
Tic Tac Toe in. The winner of the Tic Tac Toe in that game claims that tile in the upper
Tic Tac toe. Whoever wins the upper Tic Tac Toe, wins the game!

The winner of the lower Tic Tac Toe gets to choose the next tile to play inside of, however
the other player gets the first move in the lower Tic Tac Toe.

However, if the game is a draw, the tile becomes a wildcard, meaning that tile can be used
for either player to win!

## Example Flow

-   Player 1 Starts Game
-   Player 1 will choose the tile to start the game
-   Player 2 then makes the first move.
-   If player 2 wins, they get to claim the tile in
-   The upper Tic Tac Toe, and choose the next tile to play in
-   It will be Player 1's turn inside the lower Tic Tac Toe

# Structure

Each tile will be given an id based on their location. They will be able to access a context
which they can set certain tile data using their id.

Id's will look like this on the board:

| tic | tac | toe |
| --- | --- | --- |
| 0   | 1   | 2   |
| 3   | 4   | 5   |
| 6   | 7   | 8   |

When we want to reference a tile inside a tile, simply put the higher tile id first, then
the second id directly next to it.

For example, if you wanted to reference tile 1 inside of 0, just do '01'. In the future, if we
decide to expand the board, these values will use the hex system; once id's go over 9, to keep them
at one char in length, we'll use letters instead of numbers (a, b, c...). This means that the max
size for a board will be 36.

## Setting settings

When setting settings there has to be a system that manages minimums and maximums, as
well as rules for each setting. This is where the SettingValuesManager comes in.

This file will contain a function called "parseChanges". You'll pass in all changes
as an object, and the rules as a second parameter. `parseChanges` will go through
each key, and check the corresponding rule to make sure that the value is acceptable;
if not, it will remove the values from `newChanges` (newChanges is a duplicate of
changes).

The rules will be an array of all possible keys of `changes`, and their possible
values. Each value will be an object called `Rule`. `Rule` will be an abstract class,
and have a method called `test`, that will test if the new value follows the `rule`
set. To make a new Rule, `Rule` will have different class implementations.
For example, `minMax`, which will create a rule that makes
sure the new value is in between the minimum and maximum.

After all changes have been made and implemented, the program will go through all
rules where their corresponding values have not been changed, and it will run the
`adjust` function. This will allow all rules to process any necessary side effects.

The `adjust` function will return any necessary change side effects. These changes
are grouped together and applied to the data exactly like how `parseChanges` adds
any new changes; it topologically sorts them, and runs the `test` function.

Because there is the possibility that when processing side effects an infinite loop
may occur, the system will store how many times each key is updated. If a key is
updated 3 times, an error will raise stating that there was an infinite cycle
discovered, and it will dump a list of all changes that were processed to cause the 
cycle.

## Game State

Settings will first be stored and manipulated inside its own context before the game
starts. Once the settings have been finalized, and the user starts the game, we switch
to the game page, which will have the GameManager Context defined inside.

To initialize the GameManager context, you'll pass a function called "initializeGameManager"
that'll take the current state of the settings, and it'll return the starting state for
the game.

```typescript
const { settings } = useSettings();
const [gameManager, gameManagerDispatch] = useReducer(
    gameManagerReducer,
    initializeGameManager(settings),
);
```

`initializeGameManager` will simply take the current set settings, and make an initial
game state based on the info.

## Player Claims/Player Index

Players will have a zero-based index. If a tile is -1, this means
it was a wildcard game.

## Multiplayer

There will be a gameManager component that will pass the game context, which will allow
you to interact with the server or your own singleplayer game.

If the game is singleplayer, it'll pass a normal variable with data and a dispatccher
function for a reducer to interact with game data.

However, if the game is using a server, the dispatch will be a function passed to the
lower children. The lower children will use it exactly like the original reducer, but
the parent will send the reducer dispatch arguments to the server instead.

When the server responds, it will respond with the updates that need to be made to
the data on the client, instead of an entirely new object to save clients from doing
unnecessary rerenders.

Child of gameManager context component ->

```typescript
gameStateDispatch({ type: "click", tileId: "23" });
```

inside gameState ->

```typescript
const gameStateDispatch = (action: GameStateActionType) => {
    socket.emit("gameInteraction", action);
};
```

inside gameState on server response ->

```typescript
socket.on("gameInterResponse", (data: Partial<GameStateDataType>) => {
    // ... Append data changes to gameInter ...
    setGameState(newData);
});
```
