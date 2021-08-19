import React, { Component, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger  } from 'gsap/ScrollTrigger';
import logo from './images/logo.png';
import './App.css';

class App extends Component {
  state = {
    showLoader: true,
    films: []
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ films: res.data }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/films');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    } else {
      this.state.showLoader = false;
    }
    return body;
  };

  render() {
    const { films, showLoader } = this.state;

    function App() {
      gsap.registerPlugin(ScrollTrigger);

      gsap.config({
        nullTargetWarn: false,
      });

      useEffect(() => {
        const timeline = gsap.timeline();

        const timelineScroll = gsap.timeline({
          scrollTrigger: {
            trigger: ".app",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
          }
        });

        timeline.to('.app', {duration: 0, css: {visibility: 'visible'}});

        timelineScroll.fromTo('.films > div', { scale: 0 }, { scale: 1, duration: 1, ease: 'back', stagger: 0.5})
      });

      return <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Studio Ghibli Films</h1>
        </header>

        <ShowDetails />

        <footer className="app-footer">
          <p>Copyright &copy; Studio Ghibli</p>
        </footer>
    </div>
    }

    function ShowDetails() {

      if (showLoader) {
        return <div className="loader-wrapper"><div className="loader"></div></div>;
      } else {
        return <section className="films">
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
        </section>;
      }
    }

    return (
      <App />
    );
  }
}

export default App;
