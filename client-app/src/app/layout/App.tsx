import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/homePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  const location = useLocation(); // using this to correctly update the activity form once the 'create activity' button is clicked

  return (
    // we have an empty element below because React needs to deliver a single component every time
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"} //if we have the '/' followed by anything else render this route
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              {/* (2em means 2 times the size of the current font) */}

              {/* The exact key word is used to not cause confusion between another path - this only matches an exact / */}
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
