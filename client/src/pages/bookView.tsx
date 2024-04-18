import { useLocation, useParams } from 'react-router-dom'
import { client } from '../client';
import '../App.css'
import { Rate } from "antd";
import { SetStateAction, useState } from 'react';

const bookView = () => {

const { id } = useParams();
const location = useLocation();
const { bookData } = location.state;
const [rating, setRating] = useState(bookData.rating || 0);
// call to endpoint to change the rating
// write the state that handles the rating

const handleChange = async (value: any) => {
    setRating(value);
    if(id!=undefined){
        const to_send = {
            name: id,
            rating: value
          };
        await client.rateBook.mutate(to_send);
    }
  };

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