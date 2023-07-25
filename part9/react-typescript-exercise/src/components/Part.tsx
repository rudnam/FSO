import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const part = props.part;
  const { name, exerciseCount } = part;
  let description;
  let groupProjectCount;
  let backgroundMaterial;
  let requirements;
  switch (part.kind) {
    case "basic":
      description = part.description;
      break;
    case "group":
      groupProjectCount = part.groupProjectCount;
      break;
    case "background":
      description = part.description;
      backgroundMaterial = part.backgroundMaterial;
      break;
    case "special":
      description = part.description;
      requirements = part.requirements;
      break;
    default:
      return assertNever(part);
  }

  return (
    <p>
      <b>
        {name} {exerciseCount}
      </b>

      {description && (
        <>
          <br />
          <i>{description}</i>
        </>
      )}
      {groupProjectCount && (
        <>
          <br />
          project exercises {groupProjectCount}
        </>
      )}
      {backgroundMaterial && (
        <>
          <br />
          submit to {backgroundMaterial}
        </>
      )}
      {requirements && (
        <>
          <br />
          required skills: {requirements.join(", ")}
        </>
      )}
      <br />
    </p>
  );
};

export default Part;
