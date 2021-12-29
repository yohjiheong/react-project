import React, {useState} from 'react';
import { Modal, Button } from 'antd';

function LearnMore({data}) {
    // console.log(data)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };




    return (
        <div>
            <>
                <Button type="outlined" onClick={showModal}>
                    Learn More
                </Button>
                
                
                <Modal title="Nutrition Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    {data[0].name} : {data[0].amount} {data[0].unit}
                    <br/>
                    {data[1].name} : {data[1].amount} {data[1].unit}
                    <br/>
                    {data[5].name} : {data[5].amount} {data[5].unit}
                    <br/>
                    {data[9].name} : {data[9].amount} {data[9].unit}
                </Modal>
            </>
        </div>
    );
}

export default LearnMore;