import {
  Model, models, model, Document, Schema,
} from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  email: string;
  password: string;
  active: boolean;
  verificationToken: string;
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
    required: true,
  },
});

// Hash password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    throw error;
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = models.User || model('User', userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
