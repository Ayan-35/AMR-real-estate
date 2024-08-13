import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './Header.module.css'
import { useEffect, useState } from 'react';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentuser } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log("handlesubmit is called");
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    urlParams.set('searchTerm', searchTerm);
    console.log(searchTerm);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}`);

  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get('searchTerm');
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    }
  }, [location.search]);

  return (
    <header className={`shadow-md ${style.header}`}>
      <div className="flex justify-between item-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
<<<<<<< HEAD
            <span className="text-white pr-2">AMR</span>
            <span className="text-white">Estate</span>
=======
            <span className="text-white">AMR</span>
            <span className="text-slate-300">Estate</span>
>>>>>>> 419297ca27ec260de62ec9924331bf0a7bbbac69
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="text-white p-3  flex items-center"
        >
          {/* <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          ></input> */}
          <button>
            <FaSearch className="white inline"></FaSearch>
            <p className="inline pl-2">search property</p>
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="home">
<<<<<<< HEAD
            <li className="hidden sm:inline text-white hover:underline">
=======
            <li className="hidden sm:inline text-slate-200 hover:underline">
>>>>>>> 419297ca27ec260de62ec9924331bf0a7bbbac69
              Home
            </li>
          </Link>
          <Link to="/about">
<<<<<<< HEAD
            <li className="hidden sm:inline text-white hover:underline">
=======
            <li className="hidden sm:inline text-slate-200 hover:underline">
>>>>>>> 419297ca27ec260de62ec9924331bf0a7bbbac69
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentuser ? (
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={currentuser.avatar}
                alt="profile"
              />
            ) : (
<<<<<<< HEAD
              <li className=" text-white hover:underline">Sign In</li>
=======
              <li className=" text-slate-200 hover:underline">Sign In</li>
>>>>>>> 419297ca27ec260de62ec9924331bf0a7bbbac69
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
