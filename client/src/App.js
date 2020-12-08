import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import SingleRecipe from './containers/Recipes/SingleRecipe/SingleRecipe';
import './App.css';
import Categories from './containers/Categories/Categories';
import AllRecipes from './containers/Recipes/AllRecipes/AllRecipes';

const App = () => {
  return (
    <BrowserRouter>
      {/* <NavigationBar /> */}
      <Switch>
        <Redirect path="/" exact to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/recipes" component={AllRecipes} />
        <Route path="/recipe/:recipeID" component={SingleRecipe} />
        <Route path="*" component={Home} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
