import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component 
{
  constructor(){
    console.log("constructor execute")
    super();
    this.state={
      user:[],
      friends:[]
    };
  }

  componentDidMount(){
    console.log("ComponentDidMount execute");
    axios.get('https://api.github.com/users/HunterStevens')
    .then(res =>{
      console.log("fetched api: ", res);
      this.setState({
        user:res.data
      });
      console.log("new User state: ",this.state.user)
    })
    .catch(err =>{
      console.log("ERROR: ", err)
    })

    axios.get(`${this.state.user.followers_url}`)
    .then(res=>{
      console.log("Followers Api grabbed", res)
      this.setState({
        friends:res.data
      })
      console.log("new Friends state: ",this.state.friends)
    })
    .catch(err=>{
      console.log("ERROR: ",err)
    })
  }

  componentDidUpdate(){
    console.log("ComponentDidUpdate execute");

  }

  changePage = () =>{
    axios.get(`${this.state.friends.url}`)
     .then(res =>{
       console.log('new page api:', res.data)
       this.setState({
         user:res.data
       })
     })
     .catch(err =>{
       console.log("ERROR: ",err)
     })
  }

  componentWillUnmount(){
    console.log("ComponentWillUnMount execute");
  }

  render(){
    console.log("render execute")
      return (
        <div className="App">
        <header className="App-header">
      <h1> {this.state.user.login}</h1>
      <img src={this.state.user.avatar_url}/>
      <h3>{this.state.user.url}</h3>
        </header>

        <h1>Followers</h1>
        {this.state.friends.map(peeps=>{
         return(
         <div onClick={this.changePage} key={peeps.id}>{peeps.login}
         <img src={peeps.avatar_url} width='200px'/>
         </div>
         ) 
        })}
      </div>
    );
  }
}

export default App;
