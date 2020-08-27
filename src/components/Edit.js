import React from "react";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {toast} from "bulma-toast";


class Edit extends React.Component {

  constructor(props) {
      super(props);

      this.state = this.initState;


      this.getBook();

  }

  initState = {
      loading : false,
      id : '',
      title : '',
      description : '',
      year : '',
      author : ''
  }

  getBook(){
      //const bookId = +this.props.params.id;
      //alert(bookId);
      const bookId = this.props.match.params.id;
      axios.get("http://localhost:8080/books/"+bookId)
          .then(response => {
               const book = response.data;
               this.setState({
                   id : book.id,
                   title : book.title,
                   description : book.description,
                   year : book.year
               })
          });
  }

    handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
          [name] : value
      })
    }

    resetData = () => {
      this.setState(() => this.initState);
  }

  handleSubmit = (event) => {
      const book = {
          id : this.state.id,
          title : this.state.title,
          description : this.state.description,
          year : this.state.year
      }

      this.setState({
          loading : true
      })

      axios.put(`http://localhost:8080/books/${this.state.id}`, book)
          .then(response => {
              if(response.data != null){
                  toast({
                      message: "Book updated successfuly !",
                      type: "is-warning",
                      duration: 3000,
                  });

                  this.setState({
                      loading : false
                  })
              }
          });

      event.preventDefault();
  }



  render() {
      return(
          <div className="column is-8 is-offset-2 card card-content mt-6 has-background-black-bis">
              <form onSubmit={this.handleSubmit}>
                  <div className="columns">
                      <div className="column">
                          <div className="field control">
                              <label className="has-text-white">Title</label>
                              <input value={this.state.title} type="text" className="input" name="title" onChange={this.handleChange}/>
                          </div>
                          <div className="field control">
                              <label className="has-text-white">Year</label>
                              <input value={this.state.year} type="date" className="input" name="year" onChange={this.handleChange}/>
                          </div>
                          <div className="field control">
                              <button className="button is-primary">update</button>
                              <p className="button is-info ml-2" onClick={this.resetData}>
                                  <FontAwesomeIcon icon={faUndo}/>
                              </p>
                              {this.state.loading? <p className="button is-loading ml-3"></p>:''}
                          </div>
                      </div>
                      <div className="column">
                          <div className="field control">
                              <label className="has-text-white">Author</label>
                              <input value={this.state.author} type="text" className="input" name="author" onChange={this.handleChange}/>
                          </div>
                          <div className="field control">
                              <label className="has-text-white">Description</label>
                              <input value={this.state.description} type="text" className="input" name="description" onChange={this.handleChange}/>
                          </div>
                      </div>
                  </div>

              </form>
          </div>
      );
  }

}

export default Edit;