//@ts-check

import ProviderMongooseModel from './provider.js';



export {
    addOrUpdateProvider
}

const addOrUpdateProvider = async (ProviderSchema = {}) => {
    // console.log(ProviderSchema)
    return await ProviderMongooseModel.findOneAndUpdate(
        {
            id: ProviderSchema.id
        },
        {
            ...ProviderSchema
        },
        { upsert: true },
    );

};