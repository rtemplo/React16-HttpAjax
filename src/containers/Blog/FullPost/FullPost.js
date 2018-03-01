import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../../axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        console.log(response);
                        this.setState({loadedPost: response.data});
                    });
            }
        }
    }

    deletePostHandler = (id) => {
        console.log(id);
        axios.delete('/posts/' + id)
            .then(response => {
                // console.log(response);
                this.setState({loadedPost: null});
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Loading ...</p>;

        if (this.state.loadedPost) {
            const {loadedPost} = this.state;
            
            post = (
                <div className="FullPost">
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={() => this.deletePostHandler(loadedPost.id)} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;