import React from "react";
import timeline from "../assets/timeline";
import icoImg from "../assets/cd-icon-location.svg";
import iconTv from "../assets/img/tv.svg";
import iconBook from "../assets/img/book.svg";
import iconMoovie from "../assets/img/moovie.svg";
import axios from "axios";
import Spinner from "./Spinner";
import "./styles/Timeline.css";
import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

class Timeline extends React.Component {
  styles = {
    season: {
      margin: 0,
      fontWeight: "700",
    },
    spinner: {
      position: "fixed",
      zIndex: 1,
      right: 0,
      bottom: 0,
    },
  };

  state = {
    loading: false,
  };

  componentDidMount() {
    timeline();
  }

  renderemg(taskType) {
    if (taskType === "Série") {
      return <img src={iconTv} alt="imagem" />;
    } else if (taskType === "Livro") {
      return <img src={iconBook} alt="imagem" />;
    } else if (taskType === "Filme") {
      return <img src={iconMoovie} alt="imagem" />;
    } else {
      return <img src={icoImg} alt="imagem" />;
    }
  }

  async handleDelete(i) {
    this.setState({ loading: true });

    try {
      await axios.delete(`http://localhost:3900/api/tasks/${i._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      });
      this.props.updateItems();
      this.setState({ loading: false });
    } catch (e) {
      console.log(e.response);
      this.setState({ loading: false });
    }
  }

  async handleNextEpisode(e, item) {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3900/api/tasks",
        {
          name: item.name,
          description: item.description,
          taskType: "Série",
          dueDate: Date.now(),
          poster: item.poster,
          season: item.season,
          episode: ("0" + (parseInt(item.episode) + 1)).slice(-2),
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      );

      this.props.updateItems();
      this.setState({ loading: false });
    } catch (e) {
      console.log(e.response);
      this.setState({ loading: false });
    }
  }

  async handleNextSeason(e, item) {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3900/api/tasks",
        {
          name: item.name,
          description: item.description,
          taskType: "Série",
          dueDate: Date.now(),
          poster: item.poster,
          season: ("0" + (parseInt(item.season) + 1)).slice(-2),
          episode: "01",
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      );

      this.props.updateItems();
      this.setState({ loading: false });
    } catch (e) {
      console.log(e.response);
      this.setState({ loading: false });
    }
  }

  renderItems() {
    console.log(this.props);
    return this.props.tasks.map((i) => {
      let formatedDate = "";
      if (i.dueDate) {
        formatedDate = format(
          parseISO(i.dueDate),
          "'Dia' dd 'de' MMMM 'de' yyyy', às ' HH:mm'h'",
          { locale: pt }
        );
      }

      return (
        <div
          key={i.name + i.dueDate}
          className="cd-timeline__block js-cd-block"
        >
          <div className="cd-timeline__img cd-timeline__img--picture js-cd-img">
            {this.renderemg(i.taskType)}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="cd-timeline__content js-cd-content"
          >
            <div>
              <h3> {i.name} </h3>
              {i.taskType === "Série" ? (
                <div>
                  <p style={this.styles.season}>{`Temporada ${i.season}`}</p>
                  <p>{`Episódio ${i.episode}`} </p>
                </div>
              ) : (
                ""
              )}

              <p>{i.description}</p>
              <div>
                {i.taskType === "Série" ? (
                  <>
                    <a
                      onClick={(e) => this.handleNextEpisode(e, i)}
                      href="#"
                      className="btn btn-primary btn-block"
                    >
                      Próximo Episódio
                    </a>
                    <a
                      onClick={(e) => this.handleNextSeason(e, i)}
                      href="#"
                      className="btn btn-brand btn-block"
                    >
                      Próxima Temporada
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
              <span className="cd-timeline__date">{formatedDate}</span>
            </div>
            <img
              style={{ height: "160px", margin: "15px" }}
              src={i.poster}
              alt="desc img"
            />
            <i
              onClick={() => this.handleDelete(i)}
              style={{
                cursor: "pointer",
                margin: "0 10px",
                alignSelf: "flex-start",
              }}
              className="fas fa-window-close"
            ></i>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="cd-timeline js-cd-timeline">
        {this.state.loading && (
          <div style={this.styles.spinner}>
            <Spinner />
          </div>
        )}
        <div className="cd-timeline__container">{this.renderItems()}</div>
      </section>
    );
  }
}

export default Timeline;
