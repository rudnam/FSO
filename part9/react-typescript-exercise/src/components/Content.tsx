import { coursePart } from "../types";

interface ContentProps {
  courseParts: coursePart[];
}
const Content = (props: ContentProps) => {
  const courseParts = props.courseParts;
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
