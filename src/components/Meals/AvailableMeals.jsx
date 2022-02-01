import React from 'react';

import { DUMMY_MEALS } from '../../mocks/dummyMeals';
import Card from '../UI/Card';

import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => (
  <section className={classes.meals}>
    <Card>
      <ul>
        {DUMMY_MEALS.map(meal => (
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
  </section>
);

export default AvailableMeals;
