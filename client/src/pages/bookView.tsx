import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { client } from '../client';
import '../App.css'
import { Rate } from "antd";
import { useState } from 'react';

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

  const navigate =  useNavigate();
  return (
    <>
        <div className='outer'>
            <div className='img-sec'>
                <button className='button-80' onClick={()=>navigate('/')}>Back to Home</button>
                <img className="read-img" src={bookData.cover} alt={`Image of ${bookData.name}`} />
            </div>
            <div className='detail section'>
                     <h1 style={{color:'#0f0887'}}> {bookData.name}</h1>
                    <p className='book-wr'>{bookData.author}</p>
                    <p className='book-wr'>Book Read Time : {bookData.readTime}</p>
                    <p>{bookData.details}</p>
                        <div>
                        Rating &nbsp; &nbsp; <Rate value={rating} onChange={handleChange}/>
                        </div>
                    <button style={{top: '10vh'}} className="button-80" onClick={()=>{window.open(`${bookData.pdf}`)}}> Read Book </button>
            </div>
        </div>
    </>
  )
}

export default bookView