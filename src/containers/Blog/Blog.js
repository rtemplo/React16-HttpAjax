import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';


const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            {/* <li><Link to="/new-post">New Post</Link></li> */}
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>                            
                        </ul>
                    </nav>
                </header>

                {/* <Route path="/" exact render={() => <Posts />} /> */}
                {/* <Route path="/" exact component={Posts} /> */}
                <Switch>
                    {/* example of a route guard - auth set to true so it is not enforced*/}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null};
                    <Route path="/posts" component={Posts} /> 
                    {/* how to handle 404's */}
                    <Route render={() => <h1>Not Found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;