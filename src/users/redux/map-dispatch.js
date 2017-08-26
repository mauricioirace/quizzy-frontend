import setUser from './set-user';

const mapDispatchToProps = (dispatch, props) => {
    return {
        setUser: (users) => dispatch(setUser(users))
    }
};

export default mapDispatchToProps;