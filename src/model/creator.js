import mongoose from 'mongoose';

const creatorSchema = mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
});


export default mongoose.model("Creator", creatorSchema);