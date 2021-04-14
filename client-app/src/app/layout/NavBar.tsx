import React from 'react'; // because we want to return jsx
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar() {  // this function returns jsx; we export default to have access to the funciton else where
    

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item>
                    <Button positive content="Create Activity" as={NavLink} to='/createActivity' />
                </Menu.Item>
            </Container>
        </Menu>
    )

}