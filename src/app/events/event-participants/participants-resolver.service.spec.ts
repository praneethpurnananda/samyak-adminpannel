import { TestBed } from '@angular/core/testing';

import { ParticipantsResolverService } from './participants-resolver.service';

describe('ParticipantsResolverService', () => {
  let service: ParticipantsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
