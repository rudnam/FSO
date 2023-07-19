const Books = () => {
  const books = [
    { title: "Clean Code", author: "Robert Martin", published: 2008 },
    {
      title: "Refactoring, edition 2:",
      author: "Martin Fowler",
      published: 2018,
    },
  ];

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
