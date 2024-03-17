import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: 'YOUR_PUBLISH_KEY',
  subscribeKey: 'YOUR_SUBSCRIBE_KEY',
});

const Multiplayer = () => {
  const [room, setRoom] = useState('room1'); // Default room

  const [gameState, setGameState] = useState({
    player1Deck: [], // Player 1's deck of cards
    player2Deck: [], // Player 2's deck of cards
  });

    useEffect(() => {
    // Subscribe to specific game channel
    pubnub.subscribe({ channels: [room] });

    // Event listener for receiving game state updates
    pubnub.addListener({
      message: (message) => {
        setGameState(message.message);
      },
    });

    // Initialize the game state
    pubnub.publish({
      channel: room,
      message: gameState,
    });

    // Clean up subscription on component unmount
    return () => pubnub.unsubscribeAll();
  }, [room, gameState]);

      const startGame = () => {
    // Implement game start logic here
    const player1Deck = [];
    const player2Deck = [];

    // Distribute cards to players
    // Push cards to player1Deck and player2Deck arrays

    // Publish the updated game state
    pubnub.publish({
      channel: room,
      message: { player1Deck, player2Deck },
    });
  };

  return (
    <div>
      <h1>Multiplayer Card Game</h1>
      <label>
        Room:
        <input 
          type="text" 
          value={room} 
          onChange={(e) => setRoom(e.target.value)} 
        />
      </label>
      <button onClick={startGame}>Start Game</button>
      {/* Display game state here */}
    </div>
  );
};

export default Game;
/*Step 2: Add Room Selection
Now, you have an input field where players can type in the room they want to join. This room will be used to create a separate PubNub channel for each game room.

Step 3: Create Separate Rooms
When a player creates a room, they will be in their own isolated game. Other players can join the same room by typing in the same room name. When a player starts the game, the game state will be published to that specific room's channel.

Keep in mind that this is a basic implementation. Depending on your requirements, you might want to add features like a lobby, multiple players per room, etc.

Remember to replace 'YOUR_PUBLISH_KEY' and 'YOUR_SUBSCRIBE_KEY' with your actual PubNub API keys.

Test the application by opening it in multiple tabs or browsers and joining different rooms.*/



/*
User
and then a component or function to create a room

ChatGPT
To create a room, you can implement a separate component or function in your React application. Here's an example of how you can do it:

Step 1: Create a Room Creation Component
jsx
Copy code*/
import React, { useState } from 'react';

const RoomCreation = ({ onRoomCreate }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    onRoomCreate(roomName);
    setRoomName('');
  };

  return (
    <div>
      <h2>Create a Room</h2>
      <input 
        type="text" 
        value={roomName} 
        onChange={(e) => setRoomName(e.target.value)} 
        placeholder="Enter room name" 
      />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default RoomCreation;
/*Step 2: Integrate Room Creation Component
In your Game component, integrate the RoomCreation component:

jsx
Copy code*/
import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import RoomCreation from './RoomCreation';

const pubnub = new PubNub({
  publishKey: 'YOUR_PUBLISH_KEY',
  subscribeKey: 'YOUR_SUBSCRIBE_KEY',
});

const Game = () => {
  const [room, setRoom] = useState('room1');
  const [gameState, setGameState] = useState({
    player1Deck: [],
    player2Deck: [],
  });

  useEffect(() => {
    pubnub.subscribe({ channels: [room] });

    pubnub.addListener({
      message: (message) => {
        setGameState(message.message);
      },
    });

    pubnub.publish({
      channel: room,
      message: gameState,
    });

    return () => pubnub.unsubscribeAll();
  }, [room, gameState]);

  const startGame = () => {
    const player1Deck = [];
    const player2Deck = [];

    pubnub.publish({
      channel: room,
      message: { player1Deck, player2Deck },
    });
  };

  const createRoom = (newRoomName) => {
    setRoom(newRoomName);
  };

  return (
    <div>
      <h1>Multiplayer Card Game</h1>
      <label>
        Room:
        <input 
          type="text" 
          value={room} 
          onChange={(e) => setRoom(e.target.value)} 
        />
      </label>
      <button onClick={startGame}>Start Game</button>
      <RoomCreation onRoomCreate={createRoom} />
    </div>
  );

}