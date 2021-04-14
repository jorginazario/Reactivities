import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

import ActivityList from "./ActivityList";

// this props is needed to tell our component that is can expect to be passed down a variable input of that type

// interface Props {
//     activity: Activity;
// }

export default observer(function ActivityDashboard() {
  // SUPER IMPORTANT: THIS GIVES US ACCESS TO THE ACTIVITY STORE / REACT CONTEXT
  const { activityStore } = useStore();
  const { loadActivities, loadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]); // the empty array ensures that this only runs once
  // if not we would be running this everytime we update the activities array

  if (loadingInitial) {
    return <LoadingComponents content="Loading app" />;
  }

  // I am passing down a property to my React component. In this case the prop is going to be called activities and it will be of type Props, defined above
  return (
    <Grid>
      {/* 16 column grid in semantic ui */}
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity Filters</h2>
        {/* the syntax shown in the line below is what we use to make components appear or disappear */}
        {/* if we have an activity selected we can show the Activity Details component on the right hand side  */}
        {/* {selectedActivity && !editMode && <ActivityDetails />} */}
        {/* {editMode && <ActivityForm />} */}
      </Grid.Column>
    </Grid>
  );
});
