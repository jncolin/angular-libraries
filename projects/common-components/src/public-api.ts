/*
 * Public API Surface of common-components
 */

import {LIB_RECAPTCHA_KEY, LIB_API_URL, LIB_LOGIN_URL, LIB_RESET_PASSWORD_URL, LIB_SET_PASSWORD_URL} from './lib/lib-config';

/* Components */
export * from './lib/common-components.service';
export * from './lib/common-components.component';

export * from './lib/components/spinner/spinner.component';
export * from './lib/components/footer/footer.component';
export * from './lib/components/header/header.component';
export * from './lib/components/breadcrumb/breadcrumb.component';

export * from './lib/components/login/login.component';
export * from './lib/components/set-password/set-password.component';
export * from './lib/components/reset-password/reset-password.component';

export * from './lib/components/confirm-dialog/confirm-dialog.component';

export * from './lib/components/error/error.component';
export * from './lib/components/not-authorised/not-authorised.component';
export * from './lib/components/not-found/not-found.component';

export * from './lib/components/simple-layout/simple-layout.component'
export * from './lib/components/simple-header/simple-header.component'
export * from './lib/components/simple-footer/simple-footer.component'

/* Interceptors */
export * from './lib/interceptors/spinner.interceptor';
export * from './lib/interceptors/token.interceptor';
export * from './lib/interceptors/simple.interceptor';

/* Services */
export * from './lib/services/authn.service';
export * from './lib/services/message.service';
export * from './lib/services/recaptcha.service';
export * from './lib/services/spinner.service';
export * from './lib/services/dev-null.service';
/* Guards */
export * from './lib/guards/authn.guard';
export * from './lib/guards/authz.guard';
export * from './lib/guards/test.guard';
export * from './lib/guards/leave-page.guard';

export {LIB_RECAPTCHA_KEY, LIB_API_URL, LIB_LOGIN_URL, LIB_ERROR_URL,
LIB_RESET_PASSWORD_URL, LIB_SET_PASSWORD_URL} from './lib/lib-config';

