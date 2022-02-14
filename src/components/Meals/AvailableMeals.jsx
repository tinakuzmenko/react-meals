import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';

import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestError, setRequestError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-meals-delivery-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
      );

      if (!response.ok) throw new Error('Something went wrong!');

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        if (key) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setRequestError(error.message);
    });
  }, []);

  return (
    <section className={classes.meals}>
      {isLoading && <p className={classes.loader}>Loading...</p>}
      {requestError && <p className={classes.error}>{requestError}</p>}
      {!isLoading && !requestError && (
        <Card>
          <ul>
            {meals.map(meal => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
