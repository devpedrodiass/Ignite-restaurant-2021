import { Component, useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";
import { IFood } from "../../pages/Dashboard";

export interface IFoodProps {
  food: any;
  handleDelete: (id: number) => void;
  handleEditFood: (food: IFood) => void;
}

function Food({ food: foodProps, handleDelete, handleEditFood }: IFoodProps) {
  const [isAvailable, setIsAvailable] = useState(() => foodProps.available);

  const toggleAvailable = async () => {
    await api.put(`/foods/${foodProps.id}`, {
      ...foodProps,
      available: !isAvailable,
    });

    setIsAvailable((oldState: boolean) => !oldState);
  };

  const setEditingFood = () => {
    handleEditFood(foodProps);
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={foodProps.image} alt={foodProps.name} />
      </header>
      <section className="body">
        <h2>{foodProps.name}</h2>
        <p>{foodProps.description}</p>
        <p className="price">
          R$ <b>{foodProps.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${foodProps.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(foodProps.id)}
            data-testid={`remove-food-${foodProps.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label
            htmlFor={`available-switch-${foodProps.id}`}
            className="switch"
          >
            <input
              id={`available-switch-${foodProps.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${foodProps.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food;
