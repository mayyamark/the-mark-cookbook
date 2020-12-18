import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import SingleRecipe from './containers/Recipes/SingleRecipe/SingleRecipe';
import Categories from './containers/Categories/Categories';
import AllRecipes from './containers/Recipes/AllRecipes/AllRecipes';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect path="/" exact to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/categories" component={() => <Categories isCreating={false} />} />
        <Route path="/create-category" component={() => <Categories isCreating={true} />} />
        <Route path="/recipes" component={AllRecipes} />
        <Route path="/recipe/:recipeID" component={SingleRecipe} />
        <Route path="*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
