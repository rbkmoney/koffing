import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import 'rxjs';

import 'chart.js/src/chart.js';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'primeng/resources/primeng.min.css';
import 'primeng/resources/themes/omega/theme.css';
import 'gentelella/build/css/custom.css';
import './styles.less';
import './thirdparty/suggestions.less';

window.addEventListener('load', () => {
    let scriptTag = document.createElement('script');
    scriptTag.src = 'https://cdn.jsdelivr.net/jquery.suggestions/16.10/js/jquery.suggestions.min.js';
    document.body.appendChild(scriptTag);
});
