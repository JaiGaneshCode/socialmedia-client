import React from 'react'
import {Popup} from 'semantic-ui-react'

function MyPopUp(props){
    return <Popup inverted content={props.content} trigger={props.children}/>;
}

export default MyPopUp;