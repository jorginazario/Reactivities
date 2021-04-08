import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// this props is needed to tell our component that is can expect to be passed down a variable input of that type


// interface Props {
//     activity: Activity;
// }

export default observer(function ActivityDashboard() {


  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  // I am passing down a property to my React component. In this case the prop is going to be called activities and it will be of type Props, defined above
  return (
    <Grid>
      {/* 16 column grid in semantic ui */}
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {/* the syntax shown in the line below is what we use to make components appear or disappear */}
        {/* if we have an activity selected we can show the Activity Details component on the right hand side  */}
        { selectedActivity && !editMode  &&(
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
})
