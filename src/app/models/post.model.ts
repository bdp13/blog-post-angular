
export class Post {
    id: number;
    loveIts: number ;
    created_at: Date;
   
    constructor(private title:string, private content:string) {
      this.id = 0;
      this.loveIts = 0;
      this.created_at = new Date;
    }
  }