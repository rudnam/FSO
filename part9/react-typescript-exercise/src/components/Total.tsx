import { coursePart } from "../types";

interface TotalProps {
  courseParts: coursePart[];
}

const Total = (props: TotalProps) => {
  const courseParts = props.courseParts;
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;