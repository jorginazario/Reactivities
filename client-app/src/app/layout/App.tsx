import React, { useEffect, useState } from "react";
import { Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid'; //this package just comes in JavaScript and not in TypeScript
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // loading state at the beginning of launch
  const [submitting, setSubmitting] = useState(false);  // submitting data to our server

  useEffect(() => {
    // old way of creating request: (moved it into agent.ts) axios.get<Activity[]>("http://localhost:5000/api/activities")
    agent.Activities.list().then((response) => {
        // axios is making the request to the API (like postman)

        let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0]; //we're cleaning the date object
          activities.push(activity)
        })
        setActivities(activities);
        setLoading(false);
      });
  }, []); // the empty array ensures that this only runs once
  // if not we would be running this everytime we update the activities array

function handleSelectActivity(id: string) {
  setSelectedActivity(activities.find(x => x.id === id));
}

function handleCancelSelectActivity() {
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string) {
  // if we have an id we can go ahead and open the activity 
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
} 

function handleFormClose() {
  setEditMode(false);
}

function handleCreateOrEditActivity(activity: Activity) {

  // COMMUNICATE TO SERVER VIA AXIOS AGENT
  setSubmitting(true);
  if (activity.id) {
    agent.Activities.edit(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else { // remember that our newly created activity does not yet have and id!
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }

  // // UPDATING REACT STATES
  // activity.id // if this exists go to the line right below, if not go two line below
  //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) // this runs if we have an activity - in other words, when we are editing an activity
  //   // in the line above we are excluding the activity in our activities list where 
  //   : setActivities([...activities, {...activity, id: uuid()}]) //this runs if activity is null - in other words, when we create a new activity we add it to the end of our existing list
  //   // REMINDER ON SPREADER ... [...activities, activity] is the same as [activity1, activity2, activityXYZ, activity]
  // setEditMode(false);
  // setSelectedActivity(activity);
}

function handleDeleteActivity(id: string) {
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);
    setSelectedActivity(undefined);
  });

}

if (loading) return <LoadingComponents content='Loading app' />

  return (
    // we have an empty element below because React needs to deliver a single component every time
    <> 
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>  {/* (2em means 2 times the size of the current font) */}
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity} 
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
