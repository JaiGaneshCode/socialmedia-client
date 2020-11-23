import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button, Table } from "semantic-ui-react";
import { GET_USERS } from "../utils/graphql";
import moment from "moment";

import { AuthContext } from "../context/auth";

function SearchResults({ searchValue, callback }) {
    const { user: authUser } = useContext(AuthContext);
    const { data: { getUsers } = {} } = useQuery(GET_USERS, {
        variables: {
            filter: searchValue,
        },
    });
    if (getUsers) {
        getUsers.map((user) => {
            if (
                user.friends.filter((friend) => friend.user.id === authUser.id)
                    .length > 0
            ) {
                user.actionname = "Friends";
                user.disableButton = true;
            } else if (
                user.friendRequests.filter(
                    (request) => request.user.id === authUser.id
                ).length > 0
            ) {
                user.actionname = "Request Sent";
                user.disableButton = true;
            } else {
                user.actionname = "Send Request";
                user.disableButton = false;
            }
        });

        return (
            <Table>
                <Table.Body>
                    {getUsers && getUsers.length > 0 ? (getUsers.map((user) => (
                        <Table.Row key={user.id} className="searchRow">
                            <Table.Cell>
                                <p className="ui">{user.username}</p>
                            </Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>
                                User since{" "}
                                {moment(user.createdAt).fromNow()}
                            </Table.Cell>
                            <Button
                                className="searchResultAction"
                                floated="right"
                                color="violet"
                                onClick={() => callback(user.id)}
                                disabled={user.disableButton}
                            >
                                {user.actionname}
                            </Button>
                        </Table.Row>
                        ))
                    ) : (
                        <Table.Row className="searchRow">
                        <Table.Cell>
                            <p className="ui">No Users Found !</p>
                        </Table.Cell>
                        </Table.Row> 
                    )}
                </Table.Body>
            </Table>
        );
    } else {
        return <p>Loading Results...</p>;
    }
}

export default SearchResults;
