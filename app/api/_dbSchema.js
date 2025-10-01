import mongoose from 'mongoose';

const clientDataSchema = new mongoose.Schema({
    clientFingerprint: {
        type: String,
        required: true
    },
    visits: [{
        type: Number // Number of hours spent from unixtime
    }],
    ip: [{
        type: String
    }]
}, { 
    timestamps: true
});

clientDataSchema.pre('save', function(next) {
    if (Array.isArray(this.visits)) {
        this.visits = Array.from(new Set(this.visits));
    }
    if (Array.isArray(this.ip)) {
        this.ip = Array.from(new Set(this.ip));
    }
    next();
});

clientDataSchema.index({ clientFingerprint: 1 }, { unique: true });

const clientData = mongoose.models.clientData || mongoose.model('clientData', clientDataSchema);
export {
    clientData
};