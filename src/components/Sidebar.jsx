import React from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import { RiHome7Fill } from 'react-icons/ri'
import { BsHash, BsBookmarks, BsPerson } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineForwardToInbox } from 'react-icons/md'
import { CgNotes, CgMoreO } from 'react-icons/cg'
import './sidebar.css'
import { Link, useNavigate } from 'react-router-dom'


const Sidebar = () => {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.clear('token')
        localStorage.clear('id')
        navigate('/')
    }


    return (
        <div className="sidebar-container">
            <div className="home-tweet-ico">
                <AiOutlineTwitter className="side-ico" />
            </div>
            <Link to="/home">
                <div className="home side-bar">
                    <RiHome7Fill className="side-ico" />
                    <h3>Home</h3>
                </div>
            </Link>
            <Link to="/explore">
                <div className="explore side-bar">
                    <BsHash className="side-ico" />
                    <h3>Explore</h3>
                </div>
            </Link>
            <Link to="/notifications">
                <div className="notifications side-bar">
                    <IoMdNotificationsOutline className="side-ico" />
                    <h3>Notifications</h3>
                </div>
            </Link>
            <Link to="/messages">
                <div className="messages side-bar">
                    <MdOutlineForwardToInbox className="side-ico" />
                    <h3>Messages</h3>
                </div>
            </Link>
            <Link to="/bookmarks">
                <div className="bookmarks side-bar">
                    <BsBookmarks className="side-ico" />
                    <h3>Bookmarks</h3>
                </div>
            </Link>
            <Link to="/list">
                <div className="list side-bar">
                    <CgNotes className="side-ico" />
                    <h3>Lists</h3>
                </div>
            </Link>
            <Link to="/profile">
                <div className="profile side-bar">
                    <BsPerson className="side-ico" />
                    <h3>Profile</h3>
                </div>
            </Link>
            <Link to="/more">
                <div className="more side-bar">
                    <CgMoreO className="side-ico" />
                    <h3>More</h3>
                </div>
            </Link>
            <div className="btn-tweet-side">
                <button className="btn-tweet" onClick={handleLogout}>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Sidebar