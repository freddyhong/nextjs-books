"use client";
import { GET_BOOKS } from "./url";
import Link from "next/link";

interface BookInfo {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
  newest_published_date: string;
  oldest_published_date: string;
  updated: string;
}

const getBooks = async () => {
  const { results } = await (await fetch(GET_BOOKS)).json();
  return results;
};

export default async function Index() {
  const result = await getBooks();
  return (
    <div className="main_content">
      <p>The New York Times Best Seller Explorer </p>
      {result?.map((item: BookInfo, index) => (
        <Link
          key={index}
          className="item"
          href={{
            pathname: `/list/${item.list_name}`,
          }}
        >
          <button>{item.list_name} &rarr;</button>
        </Link>
      ))}
      <style jsx>
        {`
          .main_content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
            height: 100%;
            background-color: white;
            padding: 0px 50px;
          }
          p {
            grid-column: 1 / -1;
            font-size: 2.5rem;
            font-weight: bold;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
