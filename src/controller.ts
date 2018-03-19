import { IContext } from '@ycs/core/lib/context';
import { Boom, handleError } from '@ycs/core/lib/errors';
import { response } from '@ycs/core/lib/response';
import { getTicket } from './utils';

export class Controller {
  public index = async (ctx: IContext) => {
    try {
      const ticket = await getTicket();
      response(ctx, 200, ticket);
    } catch (e) {
      handleError(ctx, e);
    }
  };
}
