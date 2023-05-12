import mongoose from "mongoose";

const dbConnect = async (mongo_dbUri) => {
    // Need to read this from a configuration file
    if (!mongo_dbUri) {
        throw new Error("Database connection string not configured in ENV file");
    }

    const dbUri =mongo_dbUri;
    return mongoose.connect(dbUri);
};

export default dbConnect;
