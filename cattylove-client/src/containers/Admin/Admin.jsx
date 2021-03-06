import { WarningFilled } from '@ant-design/icons';
import { Button, Modal, PageHeader } from 'antd';
import axios from '../../utility/axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminCatList from '../../components/AdminCatList/AdminCatList';
import { toast } from 'react-toastify';
import getAdminHeader from '../../utility/getAdminHeader';

const Admin = () => {

    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const { confirm } = Modal

    const deleteHandler = id => {
        const headers = getAdminHeader()
        if(headers) {
            confirm({
                title: 'Are you sure you want to delete?',
                icon: <WarningFilled />,
                content: 'You cannot revert this change.',
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        axios.delete(`cats/${id}`, { headers })
                            .then(res => {
                                const updatedCats = cats.filter(cat => cat._id !== id)
                                setCats(updatedCats)
                                return resolve()
                            })
                            .catch(err => {
                                return reject(err)
                            })
                    }).catch(err => {
                        toast.error(`${err.response?.status}: ${err.response?.data}`, { position: 'bottom-center', theme: 'dark' });
                    });
                },
                okText: 'Yes'
            });
        }
        else {
            toast.warning('Your login session has expired. Please login again!', { position: 'bottom-center', theme: 'dark' });
            navigate('/admin/login', { replace: true })
        }
    }

    useState(() => {
        axios.get('cats')
            .then(res => {
                setCats(res.data)
            })
            .catch(err => {
                toast.error(`${err.response?.status}: ${err.response?.data}`, { position: 'bottom-center', theme: 'dark' });
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <PageHeader
                title={'Cat Adoption List'}
                extra={<Link to={'/admin/add'}><Button key="1" type="primary"> Add a cat for adoption </Button></Link>} />
            <AdminCatList loading={loading} error={error} onDelete={deleteHandler} cats={cats} />
        </div>
    );
};

export default Admin;