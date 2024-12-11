import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IUser extends Document {
  githubId: string;
  username: string;
  displayName: string;
  email?: string;
  profileImgUrl?: string;
  canvasToken?: string;
  apiTokens: Array<{
    token: string;
    name: string;
    createdAt: Date;
    lastUsed?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  generateApiToken: (name: string) => string;
}

const UserSchema: Schema = new Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String },
  profileImgUrl: { type: String },
  canvasToken: { type: String },
  apiTokens: [{
    token: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastUsed: { type: Date }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  collection: 'users',
  timestamps: true 
});

UserSchema.methods.generateApiToken = function(name: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  this.apiTokens.push({
    token,
    name,
    createdAt: new Date()
  });
  return token;
};

// Token lookup
UserSchema.index({ 'apiTokens.token': 1 });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;