import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import AddIcon from "../public/vectors/AddIcon.svg";
import CloseIcon from "../public/vectors/CloseIcon.svg";
import SearchIcon from "../public/vectors/SearchIcon.svg";
import FilterIcon from "../public/vectors/FilterIcon.svg";

interface Props {
  closeModal: () => void;
  createOnClick: () => void;
  exerciseOnClick: (exercise: any) => void;
}

function ExerciseModalContent({
  closeModal,
  createOnClick,
  exerciseOnClick,
}: Props) {
  const [search, setSearch] = useState("");
  const { data: exercises, error: exercisesError } = useSWR(
    `/api/exercises?${search ? `q=name:${search.toLowerCase()}` : ""}`
  );

  const exercisesLoading = !exercises && !exercisesError;

  return (
    <ExerciseModalContentContainer>
      <header>
        <button
          type="button"
          className="button__close"
          onClick={() => closeModal()}
        >
          <CloseIcon />
        </button>

        <h2 className="title">Find Exercise</h2>

        <button className="button__add" onClick={createOnClick}>
          <AddIcon />
        </button>
      </header>

      <div className="container__query">
        <div className="container__search">
          <SearchIcon />

          <input
            type="text"
            placeholder="Search for an exercise"
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
        <p className="subtitle">All exercises</p>

        {exercisesLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="exercises">
            {exercises.data.map((exercise: any) => (
              <li className="exercise" key={exercise.id}>
                <button type="button" onClick={() => exerciseOnClick(exercise)}>
                  <img src={exercise.image_url} alt="" />
                  {exercise.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ExerciseModalContentContainer>
  );
}

const ExerciseModalContentContainer = styled.section`
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

  .exercises {
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

  .exercise button {
    width: 100%;
    border: 1px solid #f7f7f7;
    border-radius: 15px;
    background-color: transparent;
    padding: 8px;
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

export default ExerciseModalContent;
