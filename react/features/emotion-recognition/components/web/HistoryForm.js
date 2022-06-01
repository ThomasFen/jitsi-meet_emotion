import '@arco-design/web-react/dist/css/arco.css';
import * as React from 'react';
import { Form, Button, Select, Tag } from '@arco-design/web-react';



const emotions = [
  'Happy',
  'Sad',
  'Neutral',
  'Surprise',
  'Anger',
  'Contempt',
  'Disgust',
  'Fear',
];
const samplePatients = ['Maier', 'Beck', 'Schmitz', 'Zimmermann', 'Krause'];
const sampleConferences = ['Current Conference'];

const FormItem = Form.Item;

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  var color;
  switch (value) {
    case 'Fear':
      color = '#008FFB';
      break;
    case 'Disgust':
      color = '#00E396';
      break;
    case 'Contempt':
      color = '#FEB019';
      break;
    case 'Anger':
      color = '#FF4560';
      break;
    case 'Surprise':
      color = '#775DD0';
      break;
    case 'Sad':
      color = '#3F51B5';
      break;
    case 'Happy':
      color = '#546E7A';
      break;
    case 'Neutral':
      color = '#D4526E';
      break;
    default:
      color = 'gray';
  }

  return (
    <Tag
      color={color}
      closable={closable}
      onClose={onClose}
      size='small'
      style={{ margin: '2px 6px 2px 0' }}
    >
      {label}
    </Tag>
  );
}

function HistoryForm() {
  const [form] = Form.useForm();

  document.body.setAttribute('arco-theme', 'dark')

  return (
    <Form
      form={form}
      style={{ width: 800 }}
      size="mini"
      initialValues={{
        request: {
          conferences: sampleConferences,
          patiens: samplePatients,
          emotions: emotions,
        },
      }}
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
      <FormItem
        label="Conferences"
        field="request.conferences"
        rules={[
          {
            type: 'array',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowCreate
          placeholder="please select"
          options={sampleConferences}
        />
      </FormItem>
      <FormItem
        label="Patients"
        field="request.patiens"
        rules={[
          {
            type: 'array',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowCreate
          placeholder="please select"
          options={samplePatients}
        />
      </FormItem>
      <FormItem
        label="Emotions"
        field="request.emotions"
        rules={[
          {
            required: true,
            type: 'array',
            minLength: 1,
          },
        ]}
      >
        <Select
          mode="multiple"
          renderTag={tagRender}
          placeholder="please select"
          options={emotions}
        />
      </FormItem>

      <FormItem
        wrapperCol={{
          offset: 5,
        }}
      >
     
      </FormItem>
    </Form>
  );
}

export default HistoryForm;
