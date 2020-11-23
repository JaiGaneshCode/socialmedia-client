import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Grid, Image, Card } from "semantic-ui-react";

import {
    ACCEPT_FRIENDREQUEST,
    GET_USER,
    SEND_FRIEND_REQUEST,
    UNFRIEND_USER
} from "../utils/graphql";
import { AuthContext } from "../context/auth";
import UsersCard from "../components/UsersCard";
import SearchResults from "../components/SearchResults";
import ModifyUser from "../components/ModifyUser";

function Profile(props) {
    const [searchValue, setSearchValue] = useState("");
    const [popout, setPopOut] = useState(false);

    const { user } = useContext(AuthContext);

    if (!user) {
        props.history.push("/");
    }

    const userId = props.match.params.userId;

    
    const { loading, data: { getUsers } = {} } = useQuery(GET_USER, {
        variables: {
            userId: userId,
        }
    });

    const [
        sendRequestMutation,
        { data: { sendFriendRequest: sendData } = {} },
    ] = useMutation(SEND_FRIEND_REQUEST);

    const [
        acceptRequestMutation,
        { data: {acceptFriendRequest: acceptData} ={} },
    ] = useMutation(ACCEPT_FRIENDREQUEST);

    const [
        unFriendMutation,
        { data: {unFriendUser: unfriendData} ={} },
    ] = useMutation(UNFRIEND_USER);

    function searchOnChange(event) {
        setSearchValue(event.target.value);
        if (event.target.value.trim() !== "") {
            setPopOut(true);
        }
    }

    function searchOnBlur(event) {
        if (event.target.value.trim() !== "") {
            setPopOut(true);
        } else {
            setPopOut(false);
        }
    }

    function sendRequest(userId) {
        sendRequestMutation({ variables: { userId } });
        console.log("Send request: " + sendData);
    }

    function acceptRequest(userId) {
        acceptRequestMutation({ variables: { userId } });
        console.log("Accept Req : " + acceptData);
    }

    function unfriendUser(userId) {
        unFriendMutation({ variables: { userId } });
        console.log("UnFriend: " + unfriendData);
    }

    function unblockUser(userId) {
        console.log("UnBlok");
    }

    let returnData = "";

    if (!getUsers) {
        returnData = "<p>Loading Profile...</p>";
    } else {
        const {
            id: userId, 
            username, 
            email, 
            createdAt,
            friends,
            friendRequests,
            blockedUsers,
            file:{path}
        } = getUsers[0];

        returnData = (
            <>
                <div id="freeze" className={popout ? "freezeLayer" : ""}></div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Image
                                floated="right"
                                size="small"
                                src={path && path.trim()!='' ? (
                                    "http://localhost:4000/" + path
                                ):(
                                "https://react.semantic-ui.com/images/avatar/large/molly.png"
                                )}
                            />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{username}</Card.Header>
                                    <Card.Meta>
                                        {moment(createdAt).fromNow()}
                                    </Card.Meta>
                                    <Card.Description>{email}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ModifyUser userDetails={getUsers[0]}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <Card
                                className={popout ? "popout" : "popoutcard"}
                                fluid
                            >
                                <Card.Content>
                                    <Card.Header>
                                        Search for friends...
                                    </Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className="ui action input fluid">
                                        <input
                                            className={loading ? "loading" : ""}
                                            id="searchbox"
                                            type="text"
                                            placeholder="Search..."
                                            name="searchValue"
                                            value={searchValue}
                                            onChange={searchOnChange}
                                            onBlur={searchOnBlur}
                                            onFocus={() => setPopOut(true)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div
                                        className={
                                            searchValue.trim() !== ""
                                                ? "resultsData"
                                                : "hide"
                                        }
                                    >
                                        {searchValue.trim() !== "" ? (
                                            <SearchResults
                                                searchValue={searchValue}
                                                callback={sendRequest}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <UsersCard
                                userList={friendRequests}
                                header="Friend Requests"
                                description="List of all friend requests !"
                                momentText="Sent"
                                emptylistmessage="No friend requests !"
                                buttonText="Accept !"
                                callback={acceptRequest}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <UsersCard
                                userList={friends}
                                header="Friends"
                                description="List of all friends !"
                                momentText="Accepted"
                                emptylistmessage="No friends !"
                                buttonText="Unfriend !"
                                callback={unfriendUser}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <UsersCard
                                userList={blockedUsers}
                                header="Blocked Users"
                                description="List of users you blocked !"
                                emptylistmessage="No blocked users !"
                                buttonText="Unblock !"
                                callback={unblockUser}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }

    return returnData;
}

export default Profile;
