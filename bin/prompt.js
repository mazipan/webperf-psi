const inquirer = require('inquirer');

module.exports = async function initPrompt() {
  const answer = await inquirer.prompt([
    {
      message: 'Type URL to be test? (e.g: https://mazipan.space)',
      default: 'https://mazipan.space',
      type: 'input',
      name: 'url',
    },
    {
      message: 'Choose device type?',
      default: 'mobile',
      type: 'list',
			name: 'device',
      choices: [
        { name: 'mobile', disabled: false },
        { name: 'desktop', disabled: false },
      ],
    },
    {
      message: 'How many times do you want to run the PSI?',
      default: 1,
      type: 'list',
      choices: [
        { name: 1, disabled: false },
        { name: 3, disabled: false },
        { name: 5, disabled: false },
        { name: 7, disabled: false },
        { name: 9, disabled: false },
      ],
      name: 'hit',
		},
		{
      message: 'Do you want to use custom quantile? (default is 0.75, range from 0 to 1)',
      default: '0.75',
      type: 'input',
      name: 'quantile',
    },
		{
      message: 'Type your API key? (check on https://s.id/apikey)',
      default: '',
      type: 'input',
      name: 'apikey',
    },
  ]);

  return answer;
}
