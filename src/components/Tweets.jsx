import React, { useState, useEffect } from 'react'
import { AiOutlineLike, AiOutlineComment, AiFillLike } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'



const url = 'https://twiteer-app.herokuapp.com'
const Tweets = ({ atweet, token, userId, handleDelete }) => {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [showcom, setShowComment] = useState(false)
    const [comment, setComment] = useState([])
    const [commentData, setCommentData] = useState({ comment: "" })
    const [sendComm, setSendComm] = useState(false)


    const handleComm = (e) => {
        setShowComment(!showcom)
    }

    const handleOnClick = async () => {
        await fetch(`${url}/twit/${atweet.id}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })


        setLiked(true)
        setLikeCount(prevState => prevState + 1)
    }

    const getTweetLikes = async () => {
        const response = await fetch(`${url}/twit/${atweet.id}/likes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
        })
        const data = await response.json()

        if (response.status === 201) {
            const myIds = data.likes.map(elem => elem.id)
            setLikeCount(myIds.length)
            if (myIds.includes(userId)) {
                setLiked(true)
            } else {
                setLiked(false)
            }

        }

    }

    const getComments = async () => {
        const response = await fetch(`${url}/twit/${atweet.id}/comments`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
        })

        const data = await response.json()
        setComment(data.comments)

    }

    const handleCommentDatas = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setCommentData({ ...commentData, [name]: value })
    }

    const handlePostComments = async () => {
        await fetch(`${url}/twit/${atweet.id}/comment`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(commentData)
        })
        setCommentData({ comment: "" })
        setSendComm(!sendComm)

    }


    useEffect(() => {
        getTweetLikes()
        getComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [liked, showcom, sendComm])


    return (
        <div className="tweet-card" key={atweet.id}>
            <p className="ttme">{new Date(atweet.created_at).toLocaleString()}</p>
            <p>{atweet.twit}</p>
            <div className="port-like-com">
                {liked ? <div className="sect-likes"><AiFillLike className="ttt" /><p>{likeCount} </p></div> : <div className="sect-likes"><AiOutlineLike className="ttt" onClick={handleOnClick} /><p>{likeCount} </p></div>}
                {<AiOutlineComment className="ttt" onClick={handleComm} />}
            </div>
            <div className="set-show">
                {showcom && comment.map(coms => {
                    return (
                        <>
                            <div className="comment-section" key={coms.id}>
                                <p className="comm-text">{coms.comment}</p>
                            </div>
                        </>
                    )
                })}
                <div className="add-com">
                    {showcom && <>
                        <textarea name="comment" value={commentData.comment} onChange={handleCommentDatas}></textarea>
                        <div className="sendIcon">
                            <RiSendPlaneFill className="plane" onClick={handlePostComments} />
                        </div>
                    </>}
                </div>
            </div>

        </div>
    )
}

export default Tweets