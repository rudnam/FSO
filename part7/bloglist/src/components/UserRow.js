const UserRow = ({ name, blogCount }) => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <tr className="user-row" style={style}>
      <td>{name}</td>
      <td>{blogCount}</td>
    </tr>
  );
};

export default UserRow;
