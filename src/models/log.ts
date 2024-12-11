import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  body: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('AuditLog', auditLogSchema);
