import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

// input activity is being renamed to selectedActivity
export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) {

    // if the activity object is null we go into the {}
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
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
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onClick={handleSubmit} />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm}/>
            </Form>
        </Segment>
    );
}