import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import AddIcon from "../public/vectors/AddIcon.svg";
import CloseIcon from "../public/vectors/CloseIcon.svg";
import SearchIcon from "../public/vectors/SearchIcon.svg";
import FilterIcon from "../public/vectors/FilterIcon.svg";
import Link from "next/link";

interface Props {
  closeModal: () => void;
  workoutOnClick: (workout: any) => void;
}

function SelectWorkoutModalContent({ closeModal, workoutOnClick }: Props) {
  const [search, setSearch] = useState("");
  const { data: workouts, error: workoutsError } = useSWR(
    `/api/workouts?${search ? `q=name:${search.toLowerCase()}` : ""}`
  );

  const workoutsLoading = !workouts && !workoutsError;

  return (
    <SelectWorkoutModalContentContainer>
      <header>
        <button
          type="button"
          className="button__close"
          onClick={() => closeModal()}
        >
          <CloseIcon />
        </button>

        <h2 className="title">Find Workout</h2>

        <Link href="/workout/create">
          <a className="button__add">
            <AddIcon />
          </a>
        </Link>
      </header>

      <div className="container__query">
        <div className="container__search">
          <SearchIcon />

          <input
            type="text"
            placeholder="Search for an workout"
            className="input__search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button type="button" className="button__filter">
          <FilterIcon />
        </button>
      </div>

      <div>
        <p className="subtitle">All workouts</p>

        {workoutsLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="workouts">
            {workouts.data.map((workout: any) => (
              <li className="workout" key={workout.id}>
                <button type="button" onClick={() => workoutOnClick(workout)}>
                  {/* <img src={workout.image_url} alt="" /> */}
                  {workout.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SelectWorkoutModalContentContainer>
  );
}

const SelectWorkoutModalContentContainer = styled.section`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;
  }

  .button__close {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(32, 14, 50, 0.1);
    border-radius: 4px;
    border: none;
    height: 40px;
    width: 40px;
  }

  .title {
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #200e32;
  }

  .button__add {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    height: 40px;
    width: 40px;
  }

  .container__query {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .container__search {
    position: relative;
    flex: 1;
    margin-right: 16px;

    svg {
      position: absolute;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  .input__search {
    width: 100%;
    background: #f7f7f7;
    border-radius: 10px;
    border: none;
    padding: 13px 13px 13px 45px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #200e32;

    &::placeholder {
      color: rgba(32, 14, 50, 0.3);
    }
  }

  .button__filter {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subtitle {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #dadada;
    margin-bottom: 16px;
  }

  .workouts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 101px;
    column-gap: 25px;
    row-gap: 10px;
    height: 100vh;
    max-height: 426px;
    overflow-y: auto;

    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f7f7f7;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #dadada;
      border-radius: 5px;
    }
  }

  .workout button {
    width: 100%;
    border: 1px solid #f7f7f7;
    border-radius: 15px;
    background-color: transparent;
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #200e32;

    img {
      width: 83px;
      height: 83px;
      border-radius: 10px;
      margin-right: 16px;
      object-fit: cover;
    }
  }
`;

export default SelectWorkoutModalContent;
