import React from 'react'
import { connect } from 'react-redux'
import { sortNested } from '../store/actions'
import '../assets/css/posts.css'



const Posts = ({ posts }) => {
    //console.log(posts)
    if(!posts) {
        return <div></div>
    }

    //const c = sortNested('acf', 'order', posts)
    
    return posts.map((post, i) => {

        //strange method to make alternating styles
        let j = i % 2 === 0 ? 1 : 3;
        
        let mediaURL = ""
        if(post._embedded["wp:featuredmedia"]) {
            mediaURL = post._embedded["wp:featuredmedia"][0].source_url || ""
        }

        if(parseInt(post.acf.columns) === 2) {
            console.log('2 columns!')
            return (
                <section key={i} id={i} className={`wrapper special style${j}`}>
                    <div className="inner">
                        <section className="spotlights">
                            <section>
                                <h2>{post.acf.title}</h2>
                                <span className="image"><img src={mediaURL} alt="" /></span>
                            </section>
                            <section>
                                <p dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                            </section>
                        </section>
                    </div>
                </section>
            )
        } else {
            return (
                <section key={i} id={i} className={`wrapper special style${j}`}>
                    <div className="inner">
                        <section className="spotlights col1">
                            <section>
                                <h2>{post.acf.title}</h2>
                                <span className="image"><img src={mediaURL} alt="" /></span>
                                <p dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                            </section>
                        </section>
                    </div>
                </section>
                )
        }
    })  
}

const mapStateToProps = (state) => ({
    fetchingPosts: state.posts.isFetching,
    selectedLanguage: state.selectedLanguage,
    posts: state.posts.isFetching ? [] : sortNested('acf', 'order', state.posts.items[state.selectedLanguage])
})

export default connect(mapStateToProps)(Posts)
