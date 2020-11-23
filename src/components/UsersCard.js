import { Grid, Card, Button } from "semantic-ui-react";
import moment from "moment";

import UserDetails from "../components/UserDetails";

function UsersCard({
    userList,
    header,
    description,
    momentText,
    emptylistmessage,
    buttonText,
    callback,
}) {
    return (
        <Card fluid className="popoutcard">
            <Card.Content>
                <Card.Header>{header}</Card.Header>
                <Card.Description>{description}</Card.Description>
                <hr />
                <Card.Content extra>
                    <Grid columns={3}>
                        <Grid.Row>
                            {userList.length > 0 ? (
                                userList.map((singleObject) => (
                                    <Grid.Column key={singleObject.id}>
                                        <UserDetails user={singleObject.user}>
                                            <Card.Meta>
                                                {momentText}{" "}
                                                {moment(
                                                    singleObject.createdAt
                                                ).fromNow()}
                                            </Card.Meta>
                                            {buttonText ? (
                                                <Button
                                                    floated="right"
                                                    color="violet"
                                                    onClick={()=>{callback(singleObject.user.id)}}
                                                >
                                                    {buttonText}
                                                </Button>
                                            ) : (
                                                <></>
                                            )}
                                        </UserDetails>
                                    </Grid.Column>
                                ))
                            ) : (
                                <Grid.Column>
                                    <p>{emptylistmessage}</p>
                                </Grid.Column>
                            )}
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card.Content>
        </Card>
    );
}

export default UsersCard;
