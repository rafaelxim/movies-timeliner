import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import PageHeader from "../components/PageHeader";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

const breadcrumb = [
  { name: "Dashboard", link: "/" },
  { name: "Cadastrar Atividade" },
];
const styles = {
  listGroup: {
    flexDirection: "row",
    overflow: "auto",
  },
  poster: {
    width: "100px",
  },
  selectedPoster: {
    width: "145px",
    border: "9px solid #0e0c28",
  },
  suggestionContainer: {
    cursor: "pointer",
  },
  suggestionTitle: {
    maxWidth: "100px",
    heigth: "50px",
  },
};

class CreateTask extends React.Component {
  state = {
    nomeDaAtividade: null,
    nomeDaAtividadeClass: "form-control",
    selectTipo: "Série",
    descAtividade: "",
    season: "",
    episode: "",
    dataCriacao: Date.now(),
    loading: false,
    suggestions: [],
    poster: null,
  };

  handleTaskName = async (e) => {
    this.setState({ nomeDaAtividade: e.target.value });

    if (
      this.state.selectTipo === "Série" ||
      this.state.selectTipo === "Filme"
    ) {
      // Busca api imdb
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${e.target.value}&apikey=ae0534a`
      );
      console.log(res.data);
      if (res.data.Response === "True") {
        this.setState({ suggestions: res.data.Search });
      }
    } else {
      const resBooks = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}`
      );

      if (resBooks.data.totalItems > 0) {
        // this.setState({suggestions : res.data.Search});

        let booksTemp = resBooks.data.items.map((i) => {
          return {
            imdbID: i.id,
            Title: i.volumeInfo.title,
            Poster: i.volumeInfo.imageLinks
              ? i.volumeInfo.imageLinks.thumbnail
              : null,
          };
        });

        this.setState({ suggestions: booksTemp });
      }
    }
  };
  handleSeason = (e) => {
    this.setState({ season: e.target.value });
  };

  handleEpisode = (e) => {
    this.setState({ episode: e.target.value });
  };

  handleType = (e) => {
    this.setState({ selectTipo: e.target.value });
  };
  handleDesc = (e) => {
    this.setState({ descAtividade: e.target.value });
  };

  handleData = (e) => {
    this.setState({ dataCriacao: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let nameOK = false;
    // Valida nome da atividade
    if (this.state.nomeDaAtividade && this.state.nomeDaAtividade !== "") {
      nameOK = true;
      this.setState({ nomeDaAtividadeClass: "form-control is-valid" });
    } else this.setState({ nomeDaAtividadeClass: "form-control is-invalid" });

    if (nameOK) {
      this.setState({ loading: true });
      // axios
      try {
        await axios.post(
          "http://localhost:3900/api/tasks",
          {
            name: this.state.nomeDaAtividade,
            description: this.state.descAtividade,
            taskType: this.state.selectTipo,
            dueDate: this.state.dataCriacao,
            poster: this.state.poster,
            season: this.state.season,
            episode: this.state.episode,
          },
          {
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token"),
            },
          }
        );

        this.props.history.push("/");
      } catch (e) {
        console.log(e.response);
        this.setState({ loading: false });
      }
    }
  };

  pickSuggestion = (suggestion) => {
    console.log(suggestion.Poster);
    this.setState({
      nomeDaAtividade: suggestion.Title,
      poster: suggestion.Poster,
    });
  };

  checkSelectedPoster(title) {
    if (this.state.nomeDaAtividade === title) {
      return styles.selectedPoster;
    }

    return styles.poster;
  }

  renderSuggestions() {
    return this.state.suggestions.map((s) => {
      return (
        <li
          onClick={() => this.pickSuggestion(s)}
          style={styles.suggestionContainer}
          key={s.imdbID}
          className="list-group-item"
        >
          <div className="text-truncate" style={styles.suggestionTitle}>
            {s.Title}
          </div>
          <img
            style={this.checkSelectedPoster(s.Title)}
            src={s.Poster}
            alt="imgDesc"
          />
        </li>
      );
    });
  }

  renderSeasonEpisode() {
    return this.state.selectTipo === "Série" ? (
      <>
        {" "}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
          <label htmlFor="temporada">Temporada</label>
          <input
            onChange={this.handleSeason}
            type="text"
            className="form-control"
            id="temporada"
          />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
          <label htmlFor="episodio">Episódio</label>
          <input
            onChange={this.handleEpisode}
            type="text"
            className="form-control"
            id="episodio"
          />
        </div>
      </>
    ) : (
      ""
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            <PageHeader title="Criar Atividade" breadcrumb={breadcrumb} />

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <h5 className="card-header">
                    Preencha o formulário a seguir:
                  </h5>
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                          <label htmlFor="input-select">Tipo</label>
                          <select
                            onChange={this.handleType}
                            className="form-control"
                            id="input-select"
                          >
                            <option value="Série">Série</option>
                            <option value="Filme">Filme</option>
                            <option value="Livro">Livro</option>
                          </select>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                          <label htmlFor="title">Nome da Atividade</label>
                          <DebounceInput
                            value={this.state.nomeDaAtividade}
                            debounceTimeout={500}
                            className={this.state.nomeDaAtividadeClass}
                            onChange={this.handleTaskName}
                            id="title"
                            placeholder="Nome"
                          />
                          <div className="valid-feedback">Certinho!</div>
                          <div className="invalid-feedback">
                            Preecha um título!
                          </div>
                          <div className="card">
                            <h5 className="card-header">Recomendados:</h5>
                            <div className="card-body">
                              <ul
                                className="list-group list-group-flush"
                                style={styles.listGroup}
                              >
                                {this.renderSuggestions()}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                          <label htmlFor="descAtividade">
                            Descrição da Atividade
                          </label>
                          <input
                            onChange={this.handleDesc}
                            type="text"
                            className="form-control"
                            id="descAtividade"
                            placeholder="Descrição"
                          />
                        </div>

                        {this.renderSeasonEpisode()}

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                          <label htmlFor="datef">Data</label>
                          <input
                            onChange={this.handleData}
                            type="date"
                            className="form-control"
                            id="datef"
                          />
                        </div>

                        <div
                          style={{ marginTop: 20 }}
                          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
                        >
                          {this.state.loading ? (
                            <Spinner />
                          ) : (
                            <button className="btn  btn-primary" type="submit">
                              Cadastrar Atividade
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTask;
