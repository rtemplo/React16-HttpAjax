import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

//this is a test of SCM

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount () {
    console.log(this.props);
    axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post, author: 'Ray'
                }
            });
            this.setState({posts: updatedPosts});
            // console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        });
  }

  postSelectedHandler = (id) => {
      //this.setState({selectedPostId: id});
      this.props.history.push('/posts/' + id);
      //this will also work
      //this.props.history.push({pathname: '/posts/' + id});
  }  

  render () {
    let posts = <p style={{textAlign: 'center'}}>Sorry! Something went wrong!</p>;
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            return (
                //<Link key={post.id} to={'/posts/' + post.id}>
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author} 
                        clicked={() => this.postSelectedHandler(post.id)} />
                //</Link>
            );
        });
    }

    return (
        <div>
            <section className="Posts">
                {posts}
            </section>      
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
        </div>
    );
  }
}

export default Posts;