import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../../axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        console.log(this.props)
        this.loadData();
    }

    componentDidUpdate () {
        this.loadData();
    }

    loadData () {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
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
        let post = <p style={{textAlign: 'center'}}>Please select a post</p>;
        
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading ...</p>;
        }

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