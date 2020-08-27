import React from "react";
import 'bulma/css/bulma.min.css';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faUndo} from "@fortawesome/free-solid-svg-icons";
import {toast} from "bulma-toast";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Books from "./Books";


class Create extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initState;

    }


    initState = {
        loading : false,
        title : '',
        author : '',
        year : '',
        description : ''
    }

    resetData = () =>{
        this.setState(() => this.initState);
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        })
    }

    booksList = () =>{
        return this.props.history.push("/books");
    }

    handleSubmit = (event) => {
        this.setState({
            loading : true
        })
        const book = {
            title : this.state.title,
            description: this.state.description,
            year : this.state.year
        }

        axios.post("http://localhost:8080/books", book)
            .then(response => {
                if(response.data != null){
                    //alert("book submited !");
                    toast({
                        message: "Book saved successfuly !",
                        type: "is-success",
                        duration: 3000,
                    });
                    this.resetData();
                }


            })
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
                                <input type="date" className="input" name="year" onChange={this.handleChange}/>
                            </div>
                            <div className="field control">
                                <button className="button is-primary">submit</button>
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

export default Create;