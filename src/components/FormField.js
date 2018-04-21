import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CloseCircle from 'material-ui/svg-icons/navigation/cancel';

export default class FormField extends Component {
    state = {
        value: "Twin",
    };

    handleSelectChange = (event, index, value) => {
        this.setState({value});
        this.props.save('select', value);
    };

    handleNumberChange = (event, value) => {
        this.props.save('number', value);
    };

    componentDidMount() {
        this.props.save('select', this.state.value);
    }

    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '70%'}}>
                <SelectField style = {{width: 150}}
                    value={this.state.value}
                    onChange={this.handleSelectChange}
                    id={'selectId'}
                >
                    <MenuItem value={"Twin"} primaryText="Twin" />
                    <MenuItem value={"Tripple"} primaryText="Tripple" />
                    <MenuItem value={"Quadro"} primaryText="Quadro" />
                </SelectField>
                <TextField
                    type="number"
                    onChange={this.handleNumberChange}
                    style = {{width: 50}}
                    id={'textId'}
                />
                <IconButton
                    onClick={this.props.onClick}
                    iconStyle={{width: '35px', height: '35px', color: '#f7cfd0', background: 'radial-gradient(circle, red, white, white)'}}
                >
                    <CloseCircle />
                </IconButton>
            </div>
        );
    }
}