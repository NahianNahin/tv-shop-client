import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn bg-gradient-to-r from-primary to-secondary border-0 text-base-100 rounded-0">{children}</button>
    );
};

export default PrimaryButton;