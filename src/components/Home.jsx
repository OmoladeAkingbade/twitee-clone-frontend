import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { GiEarthAmerica } from 'react-icons/gi'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { AiOutlineFileGif } from 'react-icons/ai'
import { VscSmiley } from 'react-icons/vsc'
import Tweets from './Tweets';
import Tweetside from './Tweetside';




const url = 'https://twiteer-app.herokuapp.com'
const Home = () => {
  const [tweet, setTweet] = useState({ twit: '' })
  const [getToken, setGetToken] = useState(null)
  const [theId, setTheId] = useState('')
  const [allTweets, setAllTweets] = useState([])
  const [sent, setSent] = useState(false)
  const [userTweets, setUserTweets] = useState([])







  const handleKeyInput = (e) => {
    const newHeight = e.target.scrollHeight
    e.target.style.height = newHeight + "px"
  }

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (!e.target.value) {
      e.target.style.height = 'auto'
    }

    const value = e.target.value
    const newTweet = { ...tweet, twit: value }
    setTweet(newTweet)
  }




  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (!token) {
      navigate('/')
    }
    setGetToken(token)
    setTheId(id)
    getAlltweets(token)
    getUserTweets(token)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent])


  const handleCreateTweet = async (e) => {

    await fetch(`${url}/twit`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(getToken)}`
      },
      body: JSON.stringify(tweet)
    })

    // console.log(data)
    setTweet({ twit: '' })
    setSent(!sent)
  }
  const getAlltweets = async (token) => {
    const response = await fetch(`${url}/twit`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    })
    const data = await response.json()
    setAllTweets(data.twits)
  }

  const getUserTweets = async (token) => {
    const response = await fetch(`${url}/twit/userTweet`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    })
    const data = await response.json()
    console.log(data)
    setUserTweets(data.twits)
  }






  return (

    <div className="home-twitter">
      <Sidebar />
      <div className="home-container">
        <h5>Home</h5>
        <textarea name="twit" id="" cols="30" value={tweet.twit} placeholder="What's happening here?" onKeyPress={handleKeyInput} onChange={handleChange}></textarea>
        <div className="line-world-view">
          <button className="world-view">
            <GiEarthAmerica />
            Everyone can reply
          </button>
        </div>

        <div className="ico-btn-tweet">
          <div className="ico-tweet-file">
            <MdOutlinePhotoSizeSelectActual className="ttt" />
            <AiOutlineFileGif className="ttt" />
            <VscSmiley className="ttt" />
          </div>
          <div className="tweet-btn-home">
            <button className="send-tweet" onClick={handleCreateTweet}>
              Tweet
            </button>
          </div>
        </div>
        <div className="all-tweet-info">
          {
            allTweets.map(atweet => <Tweets atweet={atweet} key={atweet.id} token={getToken} setAllTweets={setAllTweets} userId={theId} />)
          }
        </div>


      </div>
      <div className="delete-user-tweet">
        <div className="see-twit">
          <h3>See your tweets</h3>
          <p>you can delete tweets</p>
        </div>
        {
          userTweets.map(atweet => <Tweetside atweet={atweet} key={atweet.id} setSent={setSent} token={getToken} sent={sent} />)
        }
      </div>
    </div>

  )
}

export default Home;