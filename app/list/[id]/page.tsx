"use client";
import Link from "next/link";
import { GET_BOOK } from "../../url";

interface BooksInfo {
  amazon_product_url: string;
  book_image: string;
  author: string;
  title: string;
}

const getBookList = async ({ id }: { id: string }) => {
  const { results } = await (await fetch(`${GET_BOOK}/${id}`)).json();
  return results.books;
};

export default async function Books({ params: { id } }) {
  const books = await getBookList({ id });
  return (
    <div className="main_content">
      {books?.map((item: BooksInfo, index) => (
        <div key={index} className="item">
          <img src={item.book_image} width="100%" height="250px" />
          <div className="item__info">
            <h1>{item.title}</h1>
            <h3>{item.author}</h3>
          </div>
          <Link href={item.amazon_product_url} target="_blank">
            <button>Buy Now</button>
          </Link>
        </div>
      ))}
      <style jsx>
        {`
          .main_content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            height: 100%;
            background-color: white;
            padding: 30px 50px;
          }

          .item {
            border: 1px solid #ddd;

            &:hover div h1 {
              font-size: 1.1rem;
            }
          }

          .item__info {
            padding: 10px;
            height: 120px;
          }

          h1 {
            transition: all 0.2s ease-in-out;
            font-size: 0.9rem;
            font-weight: 600;
          }

          h3 {
            font-size: 1rem;
            color: #3f649c;
          }

          a {
            text-decoration: none;
            font-size: 1rem;
          }

          p {
            width: 100%;
            grid-column: 1 / -1;
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
