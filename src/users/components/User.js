import React from 'react';

class User extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <label>
                Email:{this.props.user.email}
            </label>
        );
    }
}

export default User;