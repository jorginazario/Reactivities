import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// this props is needed to tell our component that is can expect to be passed down a variable input of that type
interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

// interface Props {
//     activity: Activity;
// }

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity, 
  submitting
}: Props) {
  // I am passing down a property to my React component. In this case the prop is going to be called activities and it will be of type Props, defined above
  return (
    <Grid>
      {/* 16 column grid in semantic ui */}
      <Grid.Column width="10">
        <ActivityList activities={activities} 
          selectActivity={selectActivity} 
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {/* the syntax shown in the line below is what we use to make components appear or disappear */}
        {/* if we have an activity selected we can show the Activity Details component on the right hand side  */}
        {selectedActivity && !editMode  &&(
          <ActivityDetails
            activity={selectedActivity} 
            cancelSelectActivity={cancelSelectActivity}
            // add this to be able to open a form from the activity details
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} 
            activity={selectedActivity} 
            createOrEdit={createOrEdit} 
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
