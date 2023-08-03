import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Notification = ({ message }) => (
    <div style={{
        backgroundColor: 'black',
        width: '90%', borderRadius: '10px', margin: '30px auto'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
            <ul style={{ listStyle: 'none' }}>
                <li style={{
                    display: 'inline-block',
                    backgroundColor: 'black', margin: '15px', borderRadius: '50%',
                    color: 'white',
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '28px',
                    width: '75px',
                    fontSize: '20px',
                    backgroundColor: '#FFD700'
                }}>!</li>
            </ul>
            <div style={{
                marginLeft: '15px',
                color: 'white',
                fontSize: '14px'
            }}>
                {message}  <Link to='/my-orders' style={{color:'blue'}}>Click here </Link> to check your orders.
            </div>
        </div>
    </div>
);
Notification.defaultProps = {
    message: ''
};
Notification.propTypes = {
    message: PropTypes.string
};
export default Notification;