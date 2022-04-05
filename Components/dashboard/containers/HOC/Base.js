import React from 'react';
import Base from '../Base';
import { connect } from 'react-redux';
import {store} from '../../../../../store';
import "../css/index.css";
const base = Component => {
    class ComponentBase extends React.Component {

        componentWillMount(){
            const { history } = this.props;
            const { signed } = store.getState().auth;
            if( !signed) history.replace("/admin/login");
        }
/* 
        componentWillUpdate(nextProps){
            const { history } = this.props;
            if( !nextProps.authorized || !nextProps.usuario || !nextProps.usuario.role.includes("admin")){
                history.replace("/login");
            }  
        } */

        render(){
            return (
                <Base history={this.props.history}>
                    <Component {...this.props} />
                </Base>
            )
        }
    }

    /* const mapStateToProps = state => ({
        authorized: state.auth.authorized,
        usuario: state.auth.usuario
    });
    return connect(mapStateToProps, actions)(ComponentBase); */
    return ComponentBase; 
}

export default base;