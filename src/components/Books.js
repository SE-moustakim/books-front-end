import React from "react";
import axios from 'axios';
import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "bulma-toast";
import {Link} from "react-router-dom";


class Books extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            books : [],
            allBooks : [],
            currentPage : 1,
            booksPerPage : 5,
            currentBooks : [],
            firstIndex : 0
        }

       this.getBooks();
    }

    getBooks(){
        axios.get(`http://localhost:8080/books`)
            .then( response =>{
                    const books = response.data._embedded.books;
                    console.log(books);
                    this.setState({
                        books: books,
                        currentBooks : books.slice(this.state.firstIndex, this.state.firstIndex + 5)
                    });
                }

            )
    }

    deleteBook = (bookId) => {
        //alert(bookId);
        axios.delete("http://localhost:8080/books/"+bookId)
            .then(response => {
                console.log(response.data);
                if(response.data != null){
                    toast({
                        message: "Book deleted successfuly !",
                        type: "is-danger",
                        duration: 3000,
                    });
                    this.getBooks();
                }

            });
    }

    editBook = (bookId) =>{
    }

    getPage = (page) => {
        this.setState({
            currentPage : page,
            firstIndex : (page - 1) * 5
            //currentBooks : this.state.books.slice((page - 1) * 5, (page - 1) * 5 + 5)
        })

        this.getBooks();
    }

    nextPage = () => {
        this.setState({
            currentPage : this.state.currentPage + 1,
            firstIndex : (this.state.currentPage) * 5
            //currentBooks : this.state.books.slice((this.state.currentPage) * 5, (this.state.currentPage) * 5 + 5)
        })

        this.getBooks();
    }

    prevPage = () => {
        this.setState({
            currentPage : this.state.currentPage - 1,
            firstIndex : (this.state.currentPage - 2) * 5
            //currentBooks : this.state.books.slice((this.state.currentPage) * 5, (this.state.currentPage) * 5 + 5)
        })

        this.getBooks();
    }



    render() {

        const totalPages = Math.ceil(this.state.books.length / 5);
        const pages = [];
        for(let i=1; i<=totalPages; i++) {
            pages.push(i);
        }

        return(

          <div className="column is-8 is-offset-2">
              <div className="card">
                  <header className="card-header has-background-dark">
                      <p className="card-header-title has-text-white">
                          <FontAwesomeIcon icon={faList}/><p className="ml-3">Books</p></p>
                  </header>
                  <div className="card-content">
                      <table className="table is-fullwidth is-narrow">
                          <thead>
                          <tr>
                              <th>Book</th>
                              <th>Description</th>
                              <th>Author</th>
                              <th>Year</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              this.state.currentBooks.map(book =>
                                  <tr key={book.id}>
                                      <td>{book.title}</td>
                                      <td>{book.description}</td>
                                      <td></td>
                                      <td>{book.year}</td>
                                      <td>
                                          <Link to={"/edit/"+book.id}><FontAwesomeIcon icon={faEdit} className="mr-1 selected"/></Link>
                                          <FontAwesomeIcon icon={faTrash} className="selected" onClick={this.deleteBook.bind(this, book.id)}/>
                                      </td>
                                  </tr>
                              )
                          }
                          </tbody>

                      </table>
                      <div className="is-pulled-right">
                          <nav className="pagination is-small" role="navigation">
                              <ul className="pagination-list">
                                  {
                                      this.state.currentPage==1?
                                      <li className="pagination-link selected" disabled>prev</li>
                                      :<li className="pagination-link selected" onClick={this.prevPage}>prev</li>
                                  }
                                  {
                                      pages.map(page =>

                                          page==this.state.currentPage?
                                              <li className="pagination-link selected is-current" key={page} onClick={this.getPage.bind(this, page)}>{page}</li>
                                              :<li className="pagination-link selected" key={page} onClick={this.getPage.bind(this, page)}>{page}</li>

                                      )
                                  }
                                  {
                                      this.state.currentPage==totalPages?
                                      <li className="pagination-link selected" disabled>next</li>
                                      :<li className="pagination-link selected" onClick={this.nextPage}>next</li>
                                  }
                              </ul>
                          </nav>
                      </div>
                      <div className="has-text-white">.</div>
                  </div>
              </div>

          </div>
        );
    }

}

export default Books;