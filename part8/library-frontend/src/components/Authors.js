const Authors = () => {
  const authors = [
    { name: "Fyodor Dostoevsky", born: 1989, bookCount: 3 },

    { name: "Martin Fowler", born: 1979, bookCount: 8 },
  ];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
