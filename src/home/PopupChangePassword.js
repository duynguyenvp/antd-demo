import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

function validatePassword(pass) {
    if (pass) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
    return {
        validateStatus: 'error',
        errorMsg: 'Vui lòng nhập mật khẩu hiện tại!',
    };
}
function validateNewPassword(pass) {
    if (pass) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
    return {
        validateStatus: 'error',
        errorMsg: 'Vui lòng nhập mật khẩu mới!',
    };
}
function validateConfirmPassword(confirmPassword, newPassword) {
    if (!confirmPassword) {
        return {
            validateStatus: 'error',
            errorMsg: 'Vui lòng nhập mật khẩu mới!',
        };
    }
    if (confirmPassword !== newPassword) {
        return {
            validateStatus: 'error',
            errorMsg: 'Mật khẩu mới không trùng khớp!',
        };
    }
    return {
        validateStatus: 'success',
        errorMsg: null,
    };
}

function defaultValue() {
    return {
        value: '',
    }
}
const ChangePassword = ({ visible, onClose }) => {
    const [password, setPassword] = useState(defaultValue());
    const [newPassword, setNewPassword] = useState(defaultValue());
    const [confirmPassword, setConfirmPassword] = useState(defaultValue());

    const onPassChange = value => {
        console.log(value)
        setPassword({
            ...validatePassword(value),
            value,
        });
    };

    const onNewPassChange = value => {
        setNewPassword({
            ...validateNewPassword(value),
            value,
        });
    };

    const onConfirmPassChange = value => {
        setConfirmPassword({
            ...validateConfirmPassword(value, newPassword.value),
            value,
        });
    };

    const handleOk = e => {
        if (password.validateStatus != "success"
            || newPassword.validateStatus != "success"
            || confirmPassword.validateStatus != "success") {
            return
        }
        console.log(password, newPassword, confirmPassword)
    };

    const handleReset = e => {
        onClose()
    };
    return <Modal
        title="Đổi mật khẩu"
        visible={visible}
        cancelText="Đóng"
        okText="Lưu"
        onOk={handleOk}
        onCancel={handleReset}
    >
        <Form
            {...layout}
            name="basic"
        >
            <Form.Item
                label="Mật khẩu"
                hasFeedback
                validateStatus={password.validateStatus}
                help={password.errorMsg}>
                <Input.Password
                    allowClear
                    placeholder="Mật khẩu ..."
                    value={password.value}
                    onChange={event => { onPassChange(event.target.value) }} />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                hasFeedback
                validateStatus={newPassword.validateStatus}
                help={newPassword.errorMsg}>
                <Input.Password
                    allowClear
                    placeholder="Mật khẩu mới ..."
                    value={newPassword.value}
                    onChange={event => { onNewPassChange(event.target.value) }} />
            </Form.Item>
            <Form.Item
                label="Nhập lại mật khẩu mới"
                hasFeedback
                validateStatus={confirmPassword.validateStatus}
                help={confirmPassword.errorMsg}>
                <Input.Password
                    allowClear
                    placeholder="Mật khẩu mới ..."
                    value={confirmPassword.value}
                    onChange={event => { onConfirmPassChange(event.target.value) }} />
            </Form.Item>
        </Form>
    </Modal>
}

export default ChangePassword