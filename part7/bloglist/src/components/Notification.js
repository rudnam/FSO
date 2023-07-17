import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      {notification ? (
        <div className="bg-gray-800 text-green-500 rounded-md p-2 border border-gray-600">
          {notification}
        </div>
      ) : null}
    </div>
  );
}

export default Notification;
