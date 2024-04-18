import React, { MouseEventHandler, useEffect, useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import {client} from '../client'

interface Book {
  cover: string;
  name: string;
  author: string;
  rating?: number;
  pdf: string;
  readTime: number;
  details: string;
}


const BookItem: React.FC<Book> = ({ ...data}) => {
  const navigate = useNavigate();
  function handleClick(data: any): MouseEventHandler<HTMLDivElement> {
    return (event) => {
      navigate(`/book/${data.name}`,{ state: { bookData: data } })
      console.log('Clicked with data:', data);
    };
  }
  return (
    <div className="book-item" onClick={handleClick(data)}>
      <img src={data.cover} alt="data.name" className='img'/>
      <h3>{data.name}</h3>
      <p>{data.author}</p>
    </div>
  );
};

const Home: React.FC = () => {

  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchData = async () => {
        const specificColums  = await client.getBooks.query();
        // Do something with the fetched data
        console.log(specificColums)
        setBooks(specificColums)
    };
    fetchData();
  }, []);

  console.log("hi",books)
  return (
    <div className="home">
      <div className="main">
        <div className="bookshelf">
          <h2>My Books</h2>
          <div className="books">
            {books.map((book) => (
              <BookItem key={book.name} {...book} />
            ))}
          </div>
          <button onClick={() => navigate("/addBooks")}>+ Add new Books</button>
        </div>
      </div>
    </div>
  );
};

export default Home;