import React from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

export default function ChooseType({genres, type}) {
  const dispatch = useDispatch();
  return (
 
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
            fetchDataByGenre({

            genre: e.target.value,
            type
          })
        );
      }}
    >
    
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  )
}


const Select = styled.select`
  margin-left: 4rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: white;
  background-color: orange;
`;