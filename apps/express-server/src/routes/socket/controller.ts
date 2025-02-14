import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import socketService from './service';

const socketRouter = Router();
const subRoutes = ExpressServerEndpoints.socket.subRoutes;

socketRouter.get(
  `/${subRoutes.test}`,
  async function testConnection(req, res: Response) {
    /**
     * 🔹 If your app runs behind a proxy (e.g., NGINX, Cloudflare, or AWS ELB),
     * Express may return the proxy's IP instead of the real client IP.
     * 🔹 Use req.headers['x-forwarded-for'] to get the real IP
     * 🔹 To get geolocation details (city, country, ISP, etc.), use an external API like ipinfo.io.
     *
     * const { data } = await axios.get(`https://ipinfo.io/${clientIp}/json`);
     */
    const clientIp = req.ip ?? '';
    return await socketService.testConnection(res, clientIp);
  }
);

export { socketRouter };
