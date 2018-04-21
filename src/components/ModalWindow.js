import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormField from './FormField';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class DialogExampleModal extends React.Component {
    state = {
        open: false,
        fieldIds: [],
        counter: 0,
        storedForm: {},
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        const newState = Object.assign({}, this.state, { open: false, storedForm: {}, fieldIds: [] });
        this.setState(newState);
    };

    handleSave = () => {
        console.log("~~~ Your form could have been saved here! ~~~", this.state.storedForm);
        const newState = Object.assign({}, this.state, { open: false, storedForm: {}, fieldIds: [] });
        this.setState(newState);
    };

    addField = () => {
        this.setState({
            open: true,
            fieldIds: this.state.fieldIds.concat(this.state.counter),
            counter: this.state.counter + 1,
            storedForm: this.state.storedForm
        })
    };

    removeField (fieldId) {

        // delete field
        const fieldsClone = this.state.fieldIds.slice();
        const itemIndex = fieldsClone.indexOf(fieldId);
        fieldsClone.splice(itemIndex, 1);

        // delete saved inputs
        const storedFormClone = Object.assign({}, this.state.storedForm);
        delete storedFormClone[`select${fieldId}`];
        delete storedFormClone[`number${fieldId}`];
        this.setState({
            open: true,
            fieldIds: fieldsClone,
            counter: this.state.counter,
            storedForm: storedFormClone
        })
    };

    saveInput (id, type, value) {
        const inputKey = type + id;
        this.setState({
            open: true,
            fieldIds: this.state.fieldIds,
            counter: this.state.counter,
            storedForm: Object.assign({}, this.state.storedForm, { [inputKey]: value })
        })
    }

    saveTitle = (event, value) => {
        this.setState({
            open: true,
            fieldIds: this.state.fieldIds,
            counter: this.state.counter,
            storedForm: Object.assign({}, this.state.storedForm, { title: value })
        })
    };

    render() {
        const actions = [
            <div style={{display: 'flex', paddingLeft: '16px'}}>
            <FlatButton
                label="Сохранить"
                primary={true}
                onClick={this.handleSave}
                hoverColor="rgb(5, 163, 183)"
                backgroundColor="rgb(0, 188, 212)"
                style={{color: 'white', marginRight: '10px'}}
            />
            <FlatButton
                label="Отмена"
                onClick={this.handleClose}
            />
            </div>
        ];

        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="Modal Popup" onClick={this.handleOpen} />
                    <Dialog style={{width: '600px'}}
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        <div style={{position: 'relative', display: 'inline-block'}}>
                            <IconButton
                                style={{position: 'absolute', right: 10, top: 0, width: 20, height: 20, zIndex: 100, marginRight: '10px'}}
                                onClick={this.handleClose}>
                                <NavigationClose/>
                            </IconButton>
                            <div style={{background: '#dcdde4', padding: '0 10px', borderRadius: '5px'}}>
                                <TextField
                                    hintText="Структура номеров"
                                    onChange={this.saveTitle}
                                    style={{width: '300px'}}
                                    underlineShow={false}
                                />
                            </div>
                        </div>
                        {
                            this.state.fieldIds.map((fieldId) => (
                                <FormField key={fieldId} onClick={() => this.removeField(fieldId)} save={this.saveInput.bind(this, fieldId)}/>
                            ))
                        }
                        <div>
                            <FlatButton
                                label="Добавить"
                                primary={true}
                                onClick={this.addField}
                                style={{marginTop: '10px'}}
                            />
                        </div>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}