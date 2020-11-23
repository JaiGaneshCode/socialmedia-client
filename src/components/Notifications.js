import { useNotificationState } from '../context/notification';

function Notification(){
    const { userDetails } = useNotificationState();

    if(userDetails){
        return <p>{userDetails.friendRequests.length}</p>
    }else{
        return <p>0</p>
    }
}

export default Notification;