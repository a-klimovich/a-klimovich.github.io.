import { useCallback, useState } from "react";
import { Form, Input, Button, Checkbox, Space, Row, Col } from "antd";
import { initialValues, validation } from "./config";

const { TextArea } = Input;

const layout = {
  gutter: {
    sm: 10,
    md: 15,
    lg: 20,
  },
  col: {
    span: 24,
    sm: 12,
  },
};

const ContactForm = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(initialValues.privacyPolicy);

  const onCheckboxChange = async (e) => {
    await setChecked(e.target.checked);
  };

  const onFinish = useCallback(
    (values) => {
      console.log({ ...values, privacyPolicy: checked });
    },
    [checked]
  );

  return (
    <Form
      initialValues={initialValues}
      form={form}
      name='contactForm'
      layout='vertical'
      validateTrigger='onSubmit'
      onFinish={onFinish}
    >
      <Row gutter={layout.gutter}>
        <Col {...layout.col}>
          <Form.Item name='name' label='Imię' rules={[validation.name]}>
            <Input />
          </Form.Item>
        </Col>
        <Col {...layout.col}>
          <Form.Item name='lastname' label='Nazwisko' rules={[validation.lastName]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={layout.gutter}>
        <Col {...layout.col}>
          <Form.Item name='email' label='Email' rules={[validation.email]}>
            <Input />
          </Form.Item>
        </Col>
        <Col {...layout.col}>
          <Form.Item name='phone' label='Numer telefonu' rules={[validation.phone]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name='message' label='Wiadomość'>
        <TextArea autoSize={{ minRows: 5, maxRows: 8 }} />
      </Form.Item>

      <Form.Item name='privacyPolicy' rules={[validation.privacyPolicy(checked)]}>
        <Checkbox checked={checked} onChange={onCheckboxChange}>
          Akceptuję politykę prywatności
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button htmlType='reset'>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
