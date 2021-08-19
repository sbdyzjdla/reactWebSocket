import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ChatComponents from './components/ChatComponents';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          username:null
      };
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/api')
  //     .then(res=> res.json())
  //     .then(data=>this.setState({username:data.username}));
  // }
  

render() {
  const {username} = this.state;
  
  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path ="/" exact component = {ChatComponents}></Route>
          </Switch>
          <header className="App-header">
            {username ? `Hello ${username}` : '1'}
          </header>
        </BrowserRouter>
      </div>
  );
  ;
}
}

export default App;

