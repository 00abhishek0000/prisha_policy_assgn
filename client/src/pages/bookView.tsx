import { useLocation, useParams } from 'react-router-dom'
import { client } from '../client';
import '../App.css'
import { Rate } from "antd";
import { SetStateAction, useState } from 'react';

const bookView = () => {
let { id } = useParams();
const location = useLocation();
const {bookData} = location.state
console.log("data",bookData)
const [rating,setRating] =  useState(0);
if(bookData.rating) setRating(bookData.rating)
if(id==undefined) id = "sh"
// call to endpoint to change the rating
// write the state that handles the rating
    const to_send = {
        name: id,
        rating: rating
    }
    const handleChange = (value: SetStateAction<number>) => {
        setRating(value);
    };
    async function send(to_send:any) {
        await client.rateBook.mutate(to_send)
    }
    send(to_send)
  return (
    <>
        <div className='outer'>
            <div className='img-sec'>
                <img className="read-img" src={bookData.cover} alt={`Image of ${bookData.name}`} />
            </div>
            <div className='detail section'>
                     <p>{bookData.name}</p>
                    <p>{bookData.author}</p>
                    <p>{bookData.readTime}</p>
                    <p>{bookData.details}</p>
                        <div>
                        Rate the book
                        <Rate value={rating} onChange={handleChange}/>
                        </div>
                    <button onClick={()=>{window.open(`${bookData.pdf}`)}}> Read Book </button>
            </div>
        </div>
    </>
  )
}

export default bookView