import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import {User} from './user.model'; // Import the User model

@modelOptions({ schemaOptions: { collection: 'auctions' } })
export class Auction {
  @prop({ required: true, trim: true })
  public itemName!: string;

  @prop({ trim: true })
  public description?: string;

  @prop()
  public image?: string;

  @prop({ default: Date.now })
  public created?: Date;

  @prop({ default: Date.now })
  public bidStart?: Date;

  @prop({
    default: new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours from now
  })
  bidEnd?: Date; // Default bid end time


  @prop({ required: true, ref: User }) // Reference to the User model
  public seller!: Ref<User>;
 

  @prop({ default: 0 })
  public startingBid?: number;

  @prop({ enum: ['draft', 'published', 'active', 'completed', 'failed'], default: 'draft' }) // Define possible statuses and default to 'draft'
  status?: string;

  @prop({ type: () => Bid }) // Store bid records as an array of Bid objects
  bids?: Bid[];
}

export class Bid {
  constructor(bidder: User, money: number, time: Date){
    this.bidder = bidder;
    this.money = money;
    this.time = time;
  }
  @prop({ required: true, ref: User }) // Reference to the User model
  bidder!: Ref<User>;

  // @prop({required: true,})
  // bid!: number;

  @prop({required: true,})
  money!: number;

  @prop({required: true,})
  time!: Date;
}

const AuctionModel = getModelForClass(Auction);
export default AuctionModel;
