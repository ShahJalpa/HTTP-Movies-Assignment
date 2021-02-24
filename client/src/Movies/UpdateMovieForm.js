import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialMovieItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: ""
};

const UpdateMovieForm = ((props) => {
    const [movieItem, setMovieItem] = useState(initialMovieItem);

    const {id} = useParams();
    const {push} = useHistory();

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((response) => {
              console.log(response);
              setMovieItem(response.data);
          })
          .catch((error) => {
              console.error(error);
          })
    }, []);

    const changeHandler = (event) => {
        event.persist();
        let value = event.target.value;
        setMovieItem({...movieItem, [event.target.name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
           .put(`http://localhost:5000/api/movies/${id}`, movieItem)
           .then(response => {
               props.setMovieItem(response.data);
               push('/');
           })
           .catch(error => {
               console.error(error);
           })
    }

    return (
        <div className='updateMovie'>
            
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="movieTitle"
                    onChange={changeHandler}
                    placeholder='movie title'
                    value={movieItem.title}
                />

                <input 
                    type="text"
                    name="movieDirector"
                    onChange={changeHandler}
                    placeholder='movie director'
                    value={movieItem.director}
                />   

                <input 
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder='metascore'
                    value={movieItem.metascore}
                />  
                <button className="update-form">Update</button>  
                
            </form>
        </div>
    )
})

export default UpdateMovieForm;