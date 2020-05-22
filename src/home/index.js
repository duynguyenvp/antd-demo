import React, { Fragment, useState } from 'react'
import { Button } from 'antd';
import ChangePassword from './PopupChangePassword'
const Home = () => {
    const [visible, setVisible] = useState(false)

    const onOpen = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return <Fragment>
        <Button type="primary" onClick={onOpen}>
            Open Modal
        </Button>
        <ChangePassword visible={visible} onClose={onClose} />
    </Fragment>
}

export default Home