import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { client } from '../client';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://stolyzrldjdtcygtwjfy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0b2x5enJsZGpkdGN5Z3R3amZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzM0MDUxNSwiZXhwIjoyMDI4OTE2NTE1fQ.xKZt_gY0YoxrUxCgBKrpjgwyn5ejPrN2u3mCakWo7IY';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Book {
  name: string;
  author: string;
  details: string;
  readTime: number;
  cover: File | null;
  rating?: number;
  pdf: File | null;
}


const AddBookPage = () => {

  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    name: '',
    author: '',
    details: '',
    readTime: 0,
    cover: null,
    pdf:null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.type === 'number' ? parseFloat(event.target.value) : event.target.value;
    setBook({ ...book, [event.target.name]: newValue });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,type: keyof Book) => {
    if (event.target.files && event.target.files.length > 0) {
      setBook({ ...book, [type]: event.target.files[0] });
    }
  };

  async function uploadFile(file: File|null,file_path:string) {
    if(file!=null){
        const { error } = await supabase.storage.from('prisha').upload(file_path, file)
        if (error) {
            // Handle error
            console.log(error)
          }
        else{
            const {data} = supabase.storage.from('prisha').getPublicUrl(file_path);
            return data.publicUrl;
        }
    }
    return undefined
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const val = book.name;
        const pub_url = await uploadFile(book.pdf, `/${val}`);
        const img_url = await uploadFile(book.cover,`/image/${val}`)
        if (pub_url && img_url) {
            const dataToSend = {
                author: book.author,
                details: book.details,
                readTime: book.readTime,
                pdf: pub_url,
                name: book.name,
                cover: img_url,
            };
            console.log(dataToSend.pdf);
            await client.addBook.mutate(dataToSend);
        } else {
            console.error('Error uploading either file or image.');
        }
        toast.success('Book added successfully!');
        setBook({ name: '', author: '', details: '', readTime: 0, cover: null ,pdf:null});
        navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Error adding book');
    }
  };

  return (
    <div className="add-book-page">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name of the Book</label>
          <input
            type="text"
            name="name"
            id="name"
            value={book.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author of the Book</label>
          <input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="details">Book Details</label>
          <textarea
            name="details"
            id="details"
            value={book.details}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="readTime">Book Read Time (in mins)</label>
          <input
            type="number"
            name="readTime"
            id="readTime"
            value={book.readTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cover">Add a Book Cover (PDF only, upto 10MB)</label>
          <input type="file" name="cover" id="cover" onChange={(e)=>handleFileChange(e,'cover')} />
        </div>
        <div className="form-group">
          <label htmlFor="pdf">Add a Book (PDF only, upto 10MB)</label>
          <input type="file" name="pdf" id="cover" onChange={(e)=>handleFileChange(e,'pdf')} />
        </div>
        <button type="submit" > Add Book </button>
      </form>
    </div>
  );
};


export default AddBookPage;


// const formData = {
    //     name: book.name,
    //     author: book.author,
    //     details: book.details,
    //     readTime: book.readTime,
    //     cover: book.cover,
    //     pdf: book.pdf || null,
    // }

    // const formData = new FormData();
    // formData.append('name', book.name);
    // formData.append('author', book.author);
    // formData.append('details', book.details);
    // formData.append('readTime', book.readTime.toString());
    // if (book.cover) formData.append('cover', book.cover);
    // if (book.pdf) {
    //     // Construct PDF data object and append it to formData
    //     const pdfData = {
    //       buffer: await blobToBuffer(book.pdf),
    //       size: book.pdf.size,
    //       mimetype: book.pdf.type,
    //     };
    //     formData.append('pdf', JSON.stringify(pdfData));
    //   }
