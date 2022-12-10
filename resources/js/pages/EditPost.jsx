import {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import AuthGuard from "../hoc/AuthGuard";
import Header from "../components/Header";
import api from "../api";

const EditPost = () => {
    const {id} = useParams('id');
    const [post, setPost] = useState({})
    const [isEditImage, setIsEditImage] = useState(false);
    const inputFile = useRef(null);
    const inputTitle = useRef(null);
    const textarea = useRef(null)

    useEffect(() => {
        api.get(`/api/post/${id}`).then((res) => {
            const post = res.data.post;
            setPost(post);
            inputTitle.current.value = post.title
            textarea.current.value = post.text
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }, [])




    const getMediaType = (input) => {
        let type = input.files[0].type.split('/')[0];
        return type;
    };


    const send = (e) => {
        e.preventDefault()
        let data = new FormData();

        if(isEditImage) {
            data.append('media', inputFile.current.files[0]);
            data.append('mediaType', getMediaType(inputFile.current));
        }
        else {
            data.append('media', '');
            data.append('mediaType', '');
        }
        data.append('id', post.id);
        data.append('title', inputTitle.current.value);
        data.append('text', textarea.current.value);
        api.post('/api/post/update', data).then((res) => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <AuthGuard>
            <Header />
            <div className="container">
                <div className="row"></div>
                <div className="row">
                    <div className="col">
                        <h1>Добавить пост</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <form action="" onSubmit={send}>
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="">Заголовок поста</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input type="text" ref={inputTitle} accept="video/*, image/*"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="">Картинка или видео</label>
                                </div>
                            </div>
                            <div className="row">
                                {isEditImage &&
                                <div className="col s12">
                                    <input type="file" ref={inputFile} accept="video/*, image/*"/>
                                </div>
                                }
                                {!isEditImage && post.media &&
                                    <div className="row">
                                        <div className="col s6">
                                            {post.mediaType == 'image' && <img src={post.media} alt="" style={{width: '100%'}}/>}
                                            {post.mediaType == 'video' && <video src={post.media}  controls alt="" style={{width: '100%'}}/>}

                                        </div>
                                        <div className="col s6">
                                            <button className="btn" onClick={()=> {setIsEditImage(true)}}>Изменить</button>
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <label htmlFor="">Содержание поста</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <textarea ref={textarea}></textarea>
                                </div>
                            </div>
                            <div>
                                <button className="btn">Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthGuard>

    )
}

export default EditPost;
