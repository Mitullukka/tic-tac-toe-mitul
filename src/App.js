import { useState } from 'react';
import './App.css';

function Square({value,onSquareClick}) {
  return (
    <button className='square' onClick={onSquareClick}>
     {value}
    </button>
  );
}

function Board({IsNext,squares,onPlay}){
  function handleClick(i){
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    if(IsNext){
      nextSquares[i] = 'X';
    }else{
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status;
  if(winner){
    status = 'Winner:' + winner;
  }else{
    status = 'Next player:' + (IsNext ? 'X' : 'O')
  }


  return(
    <>
    <div className='status'>{status}</div>
       <div className='board-row'>
        <Square className="square" value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square className="square" value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square className="square" value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div> 
      <>
      
    </>
    </>
  );
}

export default function Game(){
  const [history,setHistoy] = useState([Array(9).fill(null)])
  const [currentMove,setCurrentMove] = useState(0);
  const [gameOver,setGameOver] = useState(false);
  const IsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove + 1),nextSquares];
    setHistoy(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    if(calculateWinner(nextSquares) || nextHistory.length === 10)
      {
        setGameOver(true);
      }
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }


  // const moves = history.map((squares,move) => {
  //   let description;
  //   if(move > 0){
  //     description = 'Go to move #' + move
  //   }else{
  //     description = 'Go to game start';
  //   }

  //   return (
  //     <li key={move}>
  //       <button onClick={() => jumpTo(move)}>{description}</button>
  //     </li>
  //   )
  // });

  function restartGame(){
    setHistoy([Array(9).fill(null)])
    setCurrentMove(0)
    setGameOver(false);
  }

  return (
    <div className='game'>
      <div>
          <Board  IsNext={IsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>
      {
        gameOver && (
          <div className='game-over-overlay'>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        )
      }
      {/* <div className='game-info'>
        <ol>{moves}</ol>
      </div> */}
    </div>
  )

}


function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,6],
    [2,4,6]
  ];

  for(let i=0;i < lines.length;i++){
    const [a,b,c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null;
}


