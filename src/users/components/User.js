import React from 'react';

export default class User extends React.PureComponent{
    constructor(props){
        super(props);

        console.log('usuario');
        console.log(this.props.user);
        console.log('fin usuario');
    }
    render(){
        return(
            <label>
                Email:{this.props.user.email}
            </label>
        );
    }
}