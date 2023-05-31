/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
const fs = require('fs');
const path = require('path');
const Questions = require('./Questions/index');

/**
 * @class
 */
class RocketFrontCore {
	/**
	 * @constructor
	 * @param  {string} context - context of main working directory
	 * @param  {string} root - root directory of the project '__dirname'
	 */
	constructor(context, root) {
		this.Context = context;
		this.Root = root;
		this.Paths = {
			js: path.join(this.Root, '/frontend/scripts/pages'),
			njk: path.join(this.Root, '/frontend/views'),
			scss: path.join(this.Root, '/frontend/styles/pages')
		};
		this.JS = path.join(this.Root, '/frontend/scripts/index.js');
		this.SCSS = path.join(this.Root, '/frontend/styles/main.scss');
		this.Content = {
			js: '',
			njk: `{% extends "layouts/default.njk" %}

{% block content %}
<main>
</main>
{% endblock %}

{% block script %}
<script src="scripts/{pageName}.bundle.js"></script>
{% endblock %}`,
			scss: ''
		};
		this.Package = path.join(this.Root, '/package.json');
		this.WebPack = path.join(this.Root, '/webpack.config.js');
		this.Scripts = path.join(this.Root, '/frontend/scripts');
		this.Plugins = path.join(this.Root, '/frontend/scripts/plugins');
	}

	/**
	 * @public
	 * @method
	 */
	async CreatePage() {
		const page = await Questions.init();

		/**
		 * @param {string} name - name of page
		 */
		const ChangeEntry = (name, ext) => {
			let content = null;
			fs.readFile(this.JS, (err, data) => {
				const indexData = data.toString();
				const beginIdx = indexData.indexOf('{');
				const begin = indexData.slice(0, beginIdx + 1);
				const end = indexData.slice(beginIdx + 1, indexData.length);
				content = `${begin} \n\t${name}: './pages/${name}.${ext}', ${end}`;
				fs.writeFile(this.JS, content, error => {
					if (error) {
						console.log('🐞: RocketFrontCore -> CreateFile -> data', error);
					}
				});
			});
		};

		/**
		 * @param {string} name - name of page 'scss file'
		 */
		const ChangeSCSS = name => {
			fs.readFile(this.SCSS, (err, data) => {
				const indexData = data.toString();
				const content = `${indexData}\n@import 'pages/${name}';`;
				fs.writeFile(this.SCSS, content, error => {
					if (error) {
						console.log('🐞: RocketFrontCore -> CreatePage -> error', error);
					}
				});
			});
		};

		/**
		 * @param  {string} key - extension of file
		 * @param  {string} pagName - name of page
		 */
		const theContent = (key, pagName) => {
			let dataToReturn = null;
			switch (key) {
				case 'js':
					dataToReturn = this.Content.js;
					break;
				case 'njk':
					dataToReturn = this.Content.njk.replace('{pageName}', pagName);
					break;
				case 'scss':
					dataToReturn = this.Content.scss;
					break;
				default:
					break;
			}
			return dataToReturn;
		};

		Object.entries(this.Paths).forEach(([key, value]) => {
			fs.writeFile(
				`${value}/${page.PageName}.${key === 'js' ? page.type : key}`,
				theContent(key, page.PageName),
				error => {
					if (error) {
						console.log('🐞: RocketFrontCore -> CreateFile -> error', error);
					} else {
						console.log(
							`😼: ${key === 'js' ? page.type : key} файл страницы создан!`
						);
					}
				}
			);
			ChangeEntry(page.PageName, page.type);
			ChangeSCSS(page.PageName);
		});
	}

	/**
	 * @public - add Vue.js as dependency and set configs for webpack
	 * @method
	 */
	AddVue() {
		console.log('👋: Ща, настроим конфиги для Vue.js');
		const pkgContent = JSON.parse(fs.readFileSync(this.Package, 'utf8'));
		pkgContent.devDependencies = {
			...pkgContent.devDependencies,
			vue: '^2.6.11',
			'vue-loader': '^15.9.0',
			'vue-template-compiler': '2.6.11'
		};
		const data = JSON.stringify(pkgContent);
		fs.writeFileSync(this.Package, data, 'utf8');
		fs.readFile(this.WebPack, (err, res) => {
			const Data = res.toString();
			const moduleLoc = Data.search('module') - 1;
			const rulesLoc = Data.search('rules') + 8;
			const begin = Data.slice(0, moduleLoc);
			const mid = Data.slice(moduleLoc, rulesLoc);
			const end = Data.slice(rulesLoc, Data.length);

			const imports = `const VueLoaderPlugin = require('vue-loader/lib/plugin');`;
			const plugin = 'plugins: [new VueLoaderPlugin()],';
			const vueConf = `{
				test: /\\.vue$/,
				loader: 'vue-loader'
			},`;

			const content = `${imports}\n${begin}\n${plugin}\n${mid}\n${vueConf}\n${end}`;
			fs.writeFileSync(this.WebPack, content, 'utf8');
		});
		fs.mkdir(`${this.Scripts}/vue`, { recursive: true }, err => {
			if (err) {
				console.log('🐞: RocketFrontCore -> AddVue -> err', err);
			}
		});
		console.log(
			`😼: Запусти команду 'npm install' или 'yarn', для установки пакетов`
		);
	}

	/**
	 * @public - create js file for plugin with factory function in it
	 * @method
	 */
	async CreatePlugin() {
		const ans = await Questions.createPlugin();
		const dir = `${this.Plugins}/${ans.PluginName}`;
		const Content = name =>
			`
//* --> Use factory function for plugins <-- *//
function ${name}(arg){
	const options = arg;

	function myMethod() {
		console.log(options)
	}

	return Object.freeze({
		myMethod: myMethod()
	})
}
export default ${name};`;

		const TsContent = name =>
			`
//* --> Use factory function for plugins <-- *//
function ${name}(arg:any):object {
	const options:any = arg;

	function myMethod():void {
		console.log(options)
	}

	return Object.freeze({
		myMethod: myMethod()
	})
}
export default ${name};`;

		fs.mkdir(`${dir}`, { recursive: true }, err => {
			if (err) {
				console.log('🐞: RocketFrontCore -> err', err);
			} else {
				fs.writeFile(
					`${dir}/index.${ans.type}`,
					ans.type === 'js'
						? Content(ans.PluginName)
						: TsContent(ans.PluginName),
					error => {
						if (error) {
							console.log('🐞: RocketFrontCore -> error', error);
						} else {
							console.log(`😼: Плагин ${ans.PluginName} успешно создан!`);
						}
					}
				);
			}
		});
	}

	/**
	 * @public - create some js, scss, html or all files for component
	 * @method
	 */
	async CreateComponent() {
		const data = await Questions.createComponent();
		const name = data.ComponentName;
		const extensions = data.IncludeFiles;
		const temp = [
			{
				ext: '.scss',
				path: path.join(this.Root, `/frontend/styles/components/_${name}.scss`),
				main: path.join(this.Root, '/frontend/styles/main.scss'),
				template: ''
			},
			{
				ext: '.njk',
				path: path.join(this.Root, `/frontend/views/_components/${name}.njk`),
				template: `
{% macro ${name}() %}
{% endmacro %}`
			},
			{
				ext: '.js',
				path: path.join(this.Root, `/frontend/scripts/components/${name}`),
				template: `
//* --> Use factory function for plugins <-- *//
function ${name}(arg){
	const options = arg;

	function myMethod() {
		console.log(options)
	}

	return Object.freeze({
		myMethod: myMethod()
	})
}
export default ${name};`
			},
			{
				ext: '.ts',
				path: path.join(this.Root, `/frontend/scripts/components/${name}`),
				template: `
//* --> Use factory function for plugins <-- *//
function ${name}(arg:any):object {
	const options:any = arg;

	function myMethod():void {
		console.log(options)
	}

	return Object.freeze({
		myMethod: myMethod()
	})
}
export default ${name};`
			}
		];
		let paths = [];
		extensions.forEach(item => {
			switch (item) {
				case 'Все!':
					return (paths = temp);
				case '.scss':
					return paths.push(temp[0]);
				case '.njk':
					return paths.push(temp[1]);
				case '.js':
					return paths.push(temp[2]);
				case '.ts':
					return paths.push(temp[3]);
				default:
					return (paths = [...temp]);
			}
		});
		paths.forEach(item => {
			if (item.ext !== '.js' && item.ext !== '.ts') {
				fs.writeFile(item.path, item.template, error => {
					if (error) {
						console.log('🐞: error', error);
					} else {
						if (item.main) {
							fs.readFile(item.main, (err, res) => {
								const indexData = res.toString();
								const content = `${indexData}\n@import 'components/${name}';`;
								fs.writeFile(item.main, content, werror => {
									if (werror) {
										console.log('🐞: werror', werror);
									}
								});
							});
						}
						console.log(`😼: ${item.ext} файл создан!`);
					}
				});
			} else {
				fs.mkdir(item.path, { recursive: true }, err => {
					if (err) {
						console.log('🐞: err', err);
					} else {
						fs.writeFile(
							`${item.path}/index${item.ext}`,
							item.template,
							error => {
								if (error) {
									console.log('🐞: error', error);
								} else {
									console.log(`😼: ${item.ext} файл создан!`);
								}
							}
						);
					}
				});
			}
		});
	}
}

module.exports = RocketFrontCore;
