import React from 'react'
import { FiDelete } from 'react-icons/fi'


const url = 'https://twiteer-app.herokuapp.com'
const Tweetside = ({ atweet, token, setSent, sent }) => {

    const handleDelete = async (atweet, token) => {
        console.log(`${url}/twit/${atweet.id}`)
        console.log(atweet.id, JSON.parse(token))
        // eslint-disable-next-line no-unused-vars
        const res = await fetch(`${url}/twit/${atweet.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${JSON.parse(token)}` }
        })
        const data = await res.json()
        console.log(data)
        setSent(!sent)
    }


    return (
        <div className="tweet-card" key={atweet.id}>
            <p className="ttme">{new Date(atweet.created_at).toLocaleString()}</p>
            <p>{atweet.twit}</p>
            <FiDelete className="ttt del-twet" onClick={() => handleDelete(atweet, token)} />
        </div>
    )
}

export default Tweetside