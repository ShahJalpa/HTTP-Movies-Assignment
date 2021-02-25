import React, {useState} from 'react';
import axios from 'axios';

const initialMovieItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: ""
};

const AddMovie = () => {
    const [movieFormValue, setFormValues] = useState(initialMovieItem);

    const handleChange = (event) => {
        setFormValues({...movieFormValue, [event.target.name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const addNewMovie = {
            ...movieFormValue, stars: movieFormValue.stars.split(',')
        };

        axios
           .post('http://localhost:5000/api/movies', addNewMovie)
           .then((response) => {
               console.log(response);
               setFormValues(initialMovieItem);
           })
           .catch((error) => {
               console.log(error);
           })
    };

    return (
        <div>
            <h3>Add Movie</h3>
            <form className='addMovie' onSubmit={handleSubmit}>
                <div className='movieTitle'>
                    <input 
                        type='text'
                        name='title'
                        value={movieFormValue.title}
                        placeholder='Movie Title'
                        onChange={handleChange}
                    />

                    <input 
                        type='text'
                        name='director'
                        value={movieFormValue.director}
                        placeholder='Director'
                        onChange={handleChange}
                    />

                    <input 
                        type='text'
                        name='metascore'
                        value={movieFormValue.metascore}
                        placeholder='Metascore'
                        onChange={handleChange}
                    />

                    <input 
                        type='text'
                        name='stars'
                        value={movieFormValue.stars}
                        placeholder='Stars'
                        onChange={handleChange}
                    />

                    <button className='submit-button'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie;