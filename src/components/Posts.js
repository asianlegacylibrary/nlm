import '../assets/sass/nlm/posts.scss'
import logo from '../assets/images/logo_all.png'
import nlm_logo from '../assets/images/nlm_logo_transparent.png'
import React from 'react'
import { connect } from 'react-redux'
import { sortNested } from '../tools/utilities'

const Posts = ({ posts }) => {
    if (!posts) {
        return null
    }

    //const c = sortNested('acf', 'order', posts)

    return posts.map((post, i) => {
        //strange method to make alternating styles
        let j = i % 2 === 0 ? 1 : 3

        let mediaURL = ''
        if (post._embedded['wp:featuredmedia']) {
            mediaURL = post._embedded['wp:featuredmedia'][0].source_url || ''
        }

        if (parseInt(post.acf.columns) === 2) {
            return (
                <div key={i} className="row">
                    <div className="col s12 posts-col">
                        <h2>{post.acf.title}</h2>

                        <div className="row flex">
                            <div className="col s12 m6">
                                <span className="image left">
                                    <img src={mediaURL} alt="" />
                                </span>
                            </div>
                            <div className="col s12 m6">
                                <p
                                    className="down-push"
                                    dangerouslySetInnerHTML={{
                                        __html: post.content.rendered,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="divider-with-logo">
                            <div className="hr-line-left"></div>
                            <img src={nlm_logo} width="24px" alt="logo" />
                            <div className="hr-line-right"></div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={i} className="row">
                    <div className="col s12 posts-col">
                        <h2>{post.acf.title}</h2>
                        <span className="image">
                            <img src={mediaURL} alt="" />
                        </span>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: post.content.rendered,
                            }}
                        />
                        <div className="divider-with-logo">
                            <div className="hr-line-left"></div>
                            <img src={nlm_logo} width="24px" alt="logo" />
                            <div className="hr-line-right"></div>
                        </div>
                    </div>
                </div>
            )
        }
    })
}

const mapStateToProps = state => ({
    fetchingPosts: state.WP.posts.isFetching,
    selectedLanguage: state.selectedLanguage,
    posts: state.WP.posts.isFetching
        ? []
        : sortNested(
              'acf',
              'order',
              state.WP.posts.items[state.selectedLanguage]
          ),
})

export default connect(mapStateToProps)(Posts)
