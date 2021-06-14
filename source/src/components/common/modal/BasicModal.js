import React, {Component} from 'react';
import { Button, Modal } from 'antd';

class BasicModal extends Component {

    getTitle() {
        const { title, isEditing, objectName } = this.props;
        if(title) {
            return title;
        }
        const name = objectName || '';
        return isEditing ? `UPDATE ${name.toUpperCase()}` : `CREATE A NEW ${name.toUpperCase()}`;
    }

    render() {
        const { visible, onOk, onCancel, loading, children, objectName, width, top, formId, bodyStyle } = this.props;
        const formSubmitId = formId || `form-${objectName}`;
        let footerComponent = [<Button key="back" onClick={onCancel}>Close</Button>];
        if(onOk) {
            footerComponent.push(
                <Button key="submit" htmlType="submit" type="primary" loading={loading} form={formSubmitId}>
                    Save
                </Button>
            )
        }
        return (
            <Modal
                bodyStyle={bodyStyle || {}}
                destroyOnClose // rerender child component when modal close
                style={{ top: top || 40 }}
                width={width || 800}
                visible={visible}
                title={this.getTitle()}
                onOk={onOk}
                onCancel={onCancel}
                footer={footerComponent}
                >
                    {React.cloneElement(children, {
                        formId: formSubmitId,
                        onSubmit: onOk
                    })}
            </Modal>
        )
    }
}

export default BasicModal;
