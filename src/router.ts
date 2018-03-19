import { Ycs } from '@ycs/core';
import { IDocs } from '@ycs/core/lib/docs';
import { Router } from '@ycs/core/lib/routers';
import { IConfig } from './config';
import { Controller } from './controller';
import Model from './model';

export async function setupRouter(app: Ycs): Promise<Router[]> {
  const config: IConfig = app.config.wechatMpTicket;
  const routers: Router[] = [];
  const controller = new Controller();
  routers.push(
    Model.routes(config.endpoint, {
      path: '/',
      methods: ['get'],
      controller: controller.index,
      tags: ['__wechat_mp'],
      summary: '公众号Ticket',
      description: '公众号Ticket',
      consumes: ['text/plain'],
      produces: ['application/json', 'application/xml'],
      parameters: [],
      responses: {
        200: {
          description: 'Successful operation',
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Session名称',
              },
              value: {
                type: 'string',
                description: 'Ticket',
              },
            },
          },
        },
        '4xx': Model.docSchema.response4xx,
        '5xx': Model.docSchema.response5xx,
      },
    })
  );

  return routers;
}
