import { Card } from "semantic-ui-react";


function UserDetails( { user: {id, username, email, createdAt }, children } ){
    return (
        <Card>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{email}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                {children}
            </Card.Content>
        </Card>
    )
}

export default UserDetails;