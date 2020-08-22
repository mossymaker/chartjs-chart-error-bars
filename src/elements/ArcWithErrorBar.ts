﻿import { Arc } from '@sgratzl/chartjs-esm-facade';
import { renderErrorBarArc, errorBarDefaults } from './render';

export class ArcWithErrorBar extends Arc {
  draw(ctx) {
    super.draw(ctx);

    renderErrorBarArc(this, ctx);
  }
}
ArcWithErrorBar.id = 'arcWithErrorBar';
ArcWithErrorBar.defaults = /*#__PURE__*/ Object.assign({}, Arc.defaults, errorBarDefaults);
ArcWithErrorBar.defaultRoutes = Arc.defaultRoutes;