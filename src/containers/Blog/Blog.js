import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios' ;

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId : null,
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                let posts = response.data;
                console.log(posts)
                posts.sort(function(a, b) {
                    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                //posts = posts.sort();
                console.log(posts)
                posts = posts.slice(0,4);
                console.log(posts)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts});
                console.log(updatedPosts)
            })

    }

    postSelectroHandler =(id) => {
        this.setState({selectedPostId: id})

    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post title={post.title}
                         author={post.author}
                         body={post.body}
                         key={post.id}
                         clicked ={() => this.postSelectroHandler(post.id)}/>;
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                    </section>
                <section>
                    <FullPost id = {this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;