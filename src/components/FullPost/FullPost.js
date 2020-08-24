import React, { Component } from 'react';
import axios from 'axios'
import './FullPost.css';

class FullPost extends Component {
    state = {
        post: null,
    }
    componentDidUpdate() {
       
        if (this.props.id){
            if ( !this.state.post || (this.state.post && this.props.id !== this.state.post.id)){ //no infinity loop check
                axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
            .then((response) => {
                let post = response.data;
                console.log('post', post)
                const updatedPost = post
                this.setState({post: updatedPost});
                console.log('updatedpost',updatedPost)
        })
            }
            
    }}
    deletePostHandler= () =>{ 
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
        .then((response) => {
            console.log(response);
        })
    }

    
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>
        }
        if (this.state.post){
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <p>{this.state.post.userId}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;