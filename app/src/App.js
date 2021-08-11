import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';

class App extends Component {
  state = {
    films: []
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ films: res.data }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/films');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    const { films } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Studio Ghibli Films</h1>
        </header>

        <section className="films">
          {
            films.map((item, i) => (
              <div key={i} className={'film-'+ i}>
                <div className="image"></div>
                <div className="details">
                  <strong className="title">{item.title}</strong>
                  <p className="description">{item.description}</p>
                  <span>Released Date: {item.release_date}</span>
                  <span>Rating Score: {item.rt_score}/100</span>

                  <a href={`/film/${item.id}/${i}`} className="read-more">Read More...</a>
                </div>

              </div>
            ))
          }
        </section>

        <footer className="app-footer">
          <p>Copyright &copy; Studio Ghibli</p>
        </footer>
      </div>
    );
  }
}

export default App;
