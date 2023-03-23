import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import Timeline from "../components/Timeline";
import axios from "axios";

const breadcrumb = [
  { name: "Dashboard", link: "/" },
  { name: "Linha do Tempo" },
];

class Home extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.getAllTasks();
  }

  async getAllTasks() {
    try {
      let res = await axios.get("http://localhost:3900/api/tasks");
      this.setState({ tasks: res.data });
    } catch (e) {
      console.log(e.response);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            <PageHeader title="Linha do Tempo" breadcrumb={breadcrumb} />
            <Timeline
              updateItems={() => this.getAllTasks()}
              tasks={this.state.tasks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
