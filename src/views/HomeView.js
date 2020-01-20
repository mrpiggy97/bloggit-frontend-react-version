import React from 'react'
import PostInfo from '../components/PostInfo'
import './css/HomeView.css'

class HomeView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [
                {
                    owner: {username: 'fabian jesus rivas', profile_pic: null},
                    date: 'today',
                    title: 'this is the title',
                    text: 'this is the text',
                    communities: ['test'],
                    likes: 1,
                    liked: null,
                    reported: null,
                    uuid: 'adsadqwewe'
                },
                {
                    owner: {username: 'chris', profile_pic: null},
                    date: 'today',
                    title: 'this is the title',
                    text: 'this is the text',
                    communities: ['test'],
                    likes: 1,
                    liked: null,
                    reported: null,
                    uuid: 'adsadssssqwewe'
                }
            ]
        }
    }

    render(){
        return(
            <div id="home-view">
                {this.state.posts.map(post => {
                    return <PostInfo info={post} isPreview={true} key={post.uuid}/>
                })}
            </div>
        )
    }
}

export default HomeView