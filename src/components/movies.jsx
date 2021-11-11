import React from 'react';
import { getMovies } from '../services/fakeMovieService'
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService'



class Movies extends React.Component {
    state = {
        movies: [], //It's good to initialize them with an empty array because you want everything else to be rendered before calling an API or in thi case the fake services
        genres: [],
        pageSize: 4,
        currentPage: 1
    }

    componentDidMount(){
        const genres = [{ name: "All Genres" }, ...getGenres() ]//Just adding "All Genres" option to the list
      this.setState({ movies: getMovies(), genres: genres })  
    }

    handleDelete = movie => { //this movie parameter comes from the map. So when click, we pass a movie  with all its properties to this function
       const movies = this.state.movies.filter(m => m._id !== movie._id); 
       //Creating a new movie list exept (!==) the one with the _id we get passed
       this.setState({movies: movies }); //This will overwrite the state above with the new list with out one
    }

    handleLike = (movie) =>{
        const movies = [...this.state.movies]; //Clone the movies state
        const index = movies.indexOf(movie); //Find the index of clicked object(movie)

        //console.log(movies) // (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        //console.log(index) // Just a number

        movies[index] = {...movies[index]}; //Clone ALL the properties not just the index 

        //console.log(movies[index]); // We get the whole object {_id: '5b21ca3eeb7f6fbccd471815', title: 'Terminator', genre: {…}, numberInStock: 6, dailyRentalRate: 2.5, …}
        
        movies[index].liked = !movies[index].liked; //just change or toggle the liked property(if it's true it become false otherwise if it is false it become true)
        
        

        this.setState({ movies : movies}) //Finally pass the new movies array to state

    }

    handlePageChange = page => {
        console.log("This is the current page" , page);
        this.setState({currentPage : page})
    };

    handleGenreSelect = genre => {
        console.log(" The genre is: " , genre)
        this.setState({ selectedGenre: genre });
    }

    render() { 
        //OBJECT DESTRUCTURING
        const { length: count } = this.state.movies //this.state.movies.length passed to constant length, and at the same time renaming lenght to count 
        if(count === 0){
            return(<p>There are no movies in the database</p>)
        }
        //else is implied here so it will rend the list is length us bigger than zero

        //Filter before pagination
        /* const  filtered = this.state.selectedGenre && this.state.selectedGenre._id ? this.state.movies.filter(m => m.genre._id === this.state.selectedGenre._id)
        : this.state.movies */

        //const newMoviesPaginated = paginate(this.state.movies, this.state.currentPage, this.state.pageSize)
        
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                    items={this.state.genres} 
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}                 
                    //valueProperty="_id" /* This is to make the component more flexible in case the input have a different name, so now this 2 properties will determine the name of the target property */
                   // textProperty="name" /* same as above //DELETED BECAUSE I'M USING DEFAULT PROPS IN THE COMPONENT */
                    />
                </div>

                <div className="col"> {/* Right colum */}
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
                    {this.state.movies.map(movie => ( //{this.state.movies.map(movie =>... First solution
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
            <Pagination 
            itemsCount={count} 
            pageSize={this.state.pageSize} 
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage} />

                </div>            
            </div>
        );
    }
}
 
export default Movies;