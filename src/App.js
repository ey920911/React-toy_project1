import React, { Component } from "react";

// 사용자 정의 태그 2
/**
 *  1. HTML
 *  2. CSS
 *  3. JavaScript
 */
class TOC extends Component {
  render() {
    let list = [];
    for (let i = 0; i < this.props.data.length; i++) {
      let data = this.props.data[i];
      list.push(
        <li key={data.id}>
          <a
            href={data.id + ".html"}
            onClick={function (id, ev) {
              ev.preventDefault();
              this.props.onSelect(data.id);
            }.bind(this, data.id)}
          >
            {data.title}
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ol>{list}</ol>
      </nav>
    );
  }
}

// 사용자 정의태그3
/*
 ** description들 출력
 */
class Content extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.data.title}</h2>
        {this.props.data.desc}
      </article>
    );
  }
}

//사용자 정의 태그 1
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>
          <a
            href="/"
            onClick={function (ev) {
              ev.preventDefault();
              this.props.onClick();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}
class ContentCreate extends Component {
  state = {
    title: "",
    desc: "",
  };

  changeFormHandler(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    return (
      <article>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            console.log("test2 : " + this.state);
            this.props.onSubmit(this.state);
          }}
        >
          <p>
            <input
              name="title"
              type="text"
              placeholder="title"
              value={this.state.title}
              onChange={this.changeFormHandler.bind(this)}
            ></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={this.changeFormHandler.bind(this)}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

class App extends Component {
  last_content_id = 3;
  state = {
    mode: "read",
    selected_content_id: 2,
    contents: [
      { id: 1, title: "HTML", desc: "HTML is for information" },
      { id: 2, title: "CSS", desc: "CSS is for design" },
      { id: 3, title: "JavaScript", desc: "JavaScript is for interaction" },
    ],
  };

  getSelectedContents() {
    //map으로 변환해보기
    // contents.map(

    // );
    for (let i = 0; i < this.state.contents.length; i++) {
      let data = this.state.contents[i];
      if (this.state.selected_content_id === data.id) {
        return data;
      }
    }
  }
  getContentComponent() {
    if (this.state.mode === "read") {
      return <Content data={this.getSelectedContents()}></Content>;
    } else if (this.state.mode === "welcome") {
      console.log("welcome mode!!");
      return <Content data={{ title: "Welcome", desc: "Hello React" }}></Content>;
    } else if (this.state.mode === "create") {
      return (
        <ContentCreate
          onSubmit={(formData) => {
            console.log(formData);
            this.last_content_id = this.last_content_id + 1;
            formData.id = this.last_content_id;
            let newContents = Object.assign([], this.state.contents); //Object 얕은 복제
            newContents.push(formData);
            this.setState({
              mode: "read",
              selected_content_id: this.last_content_id,
              contents: newContents,
            });
          }}
        ></ContentCreate>
      );
    }
  }
  getControlComponent() {
    return [
      <a
        key="1"
        href="/create"
        onClick={(ev) => {
          ev.preventDefault();
          this.setState({ mode: "create" });
        }}
      >
        create
      </a>,
      <a
        key="2"
        href="/update"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        update
      </a>,
      <input
        key="3"
        type="button"
        href="/delete"
        value="delete"
        onClick={function () {
          let newContents = this.state.content.filter(
            function (e1) {
              if (e1.id !== this.state.selected_content_id) {
                return e1;
              }
            }.bind(this)
          );

          this.setState({
            contents: newContents,
            mode: "welcome",
          });
        }.bind(this)}
      ></input>,
    ];
  }
  render() {
    return (
      <div className="App">
        <Subject
          onClick={function (ev) {
            this.setState({
              mode: "welcome",
            });
            console.log("eytest: " + this.state.mode);
          }.bind(this)}
          title="WEB"
          sub="world wide web"
        ></Subject>
        <TOC
          onSelect={function (id) {
            console.log("App", id);
            //this.state.selected_content_id = id;
            // console.log(this.state.selected_content_id);
            this.setState({
              selected_content_id: id,
              mode: "read",
            });
            //this.state.selected_content_id = id;
            console.log("selected content id: " + this.state.selected_content_id);
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        {this.getControlComponent()}
        {this.getContentComponent()}
      </div>
    );
  }
}

export default App;
