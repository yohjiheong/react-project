import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { Form, Input, Button, notification, Col, Typography } from 'antd';
import { SmileOutlined, MehOutlined } from '@ant-design/icons';


const { Title, Text } = Typography


function Register() {
    var [user, setUser] = useState({})

    var onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    var onSubmitHandler = (e) => {
        e.preventDefault()
        fetch('https://yohji-project.herokuapp.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            if (data.msg === "Registered Successfuly!") {
                notification.open({
                    message: 'Register Successful!',
                    description:
                    'Welcome to Fitness, Bud! Please Proceed to Login to view your dashboard!',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            } else {
                notification.open({
                    message: 'Oh Oh!',
                    description:
                    `Sorry Buddy. Something went wrong, try check for errors and register again perhaps? Or just proceed to login :D`,
                    icon: <MehOutlined style={{ color: '#108ee9' }} />,
                });
            }
        })
    }
    
    return (
        <div className='background'>
            <Col span={6} offset={7}>
                <Title> Register </Title>
            </Col>

            <Form labelCol={{ span: 7, }} wrapperCol={{ span: 12, }} autoComplete='off' className='form'>
                <Form.Item label="*Username" >
                    <Input name="username" onChange={onChangeHandler}/>
                </Form.Item>

                <Form.Item label="*Email" >
                    <Input name="email" htmltype="email" onChange={onChangeHandler}/>
                </Form.Item>

                <Form.Item label="*Password" >
                    <Input.Password name="password" onChange={onChangeHandler}/>
                </Form.Item>

                <Form.Item label="*Confirm Password" >
                    <Input.Password name="password2" onChange={onChangeHandler}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 7, span: 12, }} >
                    <Button htmltype="submit" onClick={onSubmitHandler} > Register </Button>
                    <div className='text'>
                        <Text italic>Have an account? <Link to="/login"> Login here! </Link> </Text>
                    </div>
                </Form.Item>
            </Form>

        </div>
    );
}

export default Register;