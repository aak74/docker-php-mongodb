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
    label: 'Backup',
    model: 'backup',
    type: 'group',
    fields: [
      {
        label: 'Host',
        model: 'sshHost',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'Port',
        model: 'sshPort',
        type: 'input',
        inputType: 'text',
      },
      {
        label: 'Пароль',
        model: 'sshPassword',
        type: 'input',
        inputType: 'text',
      },
    ],
  },
];
