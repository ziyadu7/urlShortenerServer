import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
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
        { _id: '1', userId: '1', shortenUrl: 'shorten1', url: 'https://www.youtube.com/' },
        { _id: '2', userId: '2', shortenUrl: 'shorten2', url: 'https://www.linkedin.com/in/muhammed-ziyad-0078b3259/' },
      ] };
  
      const result = await appController.getUrls(mockRequest);
      console.log(result,'===');
      
      expect(result).toEqual(mockUrls);
  
      expect(appService.getUrls).toHaveBeenCalledWith('user_id');
    });
  });
  
 
  describe('deleteUrl', () => {
    it('should delete a URL', async () => {
      // Mocking the URL parameter
      const mockUrlId = '1';

      // Mocking the return value of appService.deleteUrl()
      const deleteResult = { success: true };

      const result = await appController.deleteUrl({ urlId: mockUrlId });
      console.log(result,'===');
      
      expect(appService.deleteUrl).toHaveBeenCalledWith(mockUrlId);
      expect(result).toEqual(deleteResult);
    });
  });

  // More test cases for other controller methods can be added similarly
});
