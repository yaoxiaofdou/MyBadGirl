import { TestBed, inject } from '@angular/core/testing';
import { HomeListDataService } from './home-list-data.service';

describe('HomeListDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeListDataService]
    });
  });

  it('should ...', inject([HomeListDataService], (service: HomeListDataService) => {
    expect(service).toBeTruthy();
  }));
});
