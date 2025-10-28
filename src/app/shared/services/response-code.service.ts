import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseCodeService {

  constructor() { }

  private responseCodes: any[] = [
    {
      code: 8000,
      description: 'Success'
    },
    {
      code: 8001,
      description: 'Invalid Request'
    },
    {
      code: 8002,
      description: 'No Record Found'
    },
    {
      code: 8003,
      description: 'Unauthorized'
    },
    {
      code: 8004,
      description: 'Duplicate'
    },
    {
      code: 8005,
      description: 'Failure'
    },
    {
      code: 8006,
      description: 'Data in Use'
    },
    {
      code: 8007,
      description: 'Bad Request'
    },
    {
      code: 8008,
      description: 'Method Not Allowed'
    },
    {
      code: 8009,
      description: 'Restricted Access'
    },
    {
      code: 8010,
      description: 'Limit Reached'
    },
    {
      code: 8011,
      description: 'Null Argument'
    },
    {
      code: 8012,
      description: 'No Data Changed'
    },
    {
      code: 8013,
      description: 'File Not Exist'
    },
    {
      code: 8016,
      description: 'No Parent Record'
    },
    {
      code: 8021,
      description: 'Process Already Completed'
    },
    {
      code: 8022,
      description: 'Is Not for Submission'
    },
    {
      code: 8023,
      description: 'Process Not Defined'
    },
    {
      code: 8024,
      description: 'No Approval Action'
    },
    {
      code: 8025,
      description: 'No Financial Year'
    },
    {
      code: 8026,
      description: 'Submission Stage Not Defined'
    },
    {
      code: 8027,
      description: 'Receiving Stage Not Defined'
    },
    {
      code: 8028,
      description: 'Already Submitted'
    },
    {
      code: 8029,
      description: 'Record Is Deleted'
    },
    {
      code: 8030,
      description: 'Record Is Dropped'
    },
    {
      code: 8031,
      description: 'Record Is in Progress'
    },
    {
      code: 8035,
      description: 'Record Is in Approval Process'
    },
    {
      code: 8037,
      description: 'Already Approved'
    },
    {
      code: 8038,
      description: 'Not Initialised'
    },
    {
      code: 8040,
      description: 'Partial Success'
    },
    {
      code: 8042,
      description: 'Already Assigned'
    },
    {
      code: 8044,
      description: 'Duplicate Assignment'
    },
    {
      code: 8045,
      description: 'Exception'
    }
   ]

   getCodeDescription(code) {
    const result = [];
    for (let i = 0; i < this.responseCodes.length; i++) {
      for (const data in this.responseCodes[i]) {
        if ((this.responseCodes[i][data]) === code) {
          result.push(this.responseCodes[i]);
        }
      }
    }
    return result;
  }
   
}
