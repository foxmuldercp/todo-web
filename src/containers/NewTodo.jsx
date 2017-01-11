import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import moment from 'moment'

import {CreateTodo} from '../actions/todos'

import { LocaleProvider, Col, Button, Form, Input, DatePicker, Icon, message } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

const createForm = Form.create
const FormItem = Form.Item

let NewTodo = React.createClass({

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(CreateTodo(this.props.form.getFieldsValue()))
  },

  render() {
    const { getFieldDecorator } = this.props.form

    return (
        <LocaleProvider locale={enUS}>
          <Form inline onSubmit={this.handleSubmit}>
            <Col lg={{span: 4, offset: 5}}>
              <FormItem>
                {getFieldDecorator('comment', { initialValue: '' })(
                  <Input addonBefore={<Icon type="edit" />} type="text" placeholder="Enter comment here"
                    required={true} />
                )}
              </FormItem>
            </Col>
            <Col lg={{span: 4, offset: 2}}>
              <FormItem>
                {getFieldDecorator('date_end') (
                  <DatePicker addonBefore={<Icon type="calendar" />} allowClear={true} format="YYYY-MM-DD" />
                )}
              </FormItem>
            </Col>
            <Col lg={{span: 4, offset: 2}}>
              <FormItem>
                <Button type="primary" htmlType="submit">Create</Button>
              </FormItem>
            </Col>
          </Form>
        </LocaleProvider>
    )
  }
})

NewTodo = createForm()(NewTodo)

export default NewTodo
