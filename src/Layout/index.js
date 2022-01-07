import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home"
import { Route, Switch } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import ViewDeck from "./ViewDeck";
import StudyPage from "./StudyPage"
import EditDeck from "./EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <StudyPage />
          </Route>

          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
