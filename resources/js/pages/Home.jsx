import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {fetchPost, setPosts} from "../store/slices/postSlice";
import api from "../api";

const Home = () => {
    const isAuth = !!localStorage.getItem('access_token')
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts);
    console.log(posts)
    useEffect(() => {
        dispatch(fetchPost())
    }, [])

    const timeFormat = (date) => {
        date = new Date(date);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        date = `${mm}.${dd}.${yyyy}, ${hours}:${minutes}`;
        return date;
    }

    const removePost = (id) => {
        api.delete(`api/post/${id}`).then((res) => {
            console.log(res)
            dispatch(setPosts(res.data.posts))
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row"></div>
                <div className="row">
                    <div className="col s4 offset-s8 right-align">
                        <Link to={'/add-post'} className="btn">Добавить пост</Link>
                    </div>
                </div>
                <div className="row">
                    {posts.map((post) => {
                        return(
                            <div className="col s12" key={post.id}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col s4">
                                            <div className="card-image">
                                                {post.mediaType == 'image' && <img src={post.media} style={{width: '100%'}}/>}
                                                {post.mediaType == 'video' && <video src={post.media} controls style={{width: '100%'}}></video> }

                                            </div>
                                        </div>
                                        <div className="col s8">
                                            <div className="card-content">
                                                <div className="row align-center">
                                                    <div className="col s8"><h5>{post.title}</h5></div>
                                                    <div className="col s4">{post.user.login}</div>
                                                </div>
                                                <p>{post.text}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-stacked">
                                        <div className="card-action">
                                            <div className="row">
                                                {isAuth && user.id == post.user.id &&
                                                    <div className="col s8">
                                                        <button className="btn" style={{marginRight: '15px'}} onClick={() => {removePost(post.id)}}>Удалить</button>
                                                        <Link to={`/edit-post/${post.id}`}>Редактировать</Link>
                                                    </div>
                                                }
                                                <div className="col s4">{timeFormat(post.created_at)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>

    )
}

export default Home;
