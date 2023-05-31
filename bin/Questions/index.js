/* eslint-disable import/no-extraneous-dependencies */
const inquirer = require('inquirer');

module.exports = {
	init: () => {
		const question = [
			{
				name: 'PageName',
				type: 'input',
				message: '👋: Введи название страницы:'
			},
			{
				name: 'type',
				type: 'list',
				message: '😼: JavaScript или TypeScript?',
				choices: [
					{
						value: 'js'
					},
					{
						value: 'ts'
					}
				]
			}
		];
		return inquirer.prompt(question);
	},
	createPlugin: () => {
		const question = [
			{
				name: 'PluginName',
				type: 'input',
				message: '👋: Введи название плагина:'
			},
			{
				name: 'type',
				type: 'list',
				message: '😼: JavaScript или TypeScript?',
				choices: [
					{
						value: 'js'
					},
					{
						value: 'ts'
					}
				]
			}
		];
		return inquirer.prompt(question);
	},
	createComponent: () => {
		const question = [
			{
				name: 'ComponentName',
				type: 'input',
				message: '👋: Введи название компонента:'
			},
			{
				name: 'IncludeFiles',
				type: 'checkbox',
				message: '😺: Выбери файлы (навигация стрелками, а выбор пробелом):',
				choices: [
					{ value: 'Все!', checked: true },
					{ value: '.scss', checked: false },
					{ value: '.njk', checked: false },
					{ value: '.js', checked: false },
					{ value: '.ts', checked: false }
				]
			}
		];
		return inquirer.prompt(question);
	}
};
