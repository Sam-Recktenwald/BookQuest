import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import "../css/Header/Header.css"
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import cover_not_found from '../images/cover_not_found.jpg'

const BookSearch = () => {
    const [bookList, setBookList] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const columnsPerRow = 4;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=40&startIndex=0`)
            .then(response => {
                console.log(response)
                setBookList(response.data.items)
            })
    }

    return (
        <div>
            <div className='header-bg d-flex justify-content-center rounded mb-3'>
                <h3 className='mb-4' style={{ color: 'white' }}>Search for a book or author to get recommendations: </h3>
                <form onSubmit={handleSubmit} className='input-group d-flex justify-content-center'>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search for a book, author, or keyword"
                        className='form-control-lg'
                        style={{ width: '100%', maxWidth: '650px', backgroundColor: 'white' }}
                    />
                    <button type="submit" className='form-control-lg input-group-append' style={{ backgroundColor: 'white' }}><FaSearch /> </button>
                </form>
            </div>
            <div className='container'>
                <h2 className='mb-3'>{bookList.length ? `Showing ${bookList.length} results:` : "Seach for a book or author to begin"}</h2>
                <Row xs={1} md={columnsPerRow}>
                    {
                        bookList.map((eachBook, idx) => {
                            return (
                                <div className='card border border-secondary border-1 mb-3' key={idx}>
                                    <div className='card-body'>
                                        <h3 className='card-title'>{eachBook.volumeInfo.title}</h3>
                                        <Link to={`/books/${eachBook.id}`}>
                                            {
                                                eachBook.volumeInfo.imageLinks
                                                    ?<img src={eachBook.volumeInfo.imageLinks?.thumbnail} alt={`Cover for ${eachBook.volumeInfo.title}`} className='card-img-bottom'></img>
                                                    :<img src={cover_not_found} alt="no cover" style={{width: '200px'}} className='card-img-bottom'></img>
                                            }
                                        </Link>
                                    </div>
                                    <div className='card-footer'>
                                    <Link to={`/books/${eachBook.id}`} className='btn' style={{backgroundColor: '#3D728B', color: 'white'}}>Show More</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    )
}

export default BookSearch