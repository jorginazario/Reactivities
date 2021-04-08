import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponents from "./LoadingComponents";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  // SUPER IMPORTANT: THIS GIVES US ACCESS TO THE ACTIVITY STORE / REACT CONTEXT
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // the empty array ensures that this only runs once
  // if not we would be running this everytime we update the activities array

  // // UPDATING REACT STATES
  // activity.id // if this exists go to the line right below, if not go two line below
  //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) // this runs if we have an activity - in other words, when we are editing an activity
  //   // in the line above we are excluding the activity in our activities list where
  //   : setActivities([...activities, {...activity, id: uuid()}]) //this runs if activity is null - in other words, when we create a new activity we add it to the end of our existing list
  //   // REMINDER ON SPREADER ... [...activities, activity] is the same as [activity1, activity2, activityXYZ, activity]
  // setEditMode(false);
  // setSelectedActivity(activity);

  if (activityStore.loadingInitial)
    return <LoadingComponents content="Loading app" />;

  return (
    // we have an empty element below because React needs to deliver a single component every time
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        {/* (2em means 2 times the size of the current font) */}
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
