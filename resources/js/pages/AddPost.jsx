import {useState, useRef} from "react";
import { Link } from "react-router-dom";
import AuthGuard from "../hoc/AuthGuard";
import Header from "../components/Header";
import api from "../api";

const AddPost = () => {

    const inputFile = useRef(null);
    const inputTitle = useRef(null);
    const textarea = useRef(null)

    const getMediaType = (input) => {
        let type = input.files[0].type.split('/')[0];
        return type;
    };


    const send = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('media', inputFile.current.files[0]);
        data.append('mediaType', getMediaType(inputFile.current));
        data.append('title', inputTitle.current.value);
        data.append('text', textarea.current.value);
        console.log(getMediaType(inputFile.current))
        api.post('/api/post', data).then((res) => {
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
                                <div className="col s12">
                                    <input type="file" ref={inputFile} accept="video/*, image/*"/>
                                </div>
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

export default AddPost;
