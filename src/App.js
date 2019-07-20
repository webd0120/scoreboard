import React from 'react';
import logo from './logo.svg';
import './App.css';

const Header = ({title, totalPlayers}) => {
  // 객체 해체 할당
  return (
      <header className='header'>
        <h1 className='h1'>{title}</h1>
        <span className='stats'>Players: {totalPlayers}</span>
      </header>
  )
};

const Player = ({name, score, removePlayer, id}) => {
  return (
      <div className="player">
            <span className="player-name">
                <button className="remove-player" onClick={() => removePlayer(id)}>x</button>
              {name}
            </span>
        <Counter score={score}/>
      </div>
  );
}

// class 함수 사용시 반드시 new를 통해 선언해줘야함. 함수 호출이 불가능함.
// 변수는 반드시 this를 통해 참조함.
// extends 는 특정 component의 모든 요소를 상속받을 때 사용함.
class Counter extends React.Component {
  // 1. 시간에 따라 변하는 데이터는 state라는 모델로 정의
  // 2. state를 변경하는 방법은 setState() 밖에 없다.
  // 3. setState()는 merge(overwriting)
  // 4. setState()는 비동기로 처리된다.
  state = {
    score: 0
  };

  // 생성자를 사용해서 변수에 저장하는경우
  /*constructor() {
      super(); // 부모의 생성자를 호출해서 물려받은 속성을 초기화함.
      this.state = {
          score: 0
      }
  }*/

  /*changeScore() {
      // 자바스크립트는 function이 독립적으로 존재할 수 있기때문에 아래의 this로는 현재 Counter를 참조할 수 없다.
      // console.log('incrementScore: ', this);
      // 문법적으로는 문제 없지만 state의 값을 변경할 수 있는건 setState() 뿐이다.
      // this.state.score += 1;
      // 올바른 state 변경을 위해서는 반드시 setState()를 사용해야함.
      this.setState({score: this.state.score + 1});
  }*/

  // arrow function 안에 쓰이는 this는 lexical this
  changeScore = (delta) => {
    // this.setState({score: this.state.score + delta});
    this.setState(prevState => {
      return ({score: prevState.score + delta});
    });
  };

  // class 함수 작성시 render 함수를 반드시 사용하여 return 해야함.
  // 이벤트 우측에는 함수 선언문이 와야함.  ()를 사용하는 경우 호출한 결과값이 불러와지기 때문에 ()를 제거.
  // 이러한 경우 때문에 React를 선언형 스타일이라고 함.
  render() {
    return (
        <div className="counter">
          <button className="counter-action decrement" onClick={() => this.changeScore(-1)}> -</button>
          <span className="counter-score">{this.state.score}</span>
          {/* bind(this)를 통해 현재 this 참조가능 */}
          <button className="counter-action increment" onClick={() => this.changeScore(1)}> +</button>
        </div>
    )
  }
}

// const Counter = (props) => (
//     <div className="counter">
//         <button className="counter-action decrement"> -</button>
//         <span className="counter-score">{props.score}</span>
//         <button className="counter-action increment"> +</button>
//     </div>
// );

class App extends React.Component {
  state = {
    players: [
      {name: 'LDK', score: 30, id: 1},
      {name: 'HONG', score: 40, id: 2},
      {name: 'KIM', score: 50, id: 3},
      {name: 'PARK', score: 60, id: 4}
    ]
  };

  render() {
    return (
        <div className="scoreboard">
          <Header title="My Scoreboard" totalPlayers={11}/>
          {
            this.state.players.map((player) =>
                <Player name={player.name} score={player.score} id={player.id} key={player.id}
                        removePlayer={this.handleRemovePlayer}/>)
          }
        </div>
    );
  }

  handleRemovePlayer = (id) => {
    // 자식을 삭제하는 로직
    this.setState(prevState => ({
      players: prevState.players.filter(player => player.id !== id)
    }))
  }
}

export default App;
