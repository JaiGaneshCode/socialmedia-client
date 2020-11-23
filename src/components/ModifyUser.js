import { useMutation } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { Modal, Image, Header, Button, Form } from "semantic-ui-react";

import FileUpload from "./FileUpload";
import { useNotificationState } from '../context/notification';
import { useForm } from '../utils/hooks';
import { MODIFY_USER } from '../utils/graphql';

function ModifyUser({userDetails}) {
    //const  { userDetails } = useNotificationState();
    //console.log(userDetails);
    const [open, setOpen] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [modifyUserMutation, { loading, errors = {} }] = useMutation(MODIFY_USER);
    const { id, username, email, file: fileDetails }= userDetails
    const file = fileDetails.id
    const modifyDetails = { id, username, email, file }
    const {onChange, onSubmit, values } = useForm(modifyUser, modifyDetails);

    useEffect(() => {
        setImagePath("http://localhost:4000/" + userDetails.file.path)
    });

    function uploadCallBack(data){
        values.file=data.id
    }

    function modifyUser(){
        modifyUserMutation({
            variables: values,
            update: (cache, data) => {
                console.log(data);
                
            }
        })
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Modify Profile</Button>}
        >
            <Modal.Header>Modify Profile</Modal.Header>
            <Modal.Content image>
                <FileUpload imagePath={imagePath} uploadCallBack={(data) => uploadCallBack(data)} />
                <Modal.Description>
                        <Form
                            noValidate
                            className={loading ? "loading" : ""}
                        >
                            <Form.Input
                                type="hidden"
                                className="hide"
                                name="fileId"
                                value={values.file.id}
                            />
                            <Form.Input
                                type="hidden"
                                className="hide"
                                name="userId"
                                value={values.id}
                            />
                            <Form.Input
                                type="text"
                                label="Username"
                                placeholder="Usernname"
                                name="username"
                                value={values.username}
                                error={errors.username ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                type="text"
                                label="Email"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                error={errors.email ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                type="password"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                error={errors.password ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                onChange={onChange}
                            />
                        </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                </Button>
                <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={(event) => {onSubmit(event);setOpen(false);}}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ModifyUser;
