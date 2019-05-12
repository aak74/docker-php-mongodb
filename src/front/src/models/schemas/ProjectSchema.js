export default [
  {
    label: 'Название',
    model: 'name',
    type: 'input',
    inputType: 'text',
    placeholder: 'Название проекта',
    required: true,
  },
  {
    label: 'URL',
    model: 'url',
    type: 'input',
    inputType: 'text',
    placeholder: 'url для отслеживания доступности',
    required: true,
  },
  {
    label: 'Описание',
    model: 'description',
    type: 'input',
    inputType: 'textarea',
    placeholder: 'Краткое описание проекта',
    required: true,
  },
  {
    label: 'Активный',
    model: 'isActive',
    type: 'checkbox',
    default: true,
  },
  {
    label: 'SSH',
    model: 'ssh',
    type: 'group',
    fields: [
      {
        label: 'Пароль',
        model: 'password',
        type: 'input',
        inputType: 'text',
        // inputType: 'password',
        min: 6,
        required: true,
        hint: 'Minimum 6 characters',
      },
    ],
  },
];
