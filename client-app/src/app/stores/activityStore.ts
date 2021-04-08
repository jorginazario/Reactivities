import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid"; //this package just comes in JavaScript and not in TypeScript

// the activity store is a class with objects that have a state and need to be managed
export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;
  submitting = false;


  constructor() {
    // makeObservable(this, {
    //     title: observable,
    //     setExclamation: action
    // });

    makeAutoObservable(this); // we can type less, the system interprets what are actions and what are observables
    // 'this' refers to the class
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        //this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  // ################# Handling object states with custom functions for each

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  
  // #######################################
  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };
  
  // setActivities = (activities: Activity[]) => {
  //   this.activities = activities;
  // };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  }

  closeForm = () => {
      this.editMode = false;
  }

  createActivity = async (activity: Activity) => {
    runInAction(() => {
      this.loading = true;
    })
    activity.id = uuid();
    try {
      await agent.Activities.create(activity); //this returns a promise 

      runInAction(() => { // we use runInAction() because this is the only way to modify state changes in an asynchronous method
        //this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false;
      }) 
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  updateActivity = async (activity: Activity) => {
    runInAction(() => {
      this.loading = true;
    })
    try {
      await agent.Activities.edit(activity); //this returns a promise 
      runInAction(() => { // we use runInAction() because this is the only way to modify state changes in an asynchronous method
        //this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false  
      }) 
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  deleteActivity = async (id: string) => {
    runInAction(() => {
      this.loading = true;
    })
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        //this.activities = this.activities.filter(a => a.id !== id) // give me all the activities where that don't match to our id we're deleting

        this.activityRegistry.delete(id);
        this.loading = false
      })
    } catch (error) {
      console.log(error);
      this.loading = false
    }
  }
}

