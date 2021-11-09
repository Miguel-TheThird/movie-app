import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'
import Like from './common/like';


class Movies extends React.Component {
    state = {
        movies: getMovies()
    }

    handleDelete = movie => { //this movie parameter comes from the map. So when click, we pass a movie  with all its properties to this function
       const movies = this.state.movies.filter(m => m._id !== movie._id); 
       //Creating a new movie list exept (!==) the one with the _id we get passed
       this.setState({movies: movies }); //This will overwrite the state above with the new list with out one
    }

    handleLike = (movie) =>{
        const movies = [...this.state.movies]; //Clone the movies state
        const index = movies.indexOf(movie); //Find the index of clicked object(movie)

        console.log(movies) // (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        console.log(index) // Just a number

        movies[index] = {...movies[index]}; //Clone ALL the properties not just the index 

        console.log(movies[index]); // We get the whole object {_id: '5b21ca3eeb7f6fbccd471815', title: 'Terminator', genre: {…}, numberInStock: 6, dailyRentalRate: 2.5, …}
        
        movies[index].liked = !movies[index].liked; //just change or toggle the liked property(if it's true it become false otherwise if it is false it become true)
        
        

        this.setState({ movies : movies}) //Finally pass the new movies array to state

    }

    render() { 
        //OBJECT DESTRUCTURING
        const { length: count } = this.state.movies //this.state.movies.length passed to constant length, and at the same time renaming lenght to count 
        if(count === 0){
            return(<p>There are no movies in the database</p>)
        }
        //else is implied here so it will rend the list is length us bigger than zero
        return (
            <React.Fragment>
            <p>Showing {count} movies in the database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map(movie => (
                        <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                        <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            </React.Fragment>
        );
    }
}
 
export default Movies;