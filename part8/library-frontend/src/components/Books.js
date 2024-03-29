import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState(null);
  const client = useApolloClient();

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  useEffect(() => {
    result.refetch({ genre });
  }, [genre]); // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert("book added");
      const addedBook = data.data.bookAdded;
      console.log("bookAdded", addedBook);

      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          };
        }
      );
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const genres = [
    { label: "refactoring", value: "refactoring" },
    { label: "agile", value: "agile" },
    { label: "patterns", value: "patterns" },
    { label: "design", value: "design" },
    { label: "crime", value: "crime" },
    { label: "classic", value: "classic" },
    { label: "all genres", value: null },
  ];

  const books = result.data ? result.data.allBooks : [];
  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{genre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g, index) => (
        <button key={index} onClick={() => setGenre(g.value)}>
          {g.label}
        </button>
      ))}
    </div>
  );
};

export default Books;
