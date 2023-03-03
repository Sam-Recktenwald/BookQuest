import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import cover_not_found from '../images/cover_not_found.jpg'

const BookDetails = (props) => {
    const [oneBook, setOneBook] = useState("")

    const { id } = useParams()

    const regex = /(<([^>]+)>)/ig;

    const bookPreviewLink = `https://www.google.com/books/edition/_/${id}?hl=en&gbpv=1`

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => {
                console.log(res.data)
                setOneBook(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    // const handleReturnToSearch =(e)=>{
    //     e.preventDefault()
    // }

    return (
        <div>
            {
                oneBook ?
                    <div className='container border border-secondary border-3 rounded p-4'>
                        <div className='d-flex justify-content-around m-5'>
                            <div>
                                <h1>{oneBook.volumeInfo.title}</h1>
                                <h4>By: {oneBook.volumeInfo.authors.join(", ")}</h4>
                                <h4>Published in: {dayjs(oneBook.volumeInfo.publishedDate).format('YYYY')}</h4>
                                <h4>Page count: {oneBook.volumeInfo.pageCount}</h4>
                                <h4>{oneBook.volumeInfo.categories}</h4>
                            </div>
                            {
                                oneBook.volumeInfo.imageLinks
                                    ? <img src={oneBook.volumeInfo.imageLinks?.thumbnail} alt={`Cover for ${oneBook.volumeInfo.title}`} style={{width:'20vh'}} className="img-fluid"></img>
                                    : <img src={cover_not_found} alt="no cover" style={{ width: '20vh' }} className="img-fluid"></img>
                            }
                        </div>
                        <p className='m-5'>{oneBook.volumeInfo.description.replace(regex, ' ')}</p>
                        <div className='d-flex justify-content-around'>
                            {/* Create a button that will return you to the prior search results */}
                            {/* <Link to={handleReturnToSearch} className="btn shadow" style={{backgroundColor:"#3D728B", color: 'white'}}>Back to search results</Link> */}
                            {/* <button onClick={handleReturnToSearch} className="btn shadow" style={{backgroundColor:"#3D728B", color: 'white'}}>Back to search results</button> */}
                            <Link target='_blank' to={bookPreviewLink} className="btn shadow" style={{backgroundColor: '#304529', color: 'white'}}>Click for preview</Link>
                        </div>
                    </div> :
                    <h1>Loading...</h1>
            }
        </div>
    )
}

export default BookDetails