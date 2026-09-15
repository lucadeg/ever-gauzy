import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { akitaConfig, enableAkitaProdMode, persistState } from '@datorama/akita';
import { environment } from '@gauzy/ui-config';
import { loadPluginUiConfig } from '@gauzy/plugin-ui';
import { AppBootstrapModule } from './app/bootstrap.module';

const MVX_PRODUCT_NAME = 'MVX Operations';
const MVX_THEME_COLOR = '#050914';

function setMeta(name: string, content: string): void {
	let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
	if (!element) {
		element = document.createElement('meta');
		element.name = name;
		document.head.appendChild(element);
	}
	element.content = content;
}

function applyMvxProductIdentity(): void {
	document.title = `${MVX_PRODUCT_NAME} — MVX Ads Master`;
	document.documentElement.dataset.product = 'mvx-operations';
	document.documentElement.style.setProperty('--mvx-brand-accent', '#2dc9f7');
	document.documentElement.style.setProperty('--mvx-brand-background', MVX_THEME_COLOR);
	setMeta('application-name', MVX_PRODUCT_NAME);
	setMeta('theme-color', MVX_THEME_COLOR);
	setMeta('description', 'MVX Ads Master operations workspace powered by the Gauzy application stack.');
}

applyMvxProductIdentity();

console.log('Environment Mode:', environment.production ? 'Production' : 'Development');

if (environment.production) {
	enableProdMode();
	enableAkitaProdMode();
}

persistState({
	key: '_gauzyStore'
});

akitaConfig({
	resettable: true
});

// Load plugin configuration first, then bootstrap Angular.
loadPluginUiConfig(() => import('./plugin-ui.config'))
	.then(() => platformBrowser().bootstrapModule(AppBootstrapModule))
	.catch((err) => console.error(err));
