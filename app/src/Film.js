import React, { Component } from 'react';

class Film extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: true,
      film: [],
      filmId: this.props.match.params.id,
      filmOrder: this.props.match.params.i
    }
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ film: res.data }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch(`/films/${this.state.filmId}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    } else {
      this.state.showLoader = false;
    }
    return body;
  };

  render() {
    const { film, filmOrder, showLoader } = this.state;
    let showDetails;

    if (showLoader) {
      showDetails = <div className="loader-wrapper"><div className="loader"></div></div>;
    } else {
      showDetails =
      <div className="details">
        <ul className="breadcrumbs">
          <li><a href="/">Home</a></li>
          <li><span>|</span></li>
          <li><span>{film.title}</span></li>
        </ul>
        <h2>{film.title} ({film.original_title})</h2>
        <span><b>Director:</b> {film.director}</span>
        <span><b>Producer:</b> {film.producer}</span>
        <span><b>Released Date:</b> {film.release_date}</span>
        <p>{film.description}</p>
        <span><b>Rating Score:</b> {film.rt_score}/100</span>
      </div>;
    }

    return (
      <section className="film-details">
        <div className={`film-hero film-${filmOrder}`}>
          <div className="image"></div>
          {showDetails}
        </div>

        <footer className="app-footer">
          <p>Copyright &copy; Studio Ghibli</p>
        </footer>
      </section>
    );
  }
}

export default Film;
