import { useSelector } from "react-redux";

function Error() {
  const errorMessage = useSelector((state) => state.errorMessage);

  return (
    <div>
      {errorMessage ? (
        <div className="bg-gray-800 text-red-500 rounded-md p-2 border border-gray-600">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}

export default Error;
