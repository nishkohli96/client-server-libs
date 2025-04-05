import { type Response } from 'express';
import { BuyerModel, CarModel, type BuyerModelCreationAttributes } from '@/db/postgres/models';
import { sendErrorResponse } from '@/utils';

class BuyerService {
  async createPurchase(
    res: Response,
    purchaseInfo: BuyerModelCreationAttributes
  ) {
    try {
      const carInfo = await CarModel.findOne({
        where: {
          id: purchaseInfo.car_id
        }
      });
      if(!carInfo) {
        return res.json({
          success: true,
          status: 400,
          message: 'Car details not exist.',
          data: null
        });
      }

      const purchaseDetails = await BuyerModel.create(purchaseInfo);
      return res.json({
        success: true,
        status: 200,
        message: 'Purchase details added.',
        data: purchaseDetails
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to add new car details');
    }
  }

  async getPurchaseDetails(res: Response) {
    try {
      const purchaseList = await BuyerModel.findAll(
        {
          include: {
            model: CarModel,
            as: 'carDetails'
          }
        }
      );
      return res.json({
        success: true,
        status: 200,
        message: 'Purchase list',
        data: purchaseList
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to get purchase history');
    }
  }
}

const buyerService = new BuyerService();
export default buyerService;
