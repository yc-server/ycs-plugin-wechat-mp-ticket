import { Ycs } from '@ycs/core';
import { Boom } from '@ycs/core/lib/errors';
import * as rp from 'request-promise';
import { IConfig } from './config';
import { getToken } from 'ycs-plugin-wechat-mp';
import { WechatMpSession } from 'ycs-plugin-wechat-mp/lib/model';

export async function createTicket(): Promise<any> {
  const token = await getToken();
  const res = await rp({
    uri: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    qs: {
      access_token: token,
      type: 'jsapi',
    },
    json: true,
  });
  if (res.errcode) throw Boom.badData(res.errmsg);
  const entity = await WechatMpSession.create({
    name: 'ticket',
    value: res.ticket,
  });
  return entity;
}

export async function getTicket(): Promise<any> {
  const name = 'ticket';
  const entity = await WechatMpSession.findOne({ name: name }).exec();
  if (entity) {
    return entity;
  } else {
    return await createTicket();
  }
}
