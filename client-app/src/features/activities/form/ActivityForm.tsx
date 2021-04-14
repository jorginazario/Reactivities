import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid"; //this package just comes in JavaScript and not in TypeScript


// input activity is being renamed to selectedActivity
export default observer( function ActivityForm() {

    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity } = activityStore;
    const { id } = useParams<{id: string}>();
    
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then((activity) => setActivity(activity!)) 
            // activity! we know it will not be undefined
        } 
    }, [id, loadActivity]); 
    // as long as id & loadActivity do not change, the code above will only run once

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity, 
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            });
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target; // this comes from the form INPUT field
        setActivity({...activity, [name]: value})
    }

    // function handleInputChangeDropdown(event: SyntheticEvent, data: any) {

    //     const name: any = event.target;
        
    //     const value = data.value;

    //     setActivity({...activity, [name]: value})
    //     // const {name, value} = event.target; // this comes from the form INPUT field
    //     // setActivity({...activity, [name]: value})
    // }

    // const options = [
    //     { key: 1, text: 'culture', value: 'culture' },
    //     { key: 2, text: 'drinks', value: 'drinks'},
    //     { key: 3, text: 'film', value: 'film' }
    //   ]

    return (

        <Segment clearing>
            {/* the 'clearing' above solves an issue with a button floating out of the form */}
            <Form>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>

                {/* <Form.Dropdown clearable selection options={options} placeholder='Category' name='category' onChange={handleInputChangeDropdown}/> */}

                <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' onClick={() => handleSubmit()} />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    );
})