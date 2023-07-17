const User = ({ user }) => {
  if (!user) {
    return <p>No user found</p>;
  }

  return (
    <div className="user flex flex-col gap-2">
      <h1 className="text-4xl font-bold">{user.name}</h1>
      <h2 className="text-xl">Added blogs:</h2>
      <ul className="list-disc list-inside">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
