import { Ycs } from '@ycs/core';
import { Router } from '@ycs/core/lib/routers';
import * as colors from 'colors/safe';
import * as moment from 'moment';
import { setupRouter } from './router';

export const setup = {
  async pre(app: Ycs): Promise<Router[]> {
    console.log(
      `[${colors.green(
        moment().format('YY-MM-DD HH:mm:ss')
      )}] Setup plugin ${colors.cyan('wechat-mp-ticket')}`
    );
    try {
      const configPath = app.dir + '/plugins/wechat-mp-ticket';
      app.config.wechatMpTicket = require(configPath)[process.env.NODE_ENV];
      const routers = await setupRouter(app);
      return await routers;
    } catch (e) {
      console.error(e);
    }
  },
};
