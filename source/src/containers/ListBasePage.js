import React, { Component } from 'react'

import { Modal, Divider, Button } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    LockOutlined,
    PictureOutlined,
    CheckOutlined,
} from '@ant-design/icons'
import qs from 'query-string'

import SearchForm from '../components/common/entryForm/SearchForm'
import StatusTag from '../components/common/elements/StatusTag'

import { showErrorMessage, showSuccessMessage } from '../services/notifyService'
import {
    DEFAULT_TABLE_ITEM_SIZE,
    STATUS_ACTIVE,
    STATUS_LOCK,
} from '../constants'

const { confirm } = Modal

class ListBasePage extends Component {
    initialSearch() {
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
        }

        this.objectName = ''
        this.isEditing = false
        this.dataDetail = {}
        this.breadcrumbs = []
        this.columns = []
        this.pagination = { pageSize: DEFAULT_TABLE_ITEM_SIZE }
        this.search = this.initialSearch()
        this.actionColumns = {
            isEdit: true,
            isDelete: false,
            isChangeStatus: true,
        }
        this.getList = this.getList.bind(this)
        this.loadDataTable = this.loadDataTable.bind(this)
        this.getDetail = this.getDetail.bind(this)

        this.renderIdColumn = this.renderIdColumn.bind(this)
        this.renderActionColumn = this.renderActionColumn.bind(this)
        this.renderSearchForm = this.renderSearchForm.bind(this)
        this.renderImageColumn = this.renderImageColumn.bind(this)

        this.onOkModal = this.onOkModal.bind(this)
        this.onCancelModal = this.onCancelModal.bind(this)
        this.onModifyCompleted = this.onModifyCompleted.bind(this)
        this.onModifyError = this.onModifyError.bind(this)

        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onResetFormSearch = this.onResetFormSearch.bind(this)
        this.setQueryString = this.setQueryString.bind(this)
        this.onDeleteCompleted = this.onDeleteCompleted.bind(this)
        this.onDeleteError = this.onDeleteError.bind(this)
        this.onChangeStatusCompleted = this.onChangeStatusCompleted.bind(this)
        this.onChangeStatusError = this.onChangeStatusError.bind(this)

        this.handleTableChange = this.handleTableChange.bind(this)
        this.onShowModifiedModal = this.onShowModifiedModal.bind(this)
    }

    componentWillMount() {
        const { changeBreadcrumb } = this.props
        if (this.breadcrumbs.length > 0) {
            changeBreadcrumb(this.breadcrumbs)
        }
        this.loadDataTable(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            this.loadDataTable(nextProps)
        }
    }

    loadDataTable(currentProps) {
        const queryString = qs.parse(currentProps.location.search)
        this.pagination.current = 1
        if (!isNaN(queryString.page))
            this.pagination.current = parseInt(queryString.page)
        Object.keys(this.search).forEach(
            key => (this.search[key] = queryString[key])
        )
        this.getList()
    }

    handleTableChange(pagination, filters, sorter) {
        const pager = { ...this.pagination }
        pager.current = pagination.current
        this.pagination = pager
        this.setQueryString()
    }

    getList() {
        const { getDataList } = this.props
        const page = this.pagination.current ? this.pagination.current - 1 : 0
        const params = {
            page,
            size: this.pagination.pageSize,
            search: this.search,
        }
        getDataList({ params })
    }

    getDetail(id) {
        const { getDataById, showFullScreenLoading, hideFullScreenLoading } =
            this.props
        const params = { id }
        showFullScreenLoading()
        getDataById({
            params,
            onCompleted: ({ data }) => {
                this.dataDetail = this.getDataDetailMapping(data)
                this.onShowModifiedModal(true)
                hideFullScreenLoading()
            },
            onError: err => {
                if (err && err.message) showErrorMessage(err.message)
                else
                    showErrorMessage(
                        `${this.getActionName()} ${
                            this.objectName
                        } failed. Please try again!`
                    )
                hideFullScreenLoading()
            },
        })
    }

    getSearchFields() {
        return []
    }

    onShowModifiedModal(isEditing) {
        this.isEditing = isEditing
        this.setState({ isShowModifiedModal: true })
    }

    getDataDetailMapping(data) {
        return data
    }

    prepareCreateData(data) {
        return data
    }

    prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
        }
    }

    getActionName() {
        return this.isEditing ? 'Update' : 'Create'
    }

    onModifyCompleted(responseData) {
        if (responseData) {
            this.onCancelModal()
            this.getList()
            showSuccessMessage(
                `${this.getActionName()} ${this.objectName} successful!`
            )
        } else {
            this.setState({ isShowModifiedLoading: false })
            showErrorMessage(
                `${this.getActionName()} ${
                    this.objectName
                } failed. Please try again!`
            )
        }
    }

    onModifyError(err) {
        this.setState({ isShowModifiedLoading: false })
        if (err && err.message) showErrorMessage(err.message)
        else
            showErrorMessage(
                `${this.getActionName()} ${
                    this.objectName
                } failed. Please try again!`
            )
    }

    onChangeStatusCompleted(status) {
        const action = status === STATUS_ACTIVE ? 'Active' : 'Lock'
        this.getList()
        showSuccessMessage(`${action} ${this.objectName} successful!`)
    }

    onChangeStatusError(status, err) {
        const action = status === STATUS_ACTIVE ? 'Active' : 'Lock'
        if (err) showErrorMessage(err.message)
        else
            showErrorMessage(
                `${action} ${this.objectName} failed. Please try again!`
            )
    }

    onDeleteCompleted() {
        const { dataList } = this.props
        if (
            dataList &&
            this.pagination.current > 0 &&
            dataList.content &&
            dataList.content.length === 1
        ) {
            this.pagination.current = this.pagination.current - 1
            this.setQueryString()
        } else {
            this.getList()
        }

        showSuccessMessage(`Delete ${this.objectName} successful!`)
    }

    onDeleteError() {
        showErrorMessage(`Delete ${this.objectName} failed. Please try again!`)
    }

    onOkModal(values) {
        const { createData, updateData } = this.props
        this.setState({ isShowModifiedLoading: true })
        if (this.isEditing) {
            updateData({
                params: this.prepareUpdateData(values),
                onCompleted: this.onModifyCompleted,
                onError: this.onModifyError,
            })
        } else {
            createData({
                params: this.prepareCreateData(values),
                onCompleted: this.onModifyCompleted,
                onError: this.onModifyError,
            })
        }
    }

    onChangeStatus(data) {
        const { updateStatus } = this.props
        if (data.id) {
            const status =
                data.status === STATUS_ACTIVE ? STATUS_LOCK : STATUS_ACTIVE
            updateStatus({
                params: { objectId: data.id, status },
                onCompleted: () => this.onChangeStatusCompleted(status),
                onError: err => this.onChangeStatusError(status, err),
            })
        }
    }

    onDelete(id) {
        const { deleteData } = this.props
        if (id) {
            deleteData({
                params: { id },
                onCompleted: this.onDeleteCompleted,
                onError: this.onDeleteError,
            })
        }
    }

    setQueryString() {
        const {
            location: { pathname, search },
            history,
        } = this.props
        const queryString = qs.parse(search)
        let newQsValue = {}
        if (this.pagination.current > 1) {
            newQsValue.page = this.pagination.current
        } else {
            delete queryString.page
        }
        newQsValue = Object.assign(queryString, newQsValue, this.search)

        if (Object.keys(newQsValue).length > 0) {
            Object.keys(newQsValue).forEach(key => {
                if (!newQsValue[key]) delete newQsValue[key]
            })
        }

        if (Object.keys(newQsValue).length > 0)
            history.push(`${pathname}?${qs.stringify(newQsValue)}`)
        else history.push(pathname)
    }

    onSearch(values) {
        this.search = values
        this.pagination.current = 1
        this.setQueryString()
    }

    onResetFormSearch() {
        this.search = this.initialSearch()
        this.pagination.current = 1
        this.setQueryString()
    }

    onCancelModal() {
        this.setState({
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
        })
    }

    showChangeStatusConfirm(data) {
        const action = data.status === STATUS_ACTIVE ? 'lock' : 'activate'
        confirm({
            title: `Are you sure to ${action} this ${this.objectName}?`,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.onChangeStatus(data)
            },
            onCancel() {
                // console.log('Cancel');
            },
        })
    }

    showDeleteConfirm(id) {
        confirm({
            title: `Are you sure delete this ${this.objectName}?`,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.onDelete(id)
            },
            onCancel() {
                // console.log('Cancel');
            },
        })
    }

    renderActionColumn() {
        return {
            title: 'Action',
            width: '100px',
            render: dataRow => {
                const actionColumns = []
                if (this.actionColumns.isEdit) {
                    actionColumns.push(
                        <Button
                            type="link"
                            onClick={() => this.getDetail(dataRow.id)}
                            className="no-padding"
                        >
                            <EditOutlined />
                        </Button>
                    )
                }
                if (this.actionColumns.isChangeStatus) {
                    actionColumns.push(
                        <Button
                            type="link"
                            onClick={() =>
                                this.showChangeStatusConfirm(dataRow)
                            }
                            className="no-padding"
                        >
                            {dataRow.status === STATUS_ACTIVE ? (
                                <LockOutlined />
                            ) : (
                                <CheckOutlined />
                            )}
                        </Button>
                    )
                }
                if (this.actionColumns.isDelete) {
                    actionColumns.push(
                        <Button
                            type="link"
                            onClick={() => this.showDeleteConfirm(dataRow.id)}
                            className="no-padding"
                        >
                            <DeleteOutlined />
                        </Button>
                    )
                }
                const actionColumnsWithDivider = []
                actionColumns.forEach((action, index) => {
                    actionColumnsWithDivider.push(action)
                    if (index !== actionColumns.length - 1) {
                        actionColumnsWithDivider.push(
                            <Divider type="vertical" />
                        )
                    }
                })
                return (
                    <span>
                        {actionColumnsWithDivider.map((action, index) => (
                            <span key={index}>{action}</span>
                        ))}
                    </span>
                )
            },
        }
    }

    renderSearchForm(hiddenAction) {
        const searchFields = this.getSearchFields()

        if (searchFields.length > 0)
            return (
                <SearchForm
                    searchFields={searchFields}
                    onSubmit={this.onSearch}
                    onResetForm={this.onResetFormSearch}
                    hiddenAction={hiddenAction}
                    initialValues={this.search}
                />
            )
        return null
    }

    renderImageColumn(value) {
        if (value) return <img className="img-col" src={value} alt="" />
        return <PictureOutlined className="empty-img-col" />
    }

    renderStatusColumn() {
        return {
            title: 'Status',
            dataIndex: 'status',
            width: '100px',
            render: status => <StatusTag status={status} />,
        }
    }

    renderIdColumn() {
        return {
            title: 'ID',
            dataIndex: 'id',
            width: '50px',
            align: 'center',
        }
    }
}

export default ListBasePage
