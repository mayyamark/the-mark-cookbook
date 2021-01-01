import { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext.js';
import { getToken, removeToken } from './auth/ManageToken.js';
import Home from './components/Home/Home';
import Login from './containers/Login/Login.js';
import SingleRecipe from './containers/Recipes/SingleRecipe/SingleRecipe';
import Categories from './containers/Categories/Categories';
import AllRecipes from './containers/Recipes/AllRecipes/AllRecipes';
import './App.css';

const App = () => {
  const token = getToken();

  const [user, setUser] = useState(token ? decode(token) : null);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        removeToken();
        setUser(null);
      }, user.exp * 1000 - Date.now());
    }
    return () => clearTimeout();
  }, [user, removeToken, setUser]);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        {user ? (
          <Switch>
            <Redirect path="/" exact to="/home" />
            <Route path="/home" component={Home} />
            <Route
              path="/categories"
              component={() => <Categories isCreating={false} />}
            />
            <Route
              path="/create-category"
              component={() => <Categories isCreating={true} />}
            />
            <Route
              path="/recipes"
              component={() => <AllRecipes isCreating={false} />}
            />
            <Route
              path="/create-recipe"
              component={() => <AllRecipes isCreating={true} />}
            />
            <Route path="/recipe/:recipeID" component={SingleRecipe} />
            <Route path="*" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Redirect path="/" exact to="/login" />
            <Route path="/login" component={Login} />
            <Route path="*" component={Login} />
          </Switch>
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
