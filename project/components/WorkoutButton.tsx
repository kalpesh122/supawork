import PlanItemButton from "./PlanItemButton";

interface Props {
  onClick?: () => void;
  reps: number;
  sets: number;
  name: string;
  image: string;
}

function WorkoutButton({ onClick, reps, sets, name, image }: Props) {
  return (
    <PlanItemButton
      image={image}
      title={name}
      information={
        <>
          <p
            className="workout-button-information-text"
            style={{ fontWeight: 600, fontSize: 16, color: "#d3cfd6" }}
          >
            {reps} reps
          </p>
          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
            fill="#d3cfd6"
          >
            <circle cx="2" cy="2" r="2" />
          </svg>
          <p
            className="workout-button-information-text"
            style={{ fontWeight: 600, fontSize: 16, color: "#d3cfd6" }}
          >
            {sets} sets
          </p>
        </>
      }
      onClick={onClick}
    />
  );
}

export default WorkoutButton;
