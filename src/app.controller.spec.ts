import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlDocument } from './Models/url.model';
import { Model } from 'mongoose';

describe('AppController', () => {
  let UrlModel:Model<UrlDocument>;
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getUrls', () => {
    it('should return URLs for a user', async () => {
    
      const mockRequest = { user: { sub: 'user_id' } };
  
      const mockUrls = { urls: [
      new UrlModel(  { _id: '65732c10e583903a76b6ca7c', userId: '65732c10e583903a76b6ca7c', shortenUrl: 'shorten1', url: 'https://www.youtube.com/',__v: 0 })
      ] };

      jest.spyOn(appService, 'getUrls').mockResolvedValue(mockUrls);
  
      const result = await appController.getUrls(mockRequest);
      
      expect(appService.getUrls).toHaveBeenCalledWith('user_id');
      expect(result).toEqual(mockUrls);
  
    });
  });

  describe('addUrl', () => {
    it('It should add a url', async () => {

      const mockUrl = 'https://www.youtube.com/';
      const mockUserId = '1';

      const addResult = { message:"Url shortened successfully" };

      jest.spyOn(appService, 'addUrl').mockResolvedValue(addResult);

      const mockRequest = {
        user: {
          sub: mockUserId,
        },
      };

      const result = await appController.addUrl(mockRequest, {url:mockUrl});
      
      expect(appService.addUrl).toHaveBeenCalledWith(mockUrl,mockUserId);
      expect(result).toEqual(addResult);
    });
  });
  
 
  describe('deleteUrl', () => {
    it('should delete a URL', async () => {

      const mockUrlId = '1';

      const deleteResult = { message:"Url Removed successfully" };

      jest.spyOn(appService, 'deleteUrl').mockResolvedValue(deleteResult);

      const result = await appController.deleteUrl({ urlId: mockUrlId });
      
      expect(appService.deleteUrl).toHaveBeenCalledWith(mockUrlId);
      expect(result).toEqual(deleteResult);
    });
  });

});
