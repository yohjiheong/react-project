import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, notification, Typography, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import "../../App.css";


const { Text, Title } = Typography;


function Login({handleLogin}) {

    var [user, setUser] = useState({})

    var navigate = useNavigate()

    var onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    var onSubmitHandler = (e) => {
        e.preventDefault()
        // alert('working')
        fetch('https://yohji-project.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            handleLogin(data.token)
            notification.open({
                message: 'Hooray!',
                description:
                  `Good to see you again, ${user.username}!`,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
            navigate('/dashboard')
        })
    }
    
    return (
        <>
            <div className='background'>
                <Col span={8} offset={8}>
                    <Title> Login </Title>
                </Col>

                <Form labelCol={{ span: 8, }} wrapperCol={{ span: 10, }} autoComplete='off' className='form' >
                    <Form.Item label="Username" rules={[{required: true, message: 'Please input your username!',},]} >
                        <Input name="username" onChange={onChangeHandler} className='input' />
                    </Form.Item>

                    <Form.Item label="Password" rules={[{required: true, message: 'Please input your username!',},]} >
                        <Input.Password name="password" onChange={onChangeHandler} className='input' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 10, }} >
                        <Button htmltype="submit" onClick={onSubmitHandler} > Log me In! </Button>
                        <div className='text'>
                            <Text italic>Don't have an account? <Link to="/register"> Register here! </Link> </Text>
                        </div>
                    </Form.Item>
                </Form>


            </div>
        </>
    );
}

export default Login;